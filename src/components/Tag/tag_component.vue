<template>
  <div class="tag_component">
    <el-tag
      :key="tag"
      v-for="tag in tags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
  </div>
</template>

<script>
  export default {
    name: "tag_component",
    data() {
      return {
        tags: [],
        inputVisible: false,
        inputValue: '',
      }
    },
    props: ["note_id"],
    created() {
      this.getTags();
    },
    methods: {
      //初始化获取已添加的标签
      getTags() {
        fetch(this.constant.serverURL + "/tag/getAllTag", {
          body: "noteId=" + this.note_id,
          cache: 'no-cache',
          credentials: 'include',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: "application/json"
          }
        }).then(response => {
          response.json().then((data) => {
            this.tags = data;
          })
        }, response => {
        
        })
      },
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.savetagInput.$refs.input.focus();
        });
      },
      
      //移动焦点添加标签
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.addTag(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      //添加标签请求
      addTag(content) {
        fetch(this.constant.serverURL + "/tag/addTagToNote", {
          body: "noteId=" + this.note_id + "&tagContent=" + content,
          cache: 'no-cache',
          credentials: 'include',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: "application/json"
          }
        }).then(response => {
            response.json().then((data) => {
              if (data) {
                //成功
                this.tags.push(content);
              } else {
                this.$notify.error({
                  title: '提示',
                  message: '添加标签失败',
                });
              }
            })
          },
          response => {
            this.$notify.error({
              title: '提示',
              message: '添加标签失败',
            });
          })
      },
    }
  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
