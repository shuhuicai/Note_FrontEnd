<template>
  <div class="home">
    <admin_header class="headerArea"></admin_header>
    <el-row>
      <el-col :span="4">
        <admin_menu></admin_menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import adminHeader from './components/adminHeader'
  import adminMenu from './components/adminMenu'
  
  export default {
    name: "adminHome",
    components: {
      admin_header: adminHeader,
      admin_menu: adminMenu,
    },
  }
</script>

<style scoped>
  .headerArea {
    width: 100%;
    padding: 1.5em;
  }
  
  .home {
    width: 100%;
    height: 100%;
  }
</style>
