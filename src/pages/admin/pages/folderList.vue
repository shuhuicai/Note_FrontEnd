<template>
  <div class="folderList">
    <el-table :data="tableData">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column prop="account" label="账号" width="100"></el-table-column>
      <el-table-column prop="creator" label="创建人" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100"></el-table-column>
      <el-table-column prop="modifier" label="修改人" width="100"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="100"></el-table-column>
      <el-table-column prop="password" label="密码" width="100"></el-table-column>
      <el-table-column prop="remarks" label="说明" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "folderList",
    data() {
      return {}
    },
  }
</script>

<style scoped>

</style>
