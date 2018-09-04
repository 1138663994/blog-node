import Add from '@/views/article/add'
import Detail from '@/views/article/detail'
import List from '@/views/article/list'

let article = [
  {
    path: '/article/add',
    name: 'article-add',
    component: Add
  }, {
    path: '/article/detail/:id',
    name: 'article-detail',
    component: Detail
  }, {
    path: '/article/list',
    name: 'article',
    component: List
  }
]
export default article
