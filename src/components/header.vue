<template>
  <div class="header">
    
    <img src="../assets/icon_folder.png" alt="logo位置" width="25px" height="25px">
    
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="0">
        <template slot="title">{{username}}(系统管理员)</template>
        <el-menu-item index="2-1" @click="signOut">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        username: window.localStorage.getItem('username'),
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      signOut() {
        this.$router.push({path: '/login'});
      }
      
    }
  }

</script>
<style scoped>
  /*.logo {
    !*flex: 1;*!
    !*position: relative;
    top: 10px;
    left: 10px;*!
    !*outline: none;*!
    display: inline-block;
    float: left;
  }*/
  
  .header {
    width: 100%;
    /*position: fixed;
    z-index: 99;*/
  }
  
  .el-menu-demo {
    width: 100%;
    min-width: 500px;
    float: right;
    /*position: absolute;
    left: 10px;
    top: 0;*/
    /*border-radius: 0;
    display: flex;*/
  }
</style>
