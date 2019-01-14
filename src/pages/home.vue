<template>
  <div class="home">
    <!--<div class="main">
      <div>
        <v-header></v-header>
      </div>
      <div class="left">
        <v-menu></v-menu>
      </div>
      <div class="content">
        <transition name="el-zoom-in-top">
          <router-view v-show="show"></router-view>
        </transition>
      </div>
    
    </div>-->
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
<!--<style lang="scss">-->
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
/*
$commonColor: '#20a0ff';
.home {
  .content {
    position: absolute;
    left: 200px;
    top: 70px;
    bottom: 0;
    overflow: scroll;
    width: calc(100% - 210px);
  }
  .content::-webkit-scrollbar {
    display: none;
  }
}*/

</style>
