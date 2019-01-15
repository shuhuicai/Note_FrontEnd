<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="uploadPic"
      :action="uploadPath"
      :on-success="uploadSuccess"
      :on-error="uploadFailure"
      drag
      :auto-upload="false"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button size="small" type="primary" @click="uploadFile">上传</el-button>
  </div>
</template>

<script>
  export default {
    name: "uploadImage",
    data() {
      return {
        uploadPath: this.constant.serverURL + "/image/testImage",
      }
    },
    methods: {
      //上传
      uploadFile() {
        this.$refs.uploadPic.submit();
      },
      //上传成功回调函数
      uploadSuccess(response, file, fileList) {
        this.$notify({
          title: '提示',
          message: '上传成功',
          type: 'success'
        })
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
