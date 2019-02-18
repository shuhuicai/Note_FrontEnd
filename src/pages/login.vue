<template>
  <div class="login">
    <p>系统登录</p>
    <div>
      <input type="text" v-model="username" name="account" placeholder="用户名">
      <input type="password" v-model="password" name="password" placeholder="密码">
      <button @click="doLogin">登录</button>
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
                message: '登录失败',
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

</style>
