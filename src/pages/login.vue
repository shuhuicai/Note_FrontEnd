<template>
  <div class="login">
    <p>系统登录</p>
    <input type="text" v-model="username" name="account" placeholder="用户名">
    <input type="password" v-model="password" name="password" placeholder="密码">
    <button @click="doLogin">登录</button>
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
          credentials: 'same-origin',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
        }).then(response => {
          response.json().then((data) => {
            if (data) {
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
