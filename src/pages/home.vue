<template>
  <div class="home">
    <v-header class="headerArea"></v-header>
    <el-row>
      <el-col :span="5">
        <v-menu></v-menu>
      </el-col>
      <el-col :span="19">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import header from '../components/header.vue'
  import leftMenu from '../components/leftMenu.vue'
  
  export default {
    data() {
      return {
        show: true
      }
    },
    components: {
      'v-header': header,
      'v-menu': leftMenu
    }
  }

</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
  }
  
  .headerArea {
    width: 100%;
    padding: 1.5em;
  }
</style>
