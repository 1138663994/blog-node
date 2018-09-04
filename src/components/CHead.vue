<template>
  <div>
    <el-button type="primary"  @click="layout()" size='mim'>退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'CHead',
  methods: {
    layout () {
      this.$http.post('/loginout').then(resp => {
        console.log('退出登录', resp.data)
        this.$router.push({name: 'login'})
      })
    }
  }
}
</script>
