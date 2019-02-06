<template>
  <div class="adminMenu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router>
      <el-submenu index="1">
        <template slot="title">
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/userList">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="2">
        <template slot="title">
          <!--<i class="el-icon-document"></i>-->
          <span>文件列表</span>
        </template>
        <el-menu-item-group>
          <!--<tagMenu></tagMenu>-->
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="3">
        <template slot="title">
          <span>文件夹管理</span>
        </template>
        <el-menu-item-group>
        
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="4">
        <template slot="title">
          <span>标签管理</span>
        </template>
        <el-menu-item-group>
        
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  
  export default {
    name: "adminMenu",
    components: {}
  }
</script>

<style scoped>

</style>
