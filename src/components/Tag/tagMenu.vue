<template xmlns:v-contextmenu="http://www.w3.org/1999/xhtml">
  <div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>菜单1</v-contextmenu-item>
      <v-contextmenu-item>菜单2</v-contextmenu-item>
      <v-contextmenu-item>菜单3</v-contextmenu-item>
    </v-contextmenu>
    
    <div v-contextmenu:contextmenu>click here</div>
  </div>
</template>

<script>
  export default {
    name: "tagMenu",
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
