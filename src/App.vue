<template>
  <div id="app">
    <div class="menu">
      <c-menu></c-menu>
    </div>
    <div class="head"></div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import CMenu from '@/components/CMenu'

export default {
  name: 'App',
  components: {
    CMenu
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  left: 0;
  top: 60px;
  z-index: 9;
}
.main {
  padding-left: 200px;
}
.head {
  height: 50px;
  width: 100%;
  background: red;
}
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
