const menuRoutes = [
  {
    path: 'home',
    name: 'system-home',
    meta: {
      title: '首页',
      icon: 'el-icon-menu'
    }
  },
  {
    path: 'article',
    name: 'article',
    meta: {
      title: '文章管理',
      icon: 'el-icon-menu'
    },
    children: [{
      path: 'article',
      name: 'system-article',
      meta: {
        title: '文章列表',
        icon: 'el-icon-menu'
      }
    },
    {
      path: 'article/detail',
      name: 'system-article-add',
      meta: {
        title: '新增文章',
        icon: 'el-icon-menu'
      }
    }
    ]
  }
]

export default menuRoutes
