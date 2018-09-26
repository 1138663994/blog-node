const Home = () => import('@/views/system/home/')
const Page = () => import('@/views/system/page/')
const page = [
  {
    path: 'page',
    name: 'page',
    component: Page
  },
  {
    path: 'home',
    name: 'system-home',
    component: Home
  }
]
export default page
