<template>
  <div class="col-sm-8 container">
    <table class="table">
    <thead class="thead-dark">
        <tr>
          <th >#</th>
          <th >Product</th>
          <th >Quantity</th>
          <th></th>
        </tr>
    </thead>
    <tbody v-if="stocks.length>0 && stocks !=null ">
        <tr v-for="(stock, index) in stocks">
          <td>{{  index+1 }}</td>
          <td>{{ stock.name }}</td>
          <td>{{stock.quantity}}</td>
          <td><nuxt-link to="/edit" class="btn btn-primary"  role="button">Edit</nuxt-link></td>
        </tr>
        
    </tbody>
    <div v-else class="d-flex justify-items-center">
      No stocks found
    </div>
  </table>
  </div>
  

      
</template>

<script lang="ts" setup>

const { pending, data: stocks } = useFetch('http://localhost:5000/stocks/list', {
  lazy: true
})

</script>