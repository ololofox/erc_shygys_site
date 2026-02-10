const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),    
    children: [
      { name: 'main', path: '', component: () => import('pages/MainPage.vue'), meta: { section: 'main' }},      
      { name: 'feedback', path: 'feedback', component: () => import('pages/FeedBack.vue'), meta: { section: 'feedback' }},      
      { name: 'autor', path: 'autor', component: () => import('pages/AutorLK.vue'), meta: { section: 'autor' }},      
      { name: 'reg', path: 'reg', component: () => import('pages/RegPage.vue'), meta: { section: 'autor' }},        
      { name: 'recover', path: 'recover', component: () => import('pages/PasswordRecover.vue'), meta: { section: 'autor' }},    
    ]
  },  
]

export default routes
