import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth";
import nuxtStorage from 'nuxt-storage'


export default defineNuxtRouteMiddleware((to) => {
    const { authenticated } = storeToRefs(useAuthStore()); 
    const token = nuxtStorage.localStorage.getData('token');
  
    if (token != null) {
      // check if value exists
      authenticated.value = true; // update the state to authenticated
    }

    if (token != null && !authenticated.value){
        
    }

    // if token exists and url is /login redirect to homepage
    if (token != null && to?.name === 'login') {
      return navigateTo('/');
    }

  
    // if token doesn't exist redirect to log in
    if (token == null && to?.name !== 'login' && to?.name !== 'register') {
      abortNavigation();
      return navigateTo('/login');
    }

   
  });