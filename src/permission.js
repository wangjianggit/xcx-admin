import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, getLogin } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken() && getLogin()) {
    console.log(1)
    if (window.localStorage.getItem('token') - new Date().getTime()/1000 <= 0) {
      console.log(2)
      store.dispatch('FedLogOut').then(() => {
        Message.error(err || '验证失败请重新登录')
        console.log(3)
        next({ path: '/' })
      })
    } else {
      console.log(4)
      if (to.path === '/login') {
        next({ path: '/' })
        console.log(5)
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
