const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageGuests.vue') },
      { path: 'guests', component: () => import('pages/PageGuests.vue') },
      { path: 'orders', component: () => import('pages/PageOrders.vue') },
      { path: 'bill', component: () => import('pages/PageBill.vue') },
      { path: 'settings', component: () => import('pages/PageSettings.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
