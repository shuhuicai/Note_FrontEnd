<template>
  <div class="showFile">
    <!--<embed v-bind:src="req_url" width="100%" height="800px"/>-->
    <iframe :src="req_url" width="100%" height="750px"></iframe>
  </div>
</template>

<script>
  export default {
    name: "showFile",
    data() {
      return {
        file_url: '',
        req_url: this.constant.serverURL + "/file/showFile?visitURL=" + this.file_url
      }
    },
    beforeCreate() {
      this.file_url = this.$route.params.file_url
    },
  }
</script>

<style scoped>

</style>
