<template>
  <div class="noteFile">
    <el-input type="text" v-model="noteName" placeholder="请输入笔记名" class="note_name"/>
    <i class="icon-tag" @click="showTag"></i>
    <tag_component class="tagArea" v-show="tagVisible" v-bind:note_id="id"></tag_component>
    <quill-editor ref="myTextEditor"
                  class="quill_editor"
                  v-model="content"
                  :options="editorOption"></quill-editor>
    <el-button @click="saveNote" type="primary">保存</el-button>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  import tag_component from '../../components/Tag/tag_component'
  
  export default {
    name: "noteFile",
    data() {
      return {
        noteName: '',
        noteName_backup: '',//备份好名字，修改时有改动再提交请求
        id: '',//笔记id值
        hadCreated: false,//标注是否是要修改笔记（true）或新建笔记(false)
        content: '',
        content_backup: '',
        tagVisible: false,
        editorOption: {
          // something config
          // theme:'bubble'
          theme: 'snow',
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],         //引用，代码块
            [{'header': 1}, {'header': 2}],               // 标题，键值对的形式；1、2表示字体大小
            [{'list': 'ordered'}, {'list': 'bullet'}],          //列表
            [{'script': 'sub'}, {'script': 'super'}],      // 上下标
            [{'indent': '-1'}, {'indent': '+1'}],          // 缩进
            [{'direction': 'rtl'}],                         // 文本方向
            [{'size': ['small', false, 'large', 'huge']}],  // 字体大小
            [{'header': [1, 2, 3, 4, 5, 6, false]}],         //几级标题
            [{'color': []}, {'background': []}],          // 字体颜色，字体背景颜色
            [{'font': []}],         //字体
            [{'align': []}],        //对齐方式
            ['clean'],        //清除字体样式
            ['image', 'video']        //上传图片、上传视频
          ]
        }
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.hadCreated = this.$route.query.hadCreated;
      if (this.hadCreated) {
        this.initNote();
      }
    },
    watch: {
      '$route'(to, from) {
        this.id = this.$route.query.id;
        this.hadCreated = this.$route.query.hadCreated;
        if (this.hadCreated) {
          this.initNote();
        } else {
          this.noteName = '';
          this.content = '';
        }
      }
    },
    components: {
      quillEditor,
      tag_component
    },
    methods: {
      /* 保存笔记 */
      saveNote() {
        if (this.hadCreated) {
          this.updateNote();
        } else {
          this.createNote();
        }
      },
      showTag() {
        this.tagVisible = !this.tagVisible;
      },
      
      /* 创建笔记 */
      createNote() {
        fetch(this.constant.serverURL + "/file/saveNote", {
          body: JSON.stringify({
            "parentId": this.$route.query.id,
            "label": this.noteName,
            "content": this.content
          }),
          cache: 'no-cache',
          credentials: 'include',
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
            if (data.result === 1) {
              this.$root.Bus.$emit('updateFolder', data.data);//将消息数据
              this.$notify({
                title: '提示',
                message: '保存成功',
                type: 'success'
              });
            } else {
              this.$notify.error({
                title: '提示',
                message: '保存失败',
              });
            }
          });
        }, response => {
          this.$notify.error({
            title: '提示',
            message: '内部错误',
          });
        });
      },
      /* 当为已经创建完打开笔记的情况下，根据id值请求该笔记相关数据 */
      initNote() {
        fetch(this.constant.serverURL + "/file/initNote?id=" + this.id, {
          cache: 'no-cache',
          credentials: 'include',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            Accept: "application/json"
          }
        }).then(response => {
          response.json().then((data) => {
            this.noteName = data.label;
            this.content = data.content;
            this.noteName_backup = data.label;//备份
            this.content_backup = data.content;
          })
        }, response => {
          console.log(response);
        });
      },
      
      updateNote() {
        const send_data = {};
        send_data.id = this.id;
        if (this.noteName_backup != this.noteName) {
          send_data.label = this.noteName;
        }
        if (this.content_backup != this.content) {
          send_data.content = this.content;
        }
        fetch(this.constant.serverURL + "/file/updateNote", {
          body: JSON.stringify(send_data),
          cache: 'no-cache',
          credentials: 'include',
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
              this.noteName_backup = this.noteName;
              this.content_backup = this.content;
              this.$root.Bus.$emit('updateName', this.noteName);//将数据通过EventBus的形式传到FolderTree组件，通知更新名字
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
            } else {
              this.$notify.error({
                title: '提示',
                message: '保存失败',
              });
            }
          })
        }, response => {
          this.$notify.error({
            title: '提示',
            message: '内部错误',
          });
        });
      }
    },
  }
</script>

<style>
  .noteFile .note_name {
    width: 50%;
  }
  
  .tagArea {
    margin: 10px;
  }
</style>
