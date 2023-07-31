<template>
    <div class="container py-3">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body py-3 px-5 text-center">

            <div class="mb-md-3 mt-md-3 pb-3">

              <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
              <p class="text-white-50 mb-4">Please fill the credentials
              </p>

              <div class="form-outline form-white mb-3">
                <input type="name" id="name" class="form-control" 
                    v-model="user.name"
                    placeholder="Enter name"
                    name="uname"
                    required />
                <label class="form-label" for="name">Name</label>
              </div>

              <div class="form-outline form-white mb-3">
                <input type="email" id="email" class="form-control" 
                    v-model="user.email"
                    placeholder="Enter email"
                    name="uname"
                    required />
                <label class="form-label" for="email">Email</label>
              </div>

              <div class="form-outline form-white mb-3">
                <input type="password" id="password" class="form-control" 
                      v-model="user.password"
                      placeholder="Enter password"
                      name="password"
                      required/>
                <label class="form-label" for="password">Password</label>
              </div>

              
              <button class="btn btn-outline-light btn-lg px-3" type="submit" @click.prevent="register">Register</button>

            
            </div>

            <div>
              <p class="mb-0">Already have an account? <nuxt-link to="/login" class="text-white-50 fw-bold">Sign in</nuxt-link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
   
  </template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { registerUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
name:'',
  email: '', 
  password: '',
});
const router = useRouter();

const register = async () => {
  await registerUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
};
</script>store/auth