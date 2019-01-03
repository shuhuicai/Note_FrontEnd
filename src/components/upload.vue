<template>
  <div class="upload">
    上传文件
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="api.addImg"
      :auto-upload="false"
      list-type="picture"
      :file-list="fileList"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :limit="1">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button size="small" @click="submitUpload" type="primary">上传</el-button>
    <br/>
    <br/>
    <img src="http://127.0.0.1:8080/image/showImage/154619284999400.jpg">
  
  </div>
</template>

<script>
  export default {
    name: "upload",
    data() {
      return {
        imageUrl: '',
        api:{addImg:"http://127.0.0.1:8080/image/testImage"},
        fileList:[],
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      uploadSuccess(response ,file,fileList) {
        console.log("上传文件成功response:"+response);
        console.log("上传文件成功file:"+file);
        console.log("上传文件成功fileList:"+fileList);
        //response：即为后端传来的数据。这是返回的是图片的路径
        app.user.userImage=response;
      },
      uploadError:function (response,file,fileList) {
        console.log("上传文件失败response:"+response);
        console.log("上传文件失败file:"+file);
        console.log("上传文件失败fileList:"+fileList);
      }
      
      
      /*handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }*/
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #000000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader :hover {
    border-color: #409EFF;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  
  .avatar {
    width: 178px;
    height: 178px;
    /*display: block;*/
  }
</style>
