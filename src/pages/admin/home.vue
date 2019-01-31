<template>
  <div class="home">
    <admin_header class="headerArea"></admin_header>
  </div>
</template>

<script>
  import header from './components/header'
  
  export default {
    name: "home",
    components: {
      admin_header: header,
    },
    data() {
      return {}
    },
    methods() {
    
    }
  }
</script>

<style scoped>
  .headerArea {
    width: 100%;
    padding: 1.5em;
  }
  
  .home {
    width: 100%;
    height: 100%;
  }
</style>
