import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/get-item',
    name: 'DynamoGetItem',
    component: () => import(/* webpackChunkName: "about" */ '../views/dynamo/GetItem.vue'),
  },
  {
    path: '/query',
    name: 'DynamoQuery',
    component: () => import(/* webpackChunkName: "about" */ '../views/dynamo/Query.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
