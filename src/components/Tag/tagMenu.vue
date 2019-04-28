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
        this.$router.push({name: 'note_list', params: {tag_content: label}});
      }
    }
  }
</script>

<style scoped>

</style>
