import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserView from '@/views/UserView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/user/create',
    name: 'create',
    component: UserView,
  },
  {
    path: '/user/change',
    name: 'change',
    component: UserView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
