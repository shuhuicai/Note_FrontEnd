<template>
  <div class="showWord">
    <iframe :src=srcValue></iframe>
  </div>
</template>

<script>
  export default {
    name: "showWord",
    data() {
      return {
        fileUrl: '',
        srcValue: "https://docs.google.com/viewer?url=" + this.fileUrl + "'\""
      }
    },
    beforeCreate() {
      this.fileUrl = this.$route.params.fileUrl;
    }
  }
</script>

<style scoped>

</style>
