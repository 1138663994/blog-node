import Home from './home'

const blogLayout = () => import('@/views/blogLayout')
console.log('blogLayout')
const routes = [
  {
    path: '/blog',
    name: 'blog',
    component: blogLayout,
    redirect: '/blog/home',
    children: [
      ...Home
    ]
  }
]

export default routes
