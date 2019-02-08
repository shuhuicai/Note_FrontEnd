<template>
  <div class="folderList">
    <el-table :data="tableData">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column prop="creator" label="创建人" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100"></el-table-column>
      <el-table-column prop="modifier" label="修改人" width="100"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="100"></el-table-column>
      <el-table-column prop="label" label="文件名" width="100"></el-table-column>
      <el-table-column prop="fileUrl" label="文件URL" width="100"></el-table-column>
    </el-table>
    
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="index" :page-size="pageSize" layout="prev,pager,next,jumper"
                     :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "folderList",
    data() {
      return {
        loading: true,
        tableData: [],
        pageSize: 10,
        index: 1,
        total: 0,
      }
    },
    created() {
      this.getData(1);
    },
    methods: {
      getData(page) {
        var url = this.constant.serverURL + "/folder/queryFolder";
        var queryCondition = {
          "page": page,
          "pageSize": 10
        };
        fetch(url, {
          body: JSON.stringify(queryCondition),
          cache: 'no-cache',
          credentials: 'include',
          method: 'post',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            "Content-Type": 'application/json;charset=utf-8',
            "Accept": 'application/json'
          }
        }).then(response => {
          response.json().then((data) => {
            this.tableData = data.lists;
            this.pageSize = data.pageSize;
            this.total = data.total;
            this.index = data.index;
          })
        }, response => {
        });
      },
      handleCurrentChange(val) {
        this.getData(val);
      },
      handleSizeChange() {
      
      }
    },
  }
</script>

<style scoped>
  .page {
    margin-top: 10px;
    float: right;
  }
</style>
