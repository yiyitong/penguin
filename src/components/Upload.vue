<template>
  <div class="upload">
    <div class="oss_file" @click="handleClick">
      <input type="file" ref="input" :name="name" @change="doUpload"/>
      <slot ><el-button type="primary">点击上传文件</el-button></slot>
    </div>
    <slot name="tip"></slot>
      <div class="upload-error">{{error}}</div>
  </div>
</template>
<script>
import CosUploader from '@/common/CosUploader.js'
export default {
    data () {
        return {
            error: '',
            url: ''
        }
    },
    props: ['name', 'disabled', 'params'],
    methods: {
      checkPic:  (files) => {
        var fileList = [];
        // 如果只需要单张上传，去掉multiple="multiple"，直接获取数组第1个元素即可file = files[0];
        // 如果是允许多张上传，将上传的图片放入数组中,循环数组
        if (files.length === 0) {
            return
        } else {
            for(var i=0; i<files.length; i++){
            fileList.push(files[i]);
            }
        }
        //循环待上传的图片
        return fileList.every((item) => {
            // 1 校验上传图片格式
            let size = item.size/1024;
            return (/\.(jpg|jpeg|png|JPG|PNG)$/.test(item.name) && size<=5000)
        })
      },
      handleClick() {
        if (!this.disabled) {
          this.$refs.input.value = null;
          this.$refs.input.click();
        }
      },
      handleProgess (progressData) {
          console.info('progress:', progressData);
      },
      handleFinished (err, data) {
          console.info('finished:', err, data)
          if (err) {
              this.error = err
          } else {
              let res = Object.assign(data, this.params)
              this.$emit('finish', res)
          }
      },
      doUpload (event) {
        const files = event.target.files;
        if (!files || !this.checkPic(files)) return;
        CosUploader.upload(files[0], this.handleProgess, this.handleFinished);
      }
    }
}
</script>
<style scoped>
.oss_file input {
    opacity: 0; filter: alpha(opacity=0);
    cursor: pointer; width: 0; height: 0;
}
</style>
