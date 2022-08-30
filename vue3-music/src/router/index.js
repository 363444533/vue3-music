import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view'

const routes = [
  {
    path: '/',
    name: 'root',
    component: HomeView,
    redirect: "/m/recommend"
  },
  {
    path: '/m',
    name: 'home',
    component: HomeView,
    redirect: "/m/recommend",
    children:[
      {
        path: "recommend",
        name: "recommend",
        component:()=>import("@/views/home-view/components/Recommend.vue")
      },
      {
        path: "raking",
        name: "raking",
        component:()=>import("@/views/home-view/components/Raking.vue")
      },
      {
        path: "singer",
        name: "singer",
        component:()=>import("@/views/home-view/components/Singer.vue")
      },
      {
        path: "search",
        name: "search",
        component:()=>import("@/views/home-view/components/Search.vue")
      },
    ]
  },
  {
    path: '/m/playList/:id',
    name: 'playList',
    component: () => import ("@/views/PlayList.vue")
  },
  {
    path: '/m/SingerDetail/:id',
    name: 'SingerDetail',
    component: () => import ("@/views/SingerDetail.vue")
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
