import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    messageInfo:[],
    redirect: '/goods',
    children:[{
      path:'/goods',//商品界面
      name:'goods',
      component:()=>import('../views/Goods.vue')
    },
    {
      path:'/evalute',//评价页面
      name:'evalute',
      component:()=>import('../views/Evaluate.vue')
    },
    {
      path:'/merchant',//商家界面
      name:'merchant',
      component:()=>import('../views/Merchant.vue')
    }
  ]
  }
]

const router = new VueRouter({
  routes
})

export default router
