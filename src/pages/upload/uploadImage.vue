<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="uploadPic"
      :action="uploadPath"
      :data="uploadParams"
      :on-success="uploadSuccess"
      :on-error="uploadFailure"
      :before-upload="beforeUpload"
      drag
      :auto-upload="false"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-button size="small" type="primary" @click="uploadFile">上传</el-button>
  </div>
</template>

<script>
  
  export default {
    name: "uploadImage",
    data() {
      return {
        uploadPath: this.constant.serverURL + "/file/saveFile",
        uploadParams: {
          "parentId": this.$route.params.id,//当前所属的文件夹id
          "fileType": this.$route.params.fileType,//文件类型
          "creator": window.localStorage.getItem('username')
        }
      }
    },
    methods: {
      //上传
      uploadFile() {
        this.$refs.uploadPic.submit();
      },
      beforeUpload(file) {
        //application/vnd.openxmlformats-officedocument.wordprocessingml.document  docx
        //application/msword   doc
        //application/pdf  pdf
        //image/jpeg   jpg
        //image/png   png
        if (this.uploadParams.fileType === 0) { //图片
          if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            this.$notify.error({
              title: '提示',
              message: '只能上传jpg/png格式的图片',
            });
            return false;
          }
        }
        else if (this.uploadParams.fileType === 1) {//pdf
          if (file.type !== 'application/pdf') {
            this.$notify.error({
              title: '提示',
              message: '只能上传pdf文件',
            });
            return false;
          }
        }
        else if (this.uploadParams.fileType === 2) {//word
          if (file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            this.$notify.error({
              title: '提示',
              message: '只能上传word文档',
            });
            return false;
          }
        }
        return true;
      },
      //上传成功回调函数
      uploadSuccess(response, file, fileList) {
        this.$root.Bus.$emit('updateFolder', response.data);//将消息数据通过EventBus的形式传到FolderTree组件
        if (response.result === 1) {
          this.$notify({
            title: '提示',
            message: '上传成功',
            type: 'success'
          })
        } else if (response.result === 0) {
          this.$notify.error({
            title: '提示',
            message: '上传失败',
          })
        }
      },
      //上传失败回调函数
      uploadFailure(err, file, fileList) {
        this.$notify.error({
          title: '提示',
          message: '上传失败',
        })
      }
    }
  }
</script>

<style scoped>

</style>
