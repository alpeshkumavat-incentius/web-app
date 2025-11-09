import axios from 'axios'

export default ({ router }) => {
  const publicPages = ['/register', '/login']

  const checkSession = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/check-session', { withCredentials: true })
      return res.data
    } catch (err) {
      console.error('Session check failed:', err)
      return { ok: false }
    }
  }

  // Initial page load
  router.isReady().then(async () => {
    const currPath = router.currentRoute.value.fullPath
    const session = await checkSession()

    if (session.ok) {
      if (currPath === '/login' || currPath === '/register') {
        if (session.userType === 'Admin') router.push('/admin')
        else if (session.userType === 'Teacher') router.push('/teacher')
        else if (session.userType === 'Student') router.push('/student')
      }
    } else {
      if (!publicPages.includes(currPath)) router.push('/login')
    }
  })
}

// import { authStore } from 'src/stores/auth-store.js'
// import { axiosInstance } from './axios.js'

// export const sessionGuard = (to, from, next) => {
//   const store = authStore()
//   let publicPages = ['/login', '/register']
//   if (publicPages.includes(to.path)) {
//     if (to.path == '/register') {
//       next()
//     } else {
//       axiosInstance.get('/check-session/', { withCredentials: true }).then((response) => {
//         if (response.data.ok) {
//           store.setLoginSession(response.data.data)
//           next('/')
//         } else {
//           next()
//         }
//       })
//     }
//   } else {
//     axiosInstance.get('/check-session', { withCredentials: true }).then((response) => {
//       if (response.data.ok) {
//         store.setLoginSession(response.data.data)
//         next()
//       } else {
//         next('/login')
//       }
//     })
//   }
// }
