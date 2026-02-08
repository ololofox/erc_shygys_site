const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),    
    children: [
      { name: 'main', path: '/', component: () => import('pages/MainPage.vue')},      
      { name: 'feedback', path: '/feedback', component: () => import('pages/FeedBack.vue')},      
      { name: 'autor', path: '/autor', component: () => import('pages/AutorLK.vue')},      
      { name: 'reg', path: '/reg', component: () => import('pages/RegPage.vue')},        
      { name: 'recover', path: '/recover', component: () => import('pages/PasswordRecover.vue')},    
    ]
  },  
]

export default routes
