<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" :rules="rule" ref="ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model.trim="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psw">
        <el-input v-model.trim="ruleForm.psw"></el-input>
      </el-form-item>
      <el-button type="primary"  @click="submitForm('ruleForm')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'right',
      ruleForm: {
        name: '',
        psw: ''
      },
      rule: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 16, message: '长度小于16个字符', trigger: 'blur' }
        ],
        psw: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6-20位字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (form) {
      console.log('form', form)
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
