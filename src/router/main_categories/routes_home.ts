const routes_home = {
  path: '/',
  name: 'Home',
  component: () => import('layouts/BaseLayout.vue'),
  meta: {
    title: 'Asosiy sahifa',
    description: 'Asosiy sahifa',
    icon: 'mdi-cog-transfer-outline',
    is_q_item: 1,
    is_main: 1,
    is_dashboard: 1
  }
}

export default routes_home
