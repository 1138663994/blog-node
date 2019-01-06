<template>
  <div>
    <div>
      <b-head></b-head>
    </div>
    <div class="main">
      <div class="main_wrap">
        <router-view/>
        <div class="sidebar">
          <div class="sign module">
            <div class="hd">
              <h3>签名</h3>
            </div>
            <div>
              <p>{{signData}}</p>
            </div>
          </div>
          <div class="category module">
            <div class="hd">
              <h3>分类</h3>
            </div>
            <div class="bd">
              <ul>
                <li v-for='item in categoryList' :key='item.id'>
                  <a href="javascript:;">
                    <span>{{item.name}}</span>
                    <em>1篇</em>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <b-footer></b-footer>
    </div>
  </div>
</template>

<script>
import BHead from '@/components/BHead'
import BFooter from '@/components/BFooter'

export default {
  name: 'blogLayoute',
  data () {
    return {
      categoryList: [],
      signData: ''
    }
  },
  mounted () {
    this.getCategoryList()
    this.getSign()
  },
  methods: {
    getCategoryList () {
      this.$http.post('/public/blogArticleCategory/list').then(resp => {
        let data = resp.data
        this.categoryList = data
        console.log('blogArticleCategory', this.categoryList)
      })
    },
    getSign () {
      this.$http.post('/public/sign').then(resp => {
        console.log('signresp', resp.data)
        this.signData = resp.data.data
      })
    }
  },
  components: {
    BHead,
    BFooter
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #f6f6f6;
}
.main_wrap {
  margin: 0 auto;
  padding: 20px 0;
  width: 1140px;
  position: relative;
}
.sidebar {
  width: 32%;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 20px;
  .module {
    padding: 35px 30px;
    margin-bottom: 20px;
    background: #FFF;
    .hd {
      font-size: 18px;
      color: #282828;
      font-weight: 600;
      margin: 0;
      text-transform: uppercase;
      margin-bottom: 25px;
      position: relative;
      h3 {
        padding-left: 15px;
        border-left: 3px solid #282828;
      }
    }
    .bd {
      li {
        margin-bottom: 8px;
      }
      a {
        display: block;
        color: #333;
        line-height: 22px;
        &:hover {
          color: #00A7EB;
        }
        em {
          float: right;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
