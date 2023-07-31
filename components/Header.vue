<template>
    <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-3 border-bottom">
        <nuxt-link to="/" class="d-flex text-dark text-decoration-none">
          <h1>Stock management</h1>
        </nuxt-link>


        <div v-if="authenticated== true" class="col-md-3 text-end">
            <button type="button" class="btn btn-outline-primary me-2" @click.prevent="logout">Logout</button>
            
        </div>
        </header>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'; 
import { useAuthStore } from '~/store/auth'; 
const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore());

const logout = () => {
  logUserOut();
  router.push('/login');
};


</script>