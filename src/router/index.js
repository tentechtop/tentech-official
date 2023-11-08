import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      meta: {
        title: '首页', // 添加标题信息
        description: '首页', // 添加描述信息
      }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/product/products.vue'),
      meta: {
        title: '产品中心', // 添加标题信息
        description: '产品中心', // 添加描述信息
        keepAlive: true // 标识这个页面需要被缓存
      }
    },
    {
      path: '/product/:model',
      name: 'product',
      component: () => import("../views/product/product.vue"),
      meta: {
        title: '产品详情', // 添加标题信息
        description: '产品详情', // 添加描述信息
      }
    },
    {
      path: '/case',
      name: 'case',
      component: () => import('../views/case/index.vue'),
      meta: {
        title: '案例', // 添加标题信息
        description: '案例', // 添加描述信息
      }
    },
    {
      path: '/casedetail/:caseId',
      name: 'casedetail',
      component: () => import('../views/case/casedetail.vue'),
      meta: {
        title: '案例详情', // 添加标题信息
        description: '案例详情', // 添加描述信息
      }
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('../views/service/index.vue'),
      meta: {
        title: '服务', // 添加标题信息
        description: '服务', // 添加描述信息
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/news/index.vue'),
      meta: {
        title: '新闻', // 添加标题信息
        description: '新闻', // 添加描述信息
        keepAlive: true // 标识这个页面需要被缓存
      }
    },
    {
      path: '/newsitem/:newsId',
      name: 'newsDetail',
      component: () => import('../views/news/newsitem.vue'),
      meta: {
        title: '新闻详情', // 添加标题信息
        description: '新闻详情', // 添加描述信息
      }
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('../views/aboutus/index.vue'),
      meta: {
        title: '关于我们', // 添加标题信息
        description: '关于我们', // 添加描述信息
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact/index.vue'),
      meta: {
        title: '联系我们', // 添加标题信息
        description: '联系我们', // 添加描述信息
      }
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        title: '登录', // 添加标题信息
        description: '登录', // 添加描述信息
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/login/reset-password.vue'),
      meta: {
        title: '重置密码', // 添加标题信息
        description: '重置密码', // 添加描述信息
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/login/sign-up.vue'),
      meta: {
        title: '注册', // 添加标题信息
        description: '注册', // 添加描述信息
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/search/index.vue'),
      meta: {
        title: '搜索', // 添加标题信息
        description: '搜索', // 添加描述信息
      }
    },
    {
      path: '/leave-message',
      name: 'leave-message',
      component: () => import('../views/contact/leave-message.vue'),
      meta: {
        title: '在线留言', // 添加标题信息
        description: '在线留言', // 添加描述信息
      }
    },






  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 如果有保存的滚动位置，则直接滚动到该位置
      return savedPosition;
    } else {
      // 否则滚动到目标页面的顶部
      return { top: 0 };
    }
  }
})

export default router
