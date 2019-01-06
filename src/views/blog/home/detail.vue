<template>
  <div class="acticle-detail">
    <div class="a-d-wrap">
      <div class="title">
        <h3>{{article.title}}</h3>
      </div>
      <div class="content">
        <mavon-editor v-model="article.content" class="mavon" :subfield='false' :boxShadow='false' :toolbarsFlag='false' :editable='false' defaultOpen='preview'/>
      </div>
      <div class="comments" v-if='commentList.length'>
        <div class="hd">
          留言({{commentList.length}}条)
        </div>
        <div class="bd">
          <div v-for='item in commentList' :key='item.id' class="messgBox">
            <div class="name">{{item.name}}说：</div>
            <div class="content">{{item.content}}</div>
            <div class="createTime">时间：{{item.createTime}}</div>
          </div>
        </div>
      </div>
      <div class="message">
        <h3>我想说点什么</h3>
        <div class="c">
          <span>您的留言：</span>
          <textarea v-model="content"></textarea>
        </div>
        <div>
          <span>您的大名</span>
          <el-input v-model="name" />
        </div>
        <div>
          <span>电子邮件(还没校验)</span>
          <el-input v-model="email"/>
        </div>
        <div class="btns">
          <el-button @click="submit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {},
      content: '',
      name: '',
      email: '',
      commentList: []
    }
  },
  mounted () {
    this.getDetail()
    this.getMessage()
  },
  methods: {
    getDetail () {
      let id = this.$route.query.id
      console.log('id', id)
      let param = {
        id
      }
      this.$http.post('/public/article/getDetail', param).then(resp => {
        console.log('detail', resp.data)
        const data = resp.data
        this.article = data
      })
    },
    getMessage () {
      let params = {
        fromId: this.$route.query.id
      }
      this.$http.post('/public/message/detail', params).then(resp => {
        console.log('getMessage', resp.data)
        this.commentList = resp.data
      })
    },
    submit () {
      let params = {
        fromId: this.$route.query.id,
        content: this.content,
        name: this.name,
        email: this.email
      }
      this.$http.post('/public/message/create', params).then(resp => {
        console.log('resp', resp.data)
        this.name = ''
        this.content = ''
        this.email = ''
        this.getMessage()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comments {
  .hd {
    font-size: 2em;
  }
  .bd {
    .messgBox {
      padding: 10px;
      border-bottom: 1px dotted #999;
      .name {
        color: #2B2B2B;
        padding: 0.6em 0;
        font-weight: bold;
      }
      .content {
        padding-left: 10px;
      }
      .createTime {
        text-align: right;
        height: 26px;
      }
    }
  }
}
.message {
  margin-top: 30px;
  h3 {
    font-size: 2em;
    margin-top:20px;
  }
  .c {
    margin-top: 20px;
    textarea {
      vertical-align: top;
      height: 100px;
      width: 60%;
      padding: 6px;
      background: #fff;
      display: block;
    }
  }
  .btns {
    margin-top: 10px;
  }
}
</style>

<style lang='scss'>
.acticle-detail {
  width: 1140px;
  .a-d-wrap {
    width: 66%;
  }
}
.message {
  .el-input {
    width: 300px;
    display: block;
  }
}
</style>
