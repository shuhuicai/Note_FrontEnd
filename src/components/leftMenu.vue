<template>
  <div class="leftMenu">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的文件夹</span>
            </template>
            <el-menu-item-group>
              <folderTree></folderTree>
            </el-menu-item-group>
          </el-submenu>
  
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的标签</span>
            </template>
            <el-menu-item-group>
              <p>df</p>
              <p>aa</p>
            </el-menu-item-group>
          </el-submenu>
          
          <el-menu-item index="3">
            <i class="el-icon-delete"></i>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import folderTree from './folder/folderTree'
  
  export default {
    components: {
      folderTree,
    },
  };
</script>
<style lang="scss">
  .leftMenu {
    display: block;
    position: fixed;
    bottom: 0;
    top: 60px;
    width: 30%;
    left: 0;
    z-index: 999;
    ul {
      height: 100%;
      border-radius: 0;
    }
  }
</style>
