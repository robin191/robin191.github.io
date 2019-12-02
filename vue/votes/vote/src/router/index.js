import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '/login',
    component: Login,
  },
  {
    path: '/register',
    name: '/register',
    component: () => import('../views/register.vue'),
  },
  {
    path: '/choose',
    name: 'choose',
    component: () => import('../views/choose.vue'),
  },
  {
    path: '/single',
    name: 'single',
    component: () => import('../views/single.vue'),
  },
  {
    path: '/Multipleselection',
    name: 'Multipleselection',
    component: () => import('../views/Multipleselection.vue'),
  },

  {
    path: '/votes/:id',
    name: 'votes',
    component: () => import('../views/votes.vue'),
  },

];

const router = new VueRouter({
  routes,
});

export default router;
