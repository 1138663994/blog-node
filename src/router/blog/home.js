const Home = () => import('@/views/blog/home/')
const Detail = () => import('@/views/blog/home/detail')

const home = [
  {
    path: 'home',
    name: 'blog-home',
    component: Home
  },
  {
    path: 'detail/:id?',
    name: 'blog-detail',
    component: Detail
  }
]
export default home
