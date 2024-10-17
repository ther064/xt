import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Catogory from '@/views/Catogory/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Details/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/payBack.vue'
import Member from '@/views/Member/index.vue'
import User from '@/views/Member/compoments/UserInfo.vue'
import Order from '@/views/Member/compoments/UserOrder.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path:'/',
    component:Layout,
    children:[{
      path:'/',
      component:Home
      },
      {
      path:'category/:id',
      component:Catogory
      },
      {
        path:'category/sub/:id',
        component:SubCategory
      },
      {
        path:'detail/:id',
        component:Detail
      },
    ]
   },
   {
    path:'/login',
    component:Login
   },
   {
    path:'/cartlist',
    component:CartList
   },
   {
    path:'/checkout',
    component:CheckOut
   },
   {
    path:'/pay',
    component:Pay
   },
   {
    path:'/paycallback',
    component:PayBack
   },
   {
    path:'/member',
    component:Member,
    children:[
      {
        path:'',
        component:User
      },
      {
        path:'order',
        component:Order
      }
    ]
   },

  ],
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
