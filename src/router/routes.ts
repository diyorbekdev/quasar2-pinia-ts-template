import { RouteRecordRaw } from 'vue-router';
import routes_home from "./main_categories/routes_home";
import admin from "./main_categories/routes_settings";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/HomePage.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  admin,
  routes_home
];

export default routes;
