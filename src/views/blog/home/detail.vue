<template>
  <div>
    <div class="title">
      <h3>{{article.title}}</h3>
    </div>
    <div class="content">
      <mavon-editor v-model="article.content" class="mavon" :subfield='false' :boxShadow='false' :toolbarsFlag='false' :editable='false' defaultOpen='preview'/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {}
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      let id = this.$route.query.id
      console.log('id', id)
      let param = {
        id
      }
      this.$http.post('/article/getDetail', param).then(resp => {
        console.log('detail', resp.data)
        const data = resp.data
        this.article = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
