import { defineStore } from 'pinia';
import nuxtStorage from 'nuxt-storage'
import { useToast } from "vue-toastification"

interface UserPayloadInterface {
  name: string,
  email: string;
  password: string;
}

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const { data, pending,error }: any = await useFetch('http://localhost:5000/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      if(error.value){
        toast.error(error?.value?.data,{timeout:2000})
        console.log(error?.value?.data);
        
      }
      this.loading = pending;
      if (data.value) {
        // localStorage.setItem('token', data?.value.token)
        toast.success("Login successful",{timeout:1000})
        nuxtStorage.localStorage.setData('token', data?.value.token)
        
        this.authenticated = true; 
      }
    },
    logUserOut() {
      nuxtStorage.localStorage.removeItem('token'); 
      this.authenticated = false; // set authenticated  state value to false
  // clear the token cookie
    },
    async registerUser({name, email, password}: UserPayloadInterface){
      const { data, pending,error }: any = await useFetch('http://localhost:5000/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          name,
          email,
          password,
        },
      });
      if(error.value){
        toast.error(error?.value?.data,{timeout:2000})
        console.log(error?.value?.data);
      }
      this.loading = pending;
    
      
      if (data.value) {
        // localStorage.setItem('token', data?.value.token)
        toast.success("Register successful",{timeout:1000})
        nuxtStorage.localStorage.setData('token', data?.value.token)
       
        this.authenticated = true; 
      }
    }
  }
});