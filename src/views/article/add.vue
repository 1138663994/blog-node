<template>
  <div class="artivcle-add">
    <textarea v-model="txtVal" cols="30" rows="10"></textarea>
    <el-button type="primary"  @click="add()">添加</el-button>
    <el-button type="primary"  @click="layout()">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      txtVal: ''
    }
  },
  methods: {
    add () {
      console.log(this.txtVal)
      let params = {
        txtVal: this.txtVal
      }
      this.$http.post('/blog/article/add', params).then(resp => {
        console.log('data', resp.data)
      })
    },
    layout () {
      this.$http.post('/blog/loginout').then(resp => {
        console.log('data', resp.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 500px;
  height: 300px;
  position: relative;
}
</style>
