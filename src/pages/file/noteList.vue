<template>
  <div class="note_list">
    <el-table :data="notes">
      <el-table-column prop="label" label="名称"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "note_list",
    data() {
      return {
        tag_content: '',
        notes: [],
      }
    },
    created() {
      this.tag_content = this.$route.params.tag_content;
      this.getNoteList();
    },
    methods: {
      getNoteList() {
        fetch(this.constant.serverURL + "/folder/queryNoteByTag", {
          body: "tagContent=" + this.tag_content,
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
            this.notes = data;
          });
        }, response => {
        
        })
      },
    },
  }
</script>

<style scoped>

</style>
