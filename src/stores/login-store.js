

import { defineStore } from "pinia";

export const useLoginStore = defineStore("auth", {
  state: () => ({
    session: {
    email: '',
    userType: '',
    password: '',
    isLogin: false
      
    },
  }),
  getters: {},

  actions: {
    setLoginSession(data) {
      this.session.isLogin = true;
      this.session.email = data.email;
      this.session.userType = data.user_type;
    },
    destroyLoginSession() {
      this.session.isLogin = false;
      this.session.email = "";
      this.session.userType = "";

    },
  },
  strict: process.env.DEBUGGING,
});