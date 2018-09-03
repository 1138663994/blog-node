const menuRoutes = [
  {
    path: 'article',
    name: 'article',
    meta: {
      title: '文章管理',
      icon: 'el-icon-menu'
    },
    children: [{
      path: 'article',
      name: 'article',
      meta: {
        title: '文章列表',
        icon: 'el-icon-menu'
      }
    }, {
      path: 'article/detail',
      name: 'article-detail',
      meta: {
        title: '文章详情',
        icon: 'el-icon-menu'
      }
    }]
  }, {
    path: 'home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'el-icon-menu'
    }
  }
]

export default menuRoutes
