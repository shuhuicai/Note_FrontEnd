<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree ref="tree" :data="folderData" node-key="id" :expand-on-click-node="true"
                 @node-contextmenu="rightClick" @node-click="leftClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <li v-if="data.isFolder==1">
                <i class="folder"></i>
                <span v-if="data.remarks==0">{{ node.label}}</span>
                <input v-model="label" v-else @blur="submitName" autofocus>
              </li>
              
              <li v-else @dblclick="doubleClick(data)">
                <span v-if="data.remarks==0">{{node.label}}</span>
                <input v-model="label" v-else @blur="submitName" autofocus>
              </li>
          </span>
        </el-tree>
      </div>
    </div>
    
    <div v-show="menuVisible">
      <el-menu id="rightClickMenu" @select="handleRightSelect" mode="horizontal">
        <el-menu-item index="1" v-show="openVisible">
          <span slot="title">打开</span>
        </el-menu-item>
        <el-menu-item-group v-show="!openVisible">
          <template slot="title">创建</template>
          <el-menu-item index="2-1">文件夹</el-menu-item>
          <el-menu-item index="2-2">笔记</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group v-show="!openVisible">
          <template slot="title">上传</template>
          <el-menu-item index="3-1">图片</el-menu-item>
          <el-menu-item index="3-2">PDF文档</el-menu-item>
          <el-menu-item index="3-3">WORD文档</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="4">
          <span slot="title">删除</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">重命名</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <!--确定是否删除-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="removeFileOrFolder">确 定</el-button>
      </span>
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
        currentData: {},//当前选中的节点
        currentNote: {},
        openNoteData: {},//记录当前正打开的笔记的data节点
        label: '',
        menuVisible: false,
        openVisible: false,//右键菜单中是否显示“打开”“上传”等菜单项，右击文件夹时显示
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
      });
      this.$root.Bus.$on('updateName', value => {
        this.openNoteData.label = value;//更新文件名
      });
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
      
      /* 点击节点 */
      leftClick(data, node, element) {
        if (this.menuVisible) {
          this.menuVisible = false;
        }
      },
      
      /* 右键 */
      rightClick(event, data, node, element) {
        this.currentData = data;
        this.currentNode = node;
        this.menuVisible = !this.menuVisible;
        if (this.menuVisible) {
          if (data.isFolder != 1) {
            this.openVisible = true;
          } else {
            this.openVisible = false;
          }
        }
        document.addEventListener('click', (e) => {
          this.menuVisible = false;
        });
        let menu = document.querySelector("#rightClickMenu");
        menu.style.left = event.clientX + 30 + "px";
        menu.style.top = event.clientY + 10 + "px";
        //为新创建的DIV指定绝对定位
        menu.style.position = "fixed";
        menu.style.width = 160 + "px";
      },
      
      /* 点击右键菜单 */
      handleRightSelect(key) {
        if (key == 1) {//打开
          this.openFile();
        } else if (key == "2-1") {//创建
          //文件夹
          this.append();
        } else if (key == "2-2") {
          //笔记
          this.createNote();
        } else if (key == "3-1") {//上传
          //图片
          this.toUploadPage(0);
        } else if (key == "3-2") {
          //pdf
          this.toUploadPage(1);
        } else if (key == "3-3") {
          //word
          this.toUploadPage(2);
        } else if (key == 4) {//删除
          this.popConfirm();
        } else if (key == 5) {//重命名
          this.updateName();
        }
        this.menuVisible = false;
      },
      
      /* 重命名 */
      updateName() {
        this.currentData.remarks = 1;
        this.label = this.currentNode.label;
      },
      
      /* 弹出确定删除窗口 */
      popConfirm() {
        this.dialogVisible = true;
      },
      
      /* 提交删除文件夹或文件请求 */
      removeFileOrFolder() {
        this.dialogVisible = false;
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
      
      /* 新建文件夹 */
      append() {
        // 先向后台发送一个名字为“新建文件夹”的新建请求，保存成功再修改文件夹名
        var sendData = {
          "label": "新建文件夹",
          "parentId": this.currentData.id,
          "isFolder": 1,
          "fileType": -1
        };
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
            //数据填充后，开始修改名字
            this.currentData = data;
            this.currentData.remarks = 1;
            this.label = "新建文件夹";
          })
        }, response => {
          this.$notify.error({
            title: '提示',
            message: '内部错误',
          });
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
      
      /*双击文件*/
      doubleClick(data) {
        if (data.fileType == 0) {//图片
          this.$router.push({name: 'showImage', params: {imgURL: data.fileUrl}});
        } else if (data.fileType == 1) {//pdf
          this.$router.push({name: 'showFile', params: {file_url: data.fileUrl}});
        } else if (data.fileType == 3) {//富文本
          this.openNoteData = data;
          this.$router.push({
            name: 'noteFile',
            params: {
              id: data.id,
              hadCreated: true
            }
          });
        }
      },
      openFile() {
        this.doubleClick(this.currentData);
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
      
      /* 更新新文件名到服务器 */
      submitName() {
        this.currentData.remarks = 0;
        //先判断有没有更改内容，有的话再提交请求
        if (this.label != this.currentData.label && this.label.trim() != '') {
          var temp = this.currentData.label;
          this.currentData.label = this.label;
          fetch(this.constant.serverURL + "/folder/updateLabel", {
            body: JSON.stringify({
              "id": this.currentData.id,
              "label": this.label
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
            this.currentData.label = temp;
            this.$notify.error({
              title: '提示',
              message: '更新失败',
            });
          })
        }
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
  
  .folder {
    /*background:url(src/assets/sprite-4ce3c9eaa2.svg) no-repeat;*/
    background: url(../../assets/sprite-4ce3c9eaa2.svg);
    /*background:url(https://note.youdao.com/web/images/sprite-4ce3c9eaa2.svg);*/
    background-position: 56.657223796033996% 47.747747747747745%;
    width: 24px;
    height: 24px;
    display: inline-block;
  }
</style>
