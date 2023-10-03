const modules = [
  {
    path: 'login-logs',
    name: 'LoginLogs',
    component: () => import('pages/admin/PageLoginLogs.vue'),
    meta: {
      icon: 'mdi-login-variant',
      title: 'Kirishlar loglari',
      description: 'modules.loginlogs_description'
    }
  },
  {
    path: 'sessions',
    name: 'Sessions',
    component: () => import('pages/admin/PageSessions.vue'),
    meta: {
      icon: 'mdi-account-group-outline',
      title: 'Foydalanuvchi sessiyalari',
      description: 'modules.sessions_description'
    }
  },
  {
    path: 'reource-types',
    name: 'PageResourceTypes',
    component: () => import('pages/admin/PageResourceTypes.vue'),
    meta: {
      icon: 'mdi-account-group-outline',
      title: 'Fayl turlari',
      description: 'modules.sessions_description'
    }
  }
]

const admin = {
  path: '/admin',
  name: 'admin',
  component: () => import('layouts/BaseLayout.vue'),
  meta: {
    title: 'Boshqarish',
    description: 'Boshqarish',
    icon: 'mdi-cog-transfer-outline',
  },
  children: modules
}

export default admin
