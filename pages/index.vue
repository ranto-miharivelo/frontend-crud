
<script lang="ts" setup>

const { pending, data: stocks,error }:any = useFetch('http://localhost:5000/stocks/list', {
  method:'get'
})

if(error){
        console.log(error.value.data);
        // Might be interesting as well:
        console.log(error.value.name, error.value.message);
    }

</script>
<template>
  <div class="col-sm-8 container">
    <div class="col-sm 4 container">
      <nuxt-link to="/stocks/new"><i class="bi bi-plus"></i>
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
  

      
