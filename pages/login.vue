<template>
  <div class="container col-sm-8 p-3">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body py-3 px-5 text-center">

            <div class="mb-md-5 mt-md-4">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-4">Please enter your login and password!</p>

              <div class="form-outline form-white mb-4">
                <label class="form-label" for="email">Email</label>
                <input type="email" id="email" class="form-control" 
                    v-model="user.email"
                    placeholder="Enter email"
                    name="email"
                    required />
               
              </div>

              <div class="form-outline form-white mb-4">
                <label class="form-label" for="password">Password</label>
                <input type="password" id="password" class="form-control" 
                      v-model="user.password"
                      placeholder="Enter password"
                      name="password"
                      required/>
               
              </div>

              <!-- <p class="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> -->

              <button class="btn btn-outline-light btn-lg px-5" type="submit" @click="login">Login</button>

            
            </div>

            <div>
              <p class="mb-0">Don't have an account? <nuxt-link to="/register" class="text-white-50 fw-bold">Sign Up</nuxt-link>
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


const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  name:'',
  email: '', 
  password: '',
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value); 
  if (authenticated) {
    router.push('/');
  }
};
</script>store/auth