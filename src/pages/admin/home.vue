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
  import header from './components/header'
  import menu from './components/menu'
  
  export default {
    name: "home",
    components: {
      admin_header: header,
      admin_menu: menu,
    },
    data() {
      return {}
    },
    methods() {
    
    }
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
