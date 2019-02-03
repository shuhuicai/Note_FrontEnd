<template>
  <div class="userList">
    <el-table :data="tableData">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="account" label="账号" width="100"></el-table-column>
      <el-table-column prop="creator" label="创建人" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="100"></el-table-column>
      <el-table-column prop="password" label="密码" width="100"></el-table-column>
      <el-table-column prop="remarks" label="说明" width="100"></el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "userList",
    data() {
      return {
        tableData: [],
        pageSize: 10,//一页显示的数量
        currentPage: 1,//当前页码下标值
        total: 10,
      }
    },
    created() {
      this.initData();
      setTimeout(() => {
        this.loading = false;
      }, 1500)
    },
    methods: {
      initData() {
        var url = this.constant.serverURL + "/user/queryUser";
        var queryCondition = {
          "page": 1,
          "pageSize": 10,
          "role":1,
        };
        fetch(url, {
          body: JSON.stringify(queryCondition),
          cache: 'no-cache',
          credentials: 'include',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            "Content-Type": 'application/json;charset=UTF-8',
            Accept: 'application/json'
          }
        }).then(response => {
            response.json().then((data) => {
              this.tableData = data.users;
              this.pageSize = data.pageSize;
              this.total = data.total;
              this.currentPage = data.index;
            })
          },
          response => {
          
          });
      }
    }
  }
</script>

<style scoped>

</style>
