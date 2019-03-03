<template>
  <div class="noteFile">
    <el-input type="text" v-model="noteName"/>
    <!--:config="editorOption"-->
    
    <!--@blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"-->
    <quill-editor ref="myTextEditor"
                  v-model="content"
                  :options="editorOption"></quill-editor>
    <button @click="printContextToConsole">print</button>
    <button @click="createNote">保存</button>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  
  export default {
    name: "noteFile",
    data() {
      return {
        noteName: '',
        content: '<h2>I am Example</h2>',
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
    components: {
      quillEditor
    },
    methods: {
      onEditorBlur() {
        // console.log("onEditorBlur method");
      },
      onEditorFocus() {
        // console.log("onEditorFocus method");
      },
      onEditorReady() {
        // console.log("onEditorReady method");
      },
      printContextToConsole() {
        console.log(this.content);
      },
      /* 保存笔记 */
      createNote() {
        fetch(this.constant.serverURL + "/file/saveNote", {
          body: JSON.stringify({
            "parentId": this.$route.params.id,
            "noteName": this.noteName,
            "content": this.content
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
      }
    },
  }
</script>

<style scoped>

</style>
