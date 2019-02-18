<template>
  <div class="leftMenu">
    <el-row class="tac">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>我的文件夹</span>
          </template>
          <el-menu-item-group>
            <folderTree></folderTree>
          </el-menu-item-group>
        </el-submenu>
        
        <el-submenu index="2">
          <template slot="title">
            <!--<i class="el-icon-star-on"></i>-->
            <i class="icon-tag"></i>
            <span>我的标签</span>
          </template>
          <el-menu-item-group>
            <tagMenu></tagMenu>
          </el-menu-item-group>
        </el-submenu>
        
        <el-menu-item index="3">
          <i class="el-icon-delete"></i>
          <span slot="title">回收站</span>
        </el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
  import folderTree from './folder/folderTree'
  import tagMenu from './Tag/tagMenu'
  
  export default {
    components: {
      tagMenu,
      folderTree,
    },
    
  };
</script>
<style>
  .leftMenu {
    width: 100%;
  }
  
  .icon-tag {
    background: url(../assets/sprite-4ce3c9eaa2.svg);
    background-position: 88.6685552407932% 7.207207207207207%;
    width: 24px;
    height: 24px;
    display: inline-block;
  }
</style>
