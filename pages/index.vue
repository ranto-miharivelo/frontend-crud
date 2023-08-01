
<script lang="ts" setup>

const { pending, data: stocks,error }:any = useFetch('http://localhost:5000/stocks/list', {
  method:'get'
})
console.log(process.env.API_URL)

if(error){
    console.log(error.value);
    // Might be interesting as well:
}

</script>
<template>
  <div class="col-sm-6 container">
    <div class="col-sm-4 container d-flex justify-content-center mb-3">
        <h2>Stock list</h2>
    </div>
    <div class="col-sm 4 container d-flex justify-content-center mb-3">
      <nuxt-link to="/stocks/new" class="link-primary link-opacity-25-hover">
            Add stock</nuxt-link>
            
    </div>
    <table class="table">
    <thead class="thead-dark">
        <tr>
          <th >#</th>
          <th >Product</th>
          <th >Quantity</th>
          <th></th>
        </tr>
    </thead>
    <template v-if="stocks!=null">
      <tbody v-if="stocks?.length>0">
          <tr v-for="(stock, index) in stocks">
            <td>{{  index+1 }}</td>
            <td>{{ stock.name }}</td>
            <td>{{stock.quantity}}</td>
            <td><nuxt-link :to="`/stocks/${stock.id}`" class="btn btn-primary"  role="button">Edit</nuxt-link></td>
          </tr>
          
      </tbody>
    </template>
     
    <div v-else class="d-flex justify-items-center">
      No stocks found
    </div>
  </table>
  </div>
  </template>
  

      
