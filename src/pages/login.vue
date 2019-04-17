<template>
  <div class="login">
    <div id="centerBox">
      <p>在线笔记本#登录</p>
      <div class="inputInfo">
        <p>
          <img src="../assets/account_icon.png"/>
          <input type="text" v-model="username" name="account" placeholder="请输入账号">
        </p>
        <p>
          <img src="../assets/password_icon.png"/>
          <input type="password" v-model="password" name="password" placeholder="密码"></p>
        <button @click="doLogin" class="el-button--primary">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
        reqURL: this.constant.serverURL + "/user/doLogin"
      }
    },
    methods: {
      doLogin() {
        if (this.username.trim() === "" || this.password.trim() === "") {
          this.$notify.error({
            title: '提示',
            message: '请输入完整的账号和密码',
          });
          return;
        }
        fetch(this.reqURL, {
          body: JSON.stringify({
            "account": this.username,
            "password": this.password
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
              localStorage.setItem("username", this.username);//保存用户名
              // this.$router.push({path: '/admin/home'});
              this.$router.push({path: '/home'});
            } else {
              this.$notify.error({
                title: '提示',
                message: '账号或密码错误',
              });
            }
          })
        }, response => {
          this.$notify.error({
            title: '提示',
            message: '登录失败',
          });
        })
      }
    }
  }
</script>

<style scoped>
  #centerBox {
    text-align: center;
    position: absolute;
    width: 21%;
    top: 40%;
    left: 40%;
    transform: translateY(-50%);
  }
  
  .inputInfo {
    margin-top: 10px;
    border: 2px solid gray;
    padding: 20px;
  }
  
  #centerBox > p {
    font-size: 1.5em;
  }
  
  .inputInfo > p {
    margin: 20px 1%;
    border-bottom: 1px solid #d8d8d8;
    width: 96%;
  }
  
  input {
    border: none;
    padding: 0px 1%;
    margin: 1%;
    background: #fff;
    width: 84%;
    font-size: 16px;
    line-height: 30px;
    outline: none;
  }
  
  .inputInfo > p > img {
    width: 26px;
    float: left;
    vertical-align: middle;
    margin-top: 1px;
  }
  
  .login {
    height: 100%;
    background-color: black;
    min-height: 100%;
    width: 100%;
  }
</style>
