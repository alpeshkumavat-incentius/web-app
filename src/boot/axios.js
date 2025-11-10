// import { defineBoot } from '#q-app/wrappers'
// import axios from 'axios'

// // Be careful when using SSR for cross-request state pollution
// // due to creating a Singleton instance here;
// // If any client changes this (global) instance, it might be a
// // good idea to move this instance creation inside of the
// // "export default () => {}" function below (which runs individually
// // for each client)
// const api = axios.create({ baseURL: 'http://127.0.0.1:5000' })

// export default defineBoot(({ app }) => {
//   // for use inside Vue files (Options API) through this.$axios and this.$api

//   app.config.globalProperties.$axios = axios
//   // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
//   //       so you won't necessarily have to import axios in each vue file

//   app.config.globalProperties.$api = api
//   // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
//   //       so you can easily perform requests against your app's API
// })

// export { api }










import { boot } from "quasar/wrappers";
import axios from "axios";
import { Cookies } from "quasar";
import { Loading } from "quasar";

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Loading.hide();
      // store.dispatch("destroyLoginSession");
      // router.replace("/login");
      return new Promise(() => {});
    } else {
      return Promise.reject(error);
    }
  }
);

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.delete["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use((request) => {
  request.headers["X-CSRFToken"] = Cookies.get("_csrf_token");
  return request;
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axiosInstance;

  app.config.globalProperties.$api = axiosInstance;

})

export { axiosInstance }
