import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    // hidden: true,
    meta: { title: '商消乐'},
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/mine',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'mine',
        component: () => import('@/views/mine/index'),
        // meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    hidden: true,
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/storemanage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'storemanage',
        component: () => import('@/views/storemanage/index'),
        meta: { title: '店铺管理', icon: 'store' }
      }
    ]
  },
  {
    path: '/rule',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'rulecao',
        component: () => import('@/views/rule/index'),
        meta: { title: '权限管理', icon: 'rule' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'order' }
      }
    ]
  },
  {
    path: '/vip',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'vip',
        component: () => import('@/views/vip/index'),
        meta: { title: '会员管理', icon: 'huiyuan' }
      }
    ]
  },
  {
    path: '/vipcard',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'vipcard',
        component: () => import('@/views/vipcard/index'),
        meta: { title: '会员卡管理', icon: 'vipcard' }
      }
    ]
  },
  {
    path: '/vipcard/addvipcard',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/',
        name: 'addvipacrd',
        component: () => import('@/views/vipcard/addvipcard')
      },
    ]
  },
  {
    path: '/wallet',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'wallet',
        component: () => import('@/views/wallet/index'),
        meta: { title: '钱包管理', icon: 'qianbao' }
      },
      {
        path: 'addBank',
        name: 'addBank',
        hidden: true,
        component: () => import('@/views/wallet/addBank'),
        meta: { title: '添加银行卡', icon: 'none' }
      }
    ]
  },
  {
    path: '/slotcard',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'slotcard',
        component: () => import('@/views/slotcard/index'),
        meta: { title: '刷卡消费', icon: 'slotcard' }
      }
    ]
  },
  {
    path: '/setiing',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'setiing',
        component: () => import('@/views/setiing/index'),
        meta: { title: '设置', icon: 'setiing' }
      }
    ]
  },
  {
    path: '/storemanage/addstore',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/storemanage/addstore',
        name: 'addstore',
        component: () => import('@/views/storemanage/addstore'),
        meta: { title: '添加店铺', icon: ''},
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },

    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
