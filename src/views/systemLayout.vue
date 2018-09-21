<template>
  <div>
    <div class="menu">
      <c-menu></c-menu>
    </div>
    <div class="head">
      <c-head></c-head>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import CMenu from '@/components/CMenu'
import CHead from '@/components/CHead'

export default {
  name: 'SystemLayout',
  components: {
    CMenu,
    CHead
  },
  methods () {
    console.log('systemlayout')
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  left: 0;
  top: 50px;
  z-index: 9;
  bottom: 0;
  background: #fff;
  border-right: 1px solid #eee;
}
.main {
  padding-left: 200px;
}
.head {
  height: 50px;
  width: 100%;
}
</style>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
  background: #f5f4f3
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .el-menu {
    border-right: none;
  }
}
</style>
