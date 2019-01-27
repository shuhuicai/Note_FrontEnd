<template xmlns:v-contextmenu="http://www.w3.org/1999/xhtml">
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree ref="tree" :data="folderData" node-key="id" draggable :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <li v-if="data.isFolder==1" v-contextmenu:folderMenu @contextmenu="getNodeData(node,data)">
                <span v-if="data.remarks==0">{{ node.label}}</span>
                <input v-model="label" v-else @blur="submitName">
              </li>
              <li v-else v-contextmenu:fileMenu @dblclick="doubleClick(data)"
                  @contextmenu="getNodeData(node,data)">
                <span v-if="data.remarks==0">{{node.label}}</span>
                <input v-model="label" v-else @blur="submitName">
              </li>
          </span>
        </el-tree>
      </div>
    </div>
    
    <!--文件夹的情况-->
    <v-contextmenu ref="folderMenu">
      <v-contextmenu-submenu title="创建">
        <v-contextmenu-item @click="popupDialog(false)">文件夹</v-contextmenu-item>
        <v-contextmenu-item @click="createNote">笔记</v-contextmenu-item>
        <v-contextmenu-item>Markdown</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-submenu title="上传">
        <v-contextmenu-item @click="toUploadPage(0)">图片</v-contextmenu-item>
        <v-contextmenu-item @click="toUploadPage(1)">pdf</v-contextmenu-item>
        <v-contextmenu-item @click="toUploadPage(2)">word</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-item @click="remove">删除</v-contextmenu-item>
      <v-contextmenu-item @click="updateName">重命名</v-contextmenu-item>
    </v-contextmenu>
    
    <!--文件的情况-->
    <v-contextmenu ref="fileMenu">
      <v-contextmenu-item>打开</v-contextmenu-item>
      <v-contextmenu-item @click="remove">删除</v-contextmenu-item>
      <v-contextmenu-item @click="updateName">重命名</v-contextmenu-item>
    </v-contextmenu>
    
    <el-dialog title="创建" :visible.sync="dialogVisible" width="20%" :modal-append-to-body="false">
      <!--文件夹-->
      <el-form v-if="!isFile">
        <el-form-item label="文件夹名">
          <el-input v-model="dialogData.folderName" auto-complete="off" placeholder="请输入文件夹名"></el-input>
        </el-form-item>
      </el-form>
      
      <!--文件-->
      <el-form v-else :model="dialogData">
        <el-form-item label="文件名">
          <el-input v-model="dialogData.name" auto-complete="off" placeholder="请输入文件名"></el-input>
        </el-form-item>
        
        <el-form-item label="类型">
          <el-select v-model="dialogData.type" placeholder="类型">
            <el-option label="pdf" value="1"></el-option>
            <el-option label="word" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm" type="primary">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "folderTree",
    data() {
      return {
        folderData: [],
        dialogVisible: false,
        dialogData: {
          name: '',
          type: '',
          folderName: '',
        },
        isFile: false,//区分是创建文件还是文件夹
        currentData: {},
        currentNote: {},
        label: '',
      }
    },
    
    created() {
      this.initFolder();
      setTimeout(() => {
        this.loading = false;
      }, 1500)
    },
    mounted() {
      this.$root.Bus.$on('updateFolder', value => {
        this.$refs.tree.append(value, value.parentId);//将文件名字添加到目录
      })
    },
    methods: {
      /*初始化左边文件夹结构*/
      initFolder() {
        fetch(this.constant.serverURL + "/folder/initFolder", {
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            Accept: "application/json"
          }
        }).then(response => {
            response.json().then((data) => {
              this.folderData = data;
            });
          },
          response => {
          })
      },
      /* 跳转到创建笔记 */
      createNote() {
        this.$router.push({
          name: 'noteFile',
          params: {
            id: this.currentData.id,
          }
        });
      },
      /*弹出对话框*/
      popupDialog(isFile) {
        // console.log(vm.$vnode.child.$$contextmenu.$parent.node.data);
        this.isFile = isFile;
        this.dialogVisible = true;
      },
      
      /*获取当前右键点击的文件夹数据*/
      getNodeData(node, data) {
        this.currentData = data;
        this.currentNode = node;
      },
      
      /* 新建文件夹 */
      append() {
        var sendData = {};
        if (this.isFile) {
          sendData = {
            "label": this.dialogData.name,
            "parentId": this.currentData.id,
            "isFolder": 0
          };
        } else {
          sendData = {
            "label": this.dialogData.folderName,
            "parentId": this.currentData.id,
            "isFolder": 1,
            "fileType": -1
          };
        }
        fetch(this.constant.serverURL + "/folder/createFolder", {
          body: JSON.stringify(sendData),
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            "Content-Type": 'application/json;charset=UTF-8',
          }
        }).then(response => {
          response.json().then((data) => {
            const newChild = data;
            if (!this.currentData.children) {
              this.$set(this.currentData, 'children', []);
            }
            this.currentData.children.push(newChild);
          })
        }, response => {
        })
      },
      
      remove() {//删除文件夹或文件
        const parent = this.currentNode.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === this.currentData.id);
        fetch(this.constant.serverURL + "/folder/deleteFolder", {
          body: JSON.stringify(this.currentData),
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            "Content-Type": 'application/json;charset=UTF-8',
            Accept: "application/json"
          }
        }).then(response => {
          response.json().then((data) => {
            if (data) {
              children.splice(index, 1);
            }
          })
        }, response => {
        })
      },
      
      /* 确定按钮 */
      confirm() {
        if (this.isFile) {//文件
          if (this.dialogData.type != '' && this.dialogData.name != '') {
            this.dialogVisible = false;
            this.append();
          } else {
            alert("请输入名字和类型");
          }
        } else {//文件夹
          if (this.dialogData.folderName != '') {
            this.dialogVisible = false;
            this.append();
          } else {
            alert("请输入文件夹名");
          }
        }
      },
      /*双击文件*/
      doubleClick(data) {
        if (data.fileType == 0) {
          this.$router.push({name: 'showImage', params: {imgURL: data.fileUrl}});
        } else {
          this.$router.push({name: 'showFile', params: {file_url: data.fileUrl}});
        }
      },
      cancel() {//取消按钮
        this.dialogData.name = '';
        this.dialogData.type = '';
        this.dialogVisible = false;
      },
      //跳转到上传文件的页面
      toUploadPage(fileType) {
        this.$router.push({
          name: 'uploadImage',
          params: {
            id: this.currentData.id,
            fileType: fileType
          }
        });
      },
      /* 重命名 */
      updateName() {
        this.currentData.remarks = 1;
        this.label = this.currentNode.label;
      },
      /* 更新新名字到服务器 */
      submitName() {
        this.currentData.remarks = 0;
        var temp = this.currentData.label;
        this.currentData.label = this.label;
        fetch(this.constant.serverURL + "/folder/updateLabel", {
          body: JSON.stringify({
            "id": this.currentData.id,
            "label": this.currentData.label
          }),
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            "Content-Type": 'application/json;charset=UTF-8',
            Accept: "application/json"
          }
        }).then(response => {
          response.json().then((data) => {
            if (!data) {
              this.currentData.label = temp;
              this.$notify.error({
                title: '提示',
                message: '更新失败',
              });
            }
          })
        }, response => {
          this.$notify.error({
            title: '提示',
            message: '更新失败',
          });
        })
      }
    }
  }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 20em;
  }
</style>
