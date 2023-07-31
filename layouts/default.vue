<template>
    <div>
     <Header></Header>
      <div class="mainContent">
        <slot />
      </div>
      <Footer></Footer>
    </div>
  </template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '../store/auth'; // import the auth store we just created

const router = useRouter();

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
if(!authenticated){
  router.push('/')
}

</script>../store/auth.global../store/auth