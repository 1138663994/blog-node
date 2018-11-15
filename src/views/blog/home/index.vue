<template>
  <div class="clearfix">
    <div class="cmain">
      <div class="blogs_box">
        <div class="blog" v-for='item in dataList' :key="item._id">
          <h3 class="blogtitle">
            <router-link :to='{name: "blog-detail", query: {id: item._id}}'>{{item.title}}</router-link>
          </h3>
          <!-- <span class="blogpic"><a href="/more/show/19.html" title="作为一个设计师,如果遭到质疑你是否能恪守自己的原则"><img src="http://www.yangqq.com/d/file/news/life/2018-06-29/75842f4d1e18d692a66c38eb172a40ab.jpg" alt="作为一个设计师,如果遭到质疑你是否能恪守自己的原则"></a></span> -->
          <!-- <p class="blogtext">曾经有站长找我求助，他说他不知道该怎么办，自己做出来的网站，不仅没有得到大家的认可，反而让大家给他开了一个评判大会。他自己认为已经是做的最好的，却遭受大家无情的... </p> -->
          <div class="bloginfo">
            <ul>
              <li class="lmname"><a href="javascript:;" target="_blank">{{item.category.name}}</a></li>
              <li class="timer">{{item.meta.updatedAt}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="category module">
        <div class="hd">
          <h3>分类</h3>
        </div>
        <!-- <div class="bd">
          <ul>
            <li>
              <a href="javascript:;">
                <span>javascript</span>
                <em>1篇</em>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span>javascript</span>
                <em>1篇</em>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span>javascript</span>
                <em>1篇</em>
              </a>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bhome',
  data () {
    return {
      params: {
        pageIndex: 1,
        order: '',
        title: ''
      },
      dataList: [],
      categoryList: []
    }
  },
  mounted () {
    // this.getCategoryList()
    this.getList()
  },
  methods: {
    getCategoryList () {
      this.$http.post('/articleCategory/list').then(resp => {
        let data = resp.data
        this.categoryList = data
        console.log('getCategoryList', this.categoryList)
      })
    },
    getList () {
      this.$http.post('/public/article/blogHomeList').then(resp => {
        this.dataList = resp.data
        console.log('dataList', this.dataList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cmain {
  width: 66%;
  float: left;
  overflow: hidden;
  min-height: 800px;
  z-index: 1;
  clear: both;
  .blogs_box {
    .blog {
      overflow: hidden;
      margin-bottom: 20px;
      padding: 20px;
      background: #FFF;
      .blogtitle {
        margin: 0 0 10px 0;
        font-size: 20px;
        overflow: hidden;
        a {
          color: #555;
          &:hover {
            color: #00A7EB;
          }
        }
      }
      .blogpic {
        float: left;
        width: 30%;
        max-height: 170px;
        margin-right: 20px;
        display: block;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .blogtext {
        font-size: 14px;
        color: #566573;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        margin-top: 20px;
      }
      .bloginfo {
        overflow: hidden;
        margin-top: 30px;
        li {
          float: left;
          font-size: 12px;
          padding: 0 0 0 20px;
          margin: 0 15px 0 0;
          color: #748594;
          line-height: 1.5;
          display: inline-block;
          a {
            color: #748594;
            &:hover {
              color: #000;
            }
          }
        }
      }
    }
  }
}
.sidebar {
  width: 32%;
  overflow: hidden;
  float: right;
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
