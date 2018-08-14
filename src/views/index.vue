<template>
  <div>
      <p>{{msg}}</p>
      <router-link :to="{name: 'page'}">go page</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 212
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  p {
    color: red
  }
</style>
