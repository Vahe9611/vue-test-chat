import Vue from 'vue';
import VueRouter from 'vue-router';
import Thread from '../views/Thread.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:id',
    name: 'thread',
    component: Thread,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
