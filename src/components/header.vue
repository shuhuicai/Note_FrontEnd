<template>
  <div class="header">
    <span id="title">在线笔记本</span>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="0">
        <template slot="title">{{username}}</template>
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
  .header {
    width: 100%;
    height: 100%;
    background-color: blue;
    color: white;
  }
  
  .el-menu-demo {
    position: absolute;
    left: 90%;
    top: 0em;
    background: none;
  }
</style>
