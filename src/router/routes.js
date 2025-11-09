
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'register' },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/admin', component: () => import('pages/AdminPage.vue'),
        children:[
         { path :'/manage-course', component:() => import('pages/admin-page/ManageCourse.vue')},
         { path :'/manage-teacher', component:() => import('pages/admin-page/ManageTeacher.vue')},
         { path :'/manage-student', component:() => import('pages/admin-page/ManageStudent.vue')}
        ]
       },
      { path: '/teacher', component: () => import('pages/TeacherPage.vue') },
      { path: '/student', component: () => import('pages/StudentPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
