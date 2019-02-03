<template>
  <div class="adminHeader">
    <span id="title">后台管理系统</span>
    <span id="welcome">欢迎：{{username}},<span id="exit" @click="toSignOut">[退出]</span></span>
  </div>
</template>

<script>
  export default {
    name: "adminHeader",
    data() {
      return {
        username: localStorage.getItem("username"),
      }
    },
    methods: {
      toSignOut() {
        //清空保存的数据
        localStorage.setItem("username", "");
        this.$router.push({path: '/login'});
      }
    }
  }
</script>

<style scoped>
  .adminHeader {
    width: 100%;
    height: 100%;
    background-color: gray;
    color: white;
  }
  
  #welcome {
    position: absolute;
    left: 90%;
    top: 1.5em;
  }
  
  #exit:hover {
    text-decoration: underline;
    color: blue;
  }
</style>
