import Page from './page'
import Article from './article'
import backLayout from '@/views/systemLayout'

// const backLayout = () => import('@/views/systemLayout')
const routes = [
  {
    path: '/system',
    name: 'system-home',
    component: backLayout,
    redirect: '/system/home',
    children: [
      ...Page,
      ...Article
    ]
  }
]

export default routes
