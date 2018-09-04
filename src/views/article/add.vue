<template>
  <div class="articleDetail">
    <div class="title">
      <input type="text" placeholder="请输入文章标题" v-model="title"/>
    </div>
    <div class="edit">
      <mavon-editor v-model="value" defaultOpen='edit' class="mavon" :subfield='false'/>
      <!-- <mavon-editor v-model="value" defaultOpen='preview' :subfield='false' :toolbarsFlag='false'/> -->
    </div>
    <div class="mb20 category">
      <el-select v-model="category" placeholder="请选择文章分类">
        <el-option
          v-for="item in categoryList"
          :key="item._id"
          :label="item.name"
          :value="item._id">
        </el-option>
      </el-select>
      <el-input v-model="newCategory" class="input"/>
      <el-button @click='addCategory'>新增分类</el-button>
    </div>
    <div class="mb20 switch">
      <span>是否公开：</span>
      <el-switch
        v-model="switchVal"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
    <el-button @click='save'>保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'article-detail',
  data () {
    return {
      title: '',
      value: '',
      category: '',
      newCategory: '',
      categoryList: [],
      switchVal: false
    }
  },
  mounted () {
    this.getCategoryList()
  },
  methods: {
    htmlCode (flag, value) {
      console.log('flag', flag)
      console.log('value', value)
    },
    save () {
      let params = {
        title: this.title,
        content: this.value,
        category: this.category,
        isOpen: this.switchVal
      }
      console.log('param', params)
      this.$http.post('/article/add', params).then(resp => {
        console.log('resp', resp.data)
      })
    },
    getCategoryList () {
      this.$http.post('/articleCategory/list').then(resp => {
        console.log('articleCategory', resp.data)
        let data = resp.data
        this.categoryList = data
      })
    },
    addCategory () {
      let params = {
        name: this.newCategory
      }
      this.$http.post('/articleCategory/add', params).then(resp => {
        console.log('respadd', resp.data)
        this.getCategoryList()
      })
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
    height: 600px;
    .mavon {
      height: 100%;
    }
  }
  .category {
    text-align: left;
    .input {
      width: 200px;
    }
  }
  .switch {
    text-align: left;
  }
</style>
