import COS from 'cos-js-sdk-v5';
import Vue from 'vue';

let getAuth = () => {
    return Vue.axios.get('/cos/auth');
}

let upload = (file, progressFunc, callback) => {
    getAuth.then(({obj}) => {
        var cos = new COS({
            AppId: obj.appId,
            SecretId: obj.secretId,
            SecretKey: obj.secretKey,
          });
          cos.sliceUploadFile({
            Bucket: obj.bucket,
            Region: obj.region,
            Key:'/pic/'+file.name, //上传的文件夹和图片名称
            Body: file,  //要上传的文件
            onProgress: function (progressData) {   
              /* 上传进度 */
              progressFunc(progressData)
            }
          }, function (err, data) {
            console.log(err, data);
            // 上传成功返回url 
            // 需要清空上传控件，方法见下一步
            callback(err, data)
          });
    })
}

export default {
    upload
}