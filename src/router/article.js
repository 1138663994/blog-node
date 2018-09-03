import Add from '@/views/article/add'
import Detail from '@/views/article/detail'
let article = [
  {
    path: '/article',
    name: 'article',
    component: Add
  }, {
    path: '/article/detail',
    name: 'article-detail',
    component: Detail
  }
]
export default article
