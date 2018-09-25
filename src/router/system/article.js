import Add from '@/views/system/article/add'
import Detail from '@/views/system/article/detail'
import List from '@/views/system/article/list'

let article = [
  {
    path: 'article/add',
    name: 'article-add',
    component: Add
  }, {
    path: 'article/detail/:id?',
    name: 'article-detail',
    component: Detail
  }, {
    path: 'article/list',
    name: 'article',
    component: List
  }
]
export default article
