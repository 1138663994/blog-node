const Login = () => import('@/views/login.vue')
const Register = () => import('@/views/register.vue')

let common = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]
export default common
