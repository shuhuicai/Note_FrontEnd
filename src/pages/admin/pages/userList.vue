<template>
  <div class="userList">
    <!--查询条件-->
    <query_form></query_form>
    
    <el-table :data="tableData">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
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
    
    <!--弹出的弹窗-->
    <el-dialog title="修改信息" :visible.sync="modifyVisible">
      <el-form :model="currentData">
        <el-form-item label="姓名">
          <el-input v-model="currentData.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="currentData.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitModify">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import queryForm from '../components/queryForm'
  
  export default {
    name: "userList",
    components: {
      query_form: queryForm,
    },
    mounted() {
      this.$root.Bus.$on('updateUserList', value => {
        // this.currentData = value.users;
        this.tableData = value.users;
        this.pageSize = value.pageSize;
        this.currentPage = value.index;
        this.total = value.total;
      })
    },
    data() {
      return {
        tableData: [],
        pageSize: 10,//一页显示的数量
        currentPage: 1,//当前页码下标值
        total: 0,//总记录数
        currentData: {},
        modifyVisible: false,
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
          "role": 1,
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
            this.$notify.error({
              title: '提示',
              message: '查询用户信息失败',
            });
          });
      },
      /* 编辑用户信息 */
      handleEdit(index, row) {
        this.currentData = row;
        this.modifyVisible = true;
      },
      /* 提交保存用户修改的信息 */
      submitModify() {
        var url = this.constant.serverURL + "/user/modifyUser";
        var submitData = {
          "account": this.currentData.account,
          "password": this.currentData.password,
          "id": this.currentData.id,
        }
        fetch(url, {
          body: JSON.stringify(submitData),
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
            this.currentData.account = data.users[0].account;
            this.currentData.password = data.users[0].password;
            this.currentData.modifyTime = data.users[0].modifyTime;
          });
          this.$notify({
            title: '成功',
            message: '提交修改成功！',
            type: 'success'
          })
        }, response => {
          this.$notify.error({
            title: '提示',
            message: '修改失败',
          });
        });
        this.modifyVisible = false;
        this.currentData = {};
      },
      /* 取消 */
      cancel() {
        this.modifyVisible = false;
        this.currentData = {};
      },
    }
  }
</script>

<style scoped>

</style>
