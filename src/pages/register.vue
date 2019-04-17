<template>
  <div class="register">
    <div class="inputBox">
      <p>注册</p>
      <p>邮箱<input v-model="email" type="email"/></p>
      <p>密码<input v-model="password" type="password"/></p>
      <p>验证码<input v-model="verify_input" type="text"/>
        <button type="button" @click="getVerify">获取验证码</button>
      </p>
      <button type="button">注册</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        email: '',
        password: '',
        verify_input: '',//用户输入的验证码
        verify: ''//系统发给用户的验证码
      }
    },
    methods: {
      //获取验证码
      getVerify() {
        if (this.email.trim() === "") {
          this.$message({
            message: '请输入完整的邮箱地址',
            type: 'warning'
          });
          return;
        }
        
      }
    }
  }
</script>

<style scoped>
  .inputBox {
    text-align: center;
    position: absolute;
    top: 45%;
    left: 45%;
    border: black solid 1px;
  }
  
  .inputBox > p {
    margin: 10px;
  }
</style>
