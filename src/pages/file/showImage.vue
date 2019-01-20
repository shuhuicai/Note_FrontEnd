<template>
  <div class="showImage">
    <img src="imgURL">
  </div>
</template>

<script>
  export default {
    name: "showImage",
    data() {
      return {
        imgURl: this.$route.params.imgURL,
      }
    },
  }
</script>

<style scoped>

</style>
