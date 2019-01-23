<template>
  <div class="showImage">
    <img v-bind:src="reqURL"/>
  </div>
</template>

<script>
  export default {
    name: "showImage",
    data() {
      return {
        imgURL: '',
        reqURL: this.constant.serverURL + "/image/showImage?visitURL=" + this.imgURL,
      }
    },
    beforeCreate() {
      this.imgURL = this.$route.params.imgURL;
    }
  }
</script>

<style scoped>

</style>
