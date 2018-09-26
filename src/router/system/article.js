const Add = () => import('@/views/system/article/add')
const List = () => import('@/views/system/article/list')
const Edit = () => import('@/views/system/article/edit')

let article = [
  {
    path: 'article/add',
    name: 'system-article-add',
    component: Add
  }, {
    path: 'article/list',
    name: 'system-article',
    component: List
  }, {
    path: 'article/detail/:id?',
    name: 'system-article-edit',
    component: Edit
  }
]
export default article
