<template>
  <div class="register">
    <div class="inputBox">
      <p>注册</p>
      <p>邮箱<input v-model="email" type="text"/></p>
      <p>密码<input v-model="password" type="password"/></p>
      <p>验证码<input v-model="verify_input" type="text"/>
        <el-button type="button" @click="getVerify">获取验证码</el-button>
      </p>
      <el-button type="button" @click="registerReq">注册</el-button>
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
        if (!this.checkEmail()) {
          return;
        }
        fetch(this.constant.serverURL + "/user/sendVerifyCode", {
          body: "address=" + this.email.trim(),
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: "application/json"
          }
        }).then(response => {
            response.json().then((data) => {
              this.verify = data;
            })
          },
          response => {
          
          })
        
      },
      
      registerReq() {
        if (this.email.trim() === "" || this.password.trim() === "" || this.verify_input.trim() === "") {
          this.$message({
            message: '请输入完整的信息',
            type: 'warning'
          });
          return;
        }
        if (this.verify != this.verify_input.trim()) {
          this.$message({
            message: '验证码错误',
            type: 'warning'
          });
        } else {
          fetch(this.constant.serverURL + "/user/addUser", {
            body: JSON.stringify({
              "account": this.email.trim(),
              "password": this.password.trim(),
              "role": 1
            }),
            cache: 'no-cache',
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
            headers: {
              "Content-Type": 'application/json;charset=UTF-8',
              Accept: "application/json"
            }
          }).then(response => {
              response.json().then((data) => {
                if (data) {
                  this.$notify({
                    title: '成功',
                    message: '注册成功',
                    type: 'success'
                  });
                  this.$router.push({path: '/login'});
                } else {
                  this.$notify.error({
                    title: '提示',
                    message: '注册失败',
                  });
                }
              })
            },
            response => {
            
            });
        }
      },
      //检验邮箱格式是否正确
      checkEmail() {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!reg.test(this.email.trim())) {
          this.$message({
            message: '邮箱格式不正确',
            type: 'warning'
          });
          return false;
        }
        return true;
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
