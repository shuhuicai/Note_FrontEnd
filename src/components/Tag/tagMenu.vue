<template>
  <div>
    <el-tree :data="tags">
    
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
            console.log(data)
          })
        }, response => {
        
        })
      }
    }
  }
</script>

<style scoped>

</style>
