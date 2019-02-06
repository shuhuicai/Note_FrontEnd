<template>
  <div class="userList" v-loading="loading" element-loading-text="拼命加载中……">
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
      
      <el-table-column prop="role" label="角色">
        <template slot-scope="scope">
          <span v-if="scope.row.role===0">管理员</span>
          <span v-else>普通用户</span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    
    </el-table>
    
    <!--分页-->
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="index" :page-size="pageSize" layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    
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
    data() {
      return {
        loading: true,
        tableData: [],
        pageSize: 10,//一页显示的数量
        index: 1,//当前页码下标值
        total: 0,//总记录数
        currentData: {},
        modifyVisible: false,
      }
    },
    mounted() {
      this.$root.Bus.$on('updateUserList', value => {
        this.tableData = value.users;
        this.pageSize = value.pageSize;
        this.index = value.index;
        this.total = value.total;
      });
      //添加用户后，刷新列表数据
      this.$root.Bus.$on('notifyUpdate', value => {
        this.initData();
      });
    },
    created() {
      this.initData();
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    methods: {
      initData() {
        var url = this.constant.serverURL + "/user/queryUser";
        var queryCondition = {
          "page": 1,
          "pageSize": 3,
          // "role": 1,
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
              this.index = data.index;
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
      /* 删除 */
      handleDelete(index, row) {
        this.$confirm('是否永久删除该记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var url = this.constant.serverURL + "/user/deleteUser";
          fetch(url, {
            body: "id=" + row.id,
            cache: 'no-cache',
            credentials: 'include',
            method: 'post',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
            headers: {
              // "Content-Type": "application/json;charset=utf-8",
              'Content-Type': 'application/x-www-form-urlencoded',
              // Accept: 'application/json'
            }
          }).then(response => {
            response.json().then((data) => {
              if (data) {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success'
                });
                this.initData();
              } else {
                this.$notify({
                  title: 'info',
                  message: '未删除'
                })
              }
            })
          }, response => {
            this.$notify.error({
              title: '提示',
              message: '删除失败'
            })
          });
        }).catch(() => {//取消删除
        })
        
      },
      /* 提交保存用户修改的信息 */
      submitModify() {
        var url = this.constant.serverURL + "/user/modifyUser";
        var submitData = {
          "account": this.currentData.account,
          "password": this.currentData.password,
          "id": this.currentData.id,
        };
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
            message: '修改成功！',
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
      /* 换页 */
      handleCurrentChange(val) {
        this.$root.Bus.$emit('page', val);
      },
      /* 跳转到指定页面 */
      handleSizeChange() {
      
      }
    }
  }
</script>

<style scoped>
  .page {
    margin-top: 10px;
    float: right;
  }
</style>
