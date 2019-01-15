<template>
  <div class="home">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside>
          <v-menu></v-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
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
<style>
  .home {
    height: 100%;
    width: 100%;
  }
  el-aside {
    width:20%;
    height: 100%;
    margin:0;
    padding:0;
  }
  el-main {
    width: 80%;
    height: 80%;
  }
</style>
