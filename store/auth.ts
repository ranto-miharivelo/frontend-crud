import { defineStore } from 'pinia';
import nuxtStorage from 'nuxt-storage'

interface UserPayloadInterface {
  name: string,
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const { data, pending }: any = await useFetch('http://localhost:5000/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      this.loading = pending;
      console.log(data.value)
      if (data.value) {
        
        nuxtStorage.localStorage.setData('token', data?.value.token)
        
        this.authenticated = true; 
      }
    },
    logUserOut() {
      nuxtStorage.localStorage.removeItem('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
  // clear the token cookie
    },
    async registerUser({name, email, password}: UserPayloadInterface){
      const { data, pending }: any = await useFetch('http://localhost:5000/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          name,
          email,
          password,
        },
      });
      this.loading = pending;
      console.log(data.value)
      
      if (data.value) {
        
        nuxtStorage.localStorage.setData('token', data?.value.token)
       
        this.authenticated = true; 
      }
    }
  }
});