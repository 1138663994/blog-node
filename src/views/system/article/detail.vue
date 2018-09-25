<template>
  <div class="articleDetail">
    <div class="title">
      <input type="text" placeholder="请输入文章标题"/>
    </div>
    <div class="edit">
      <!-- <mavon-editor v-model="value" defaultOpen='edit'/> -->
      <mavon-editor v-model="value" defaultOpen='preview' :subfield='false' :toolbarsFlag='false'/>
    </div>
    <el-button @click='save'>保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'article-detail',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    save () {
      console.log('val', this.value)
    },
    htmlCode (flag, value) {
      console.log('flag', flag)
      console.log('value', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .articleDetail {
    padding: 20px;
  }
  .title {
    margin-bottom: 20px;
    input {
      height: 40px;
      line-height: 40px;
      border: none;
      width: 100%;
      background-color: #efefef;
      color: #4f4f4f;
      padding: 0 16px;
      box-sizing: border-box;
    }
  }
  .edit {
    margin-bottom: 20px;
  }
</style>
