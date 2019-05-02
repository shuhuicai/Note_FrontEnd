<template>
  <div>
    <el-tree :data="tags">
      <span class="custom-tree-node" slot-scope="{node,data}" @dblclick="double_click(data.label)">
        {{node.label}}
      </span>
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: "tagMenu",
    data() {
      return {
        tags: []
      }
    },
    created() {
      this.getTags();
      this.$root.Bus.$on('updateTagList', value => {
        var flag = false;//标志是否有元素与对象相同,默认是没有 false
        for (var i = 0; i < this.tags.length; i++) {
          if (value == this.tags[i].label) {
            flag = true;
            break;
          } else {
            flag = false;
          }
        }
        if (!flag) {//如果都不相同,刷新列表
          this.getTags();
        }
      });
    },
    methods: {
      getTags() {
        fetch(this.constant.serverURL + "/tag/getTags", {
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
            this.tags = data;
          })
        }, response => {
        
        })
      },
      double_click(label) {
        this.$router.push({name: 'note_list', query: {tag_content: label}});
      }
    }
  }
</script>

<style scoped>

</style>
