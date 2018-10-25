import COS from 'cos-js-sdk-v5';
import Vue from 'vue';

let getAuth = () => {
    return Vue.axios.get('/auth/temp');
}
let config = {
  Bucket:'music-1257848582',
  Region: 'ap-chengdu'
}

let upload = (file, progressFunc, callback) => {
     getAuth().then(({data}) => {
        var cos = new COS({
          SecretId: data.data.tmpSecretId, // 'AKIDYw77tRiqhMo21ostCG4dw0sXyGLCCHae', 
          SecretKey: data.data.tmpSecretKey,//'xg9MJ0RcYEiwveAXgbIl00mMktoUw98t' //
          XCosSecurityToken: data.data.sessionToken
          });
          cos.sliceUploadFile({
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '/show/'+file.name, //上传的文件夹和图片名称
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
//http://www.cnblogs.com/rich23/p/9258657.html
//https://blog.csdn.net/qq_41485414/article/details/80134908
export default {
    upload
}