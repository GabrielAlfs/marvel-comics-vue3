import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ComicsView',
    redirect: '/quadrinhos',
    component: () => import('@/ui/pages/comics/ComicsView.vue'),
    children: [
      {
        path: '/quadrinhos',
        name: 'ComicsView',
        component: () => import('@/ui/pages/comics/ComicsView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
