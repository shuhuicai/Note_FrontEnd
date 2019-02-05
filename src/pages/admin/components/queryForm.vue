<template>
  <div class="queryForm">
    <el-date-picker v-model="queryForm.dateRange" type="daterange" start-placeholder="开始日期"
                    end-placeholder="结束日期">
    </el-date-picker>
    
    <el-input v-model="queryForm.account" placeholder="请输入账号" class="queryInput" clearable></el-input>
    <el-input v-model="queryForm.creator" placeholder="请输入创建人" class="queryInput" clearable></el-input>
    
    <el-button type="primary" @click="toQuery">搜索</el-button>
    <el-button type="primary" @click="addBtn">新增</el-button>
  </div>
</template>

<script>
  import {reformat} from "../../../common/reformartDate";
  
  export default {
    name: "queryForm",
    data() {
      return {
        page: 1,
        queryForm: {//查询条件
          account: "",
          creator: "",
          dateRange: [],//选择的时间范围
        },
      }
    },
    mounted() {
      this.$root.Bus.$on('page', value => {
        this.page = value;
        this.queryUser();
      });
    },
    methods: {
      toQuery() {
        this.page = 1;
        this.queryUser();
      },
      /* 根据指定条件查询 */
      queryUser() {
        var createTime1, createTime2;
        if (this.queryForm.dateRange != null && this.queryForm.dateRange.length !== 0) {
          createTime1 = reformat(this.queryForm.dateRange[0]);
          createTime2 = reformat(this.queryForm.dateRange[1]);
        } else {
          createTime1 = "";
          createTime2 = "";
        }
        var queryConditions = {
          "page": this.page,
          "pageSize": 3,
          "role": 1,
          "createTime1": createTime1,
          "createTime2": createTime2,
          "account": this.queryForm.account,
          "creator": this.queryForm.creator,
        };
        fetch(this.constant.serverURL + "/user/queryUser", {
          body: JSON.stringify(queryConditions),
          cache: 'no-cache',
          credentials: 'include',
          referrer: 'no-referrer',
          method: 'post',
          mode: 'cors',
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
          }
        }).then(response => {
          response.json().then((data) => {
            this.$root.Bus.$emit('updateUserList', data);//将查询结果通过EventBus的形式传到userList组件
          })
        }, response => {
          this.$notify.error({
            title: '提示',
            message: '查询失败',
          })
        })
      },
      addBtn() {
      
      },
    },
  }
</script>

<style scoped>
  .queryInput {
    width: 15em;
    margin: 1em;
  }
</style>
