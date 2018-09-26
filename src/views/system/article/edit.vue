<template>
  <div class="articleDetail">
    <div class="title">
      <input type="text" placeholder="请输入文章标题" v-model="title"/>
    </div>
    <div class="edit">
      <mavon-editor v-model="value" class="mavon" :subfield='true'/>
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
    <el-button @click='back'>返回</el-button>
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
    this.getDetail()
  },
  methods: {
    htmlCode (flag, value) {
      console.log('flag', flag)
      console.log('value', value)
    },
    getDetail () {
      let id = this.$route.query.id
      console.log('id', id)
      let param = {
        id
      }
      this.$http.post('/article/getDetail', param).then(resp => {
        console.log('detail', resp.data)
        const data = resp.data
        this.title = data.title
        this.switchVal = data.isOpen
        this.value = data.content
        this.category = data.category.name
      })
    },
    back () {
      this.$router.go(-1)
    },
    save () {
      let params = {
        id: this.$route.query.id,
        title: this.title,
        content: this.value,
        category: this.category,
        isOpen: this.switchVal
      }
      console.log('param', params)
      this.$http.post('/article/edit', params).then(resp => {
        console.log('resp', resp.data)
        this.$router.push({name: 'system-article'})
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
      background-color: #fff;
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
