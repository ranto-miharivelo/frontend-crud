<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../store/auth";
import nuxtStorage from 'nuxt-storage'


const { authenticated } = storeToRefs(useAuthStore()); 
const token = nuxtStorage.localStorage.getData('token');
// adding token to header
const reqHeaders = {
    Authorization: authenticated ? `Bearer ${token}` : '',
}
const route = useRoute();
const id = route.params?.id;
const product = ref({
    name: '',
    quantity : 0
})

async function getStockById(id :string){
    const {pending, data: stock,error}: any = await useFetch("http://localhost:5000/stocks/"+id,{
        method: 'get',
       
    })

    if(error){
        console.log(error.value);
        // Might be interesting as well:

    }
    console.log(stock.value.name)
    product.value.name = stock.value.name
    product.value.quantity = stock.value.quantity
}

if(id!= "new"){
    await getStockById(id)
   
}
console.log(product)
/// Page title based on edit or create
const pageTitle = ref('')
pageTitle.value = id == "new"? "Create":"Edit"
// upsertStock
async function upsertStock (){
    let reqBody: any =""
    if(id== "new"){
        reqBody = {
            name: product.value.name,
            quantity: product.value.quantity
        }
    }
    else{
        reqBody = {
            id: id,
            name: product.value.name,
            quantity: product.value.quantity
        }
    }
    const {pending, data: result}: any = await useFetch("http://localhost:5000/stocks/upsert",{
        method: 'post',
        headers: reqHeaders,
        body:reqBody
       
    })
    return navigateTo('/')

}
// deleteStock
async function deleteStock(){
    const {pending, data: result}: any = await useFetch("http://localhost:5000/stocks/delete",{
        method: 'post',
        headers: reqHeaders,
        body:{
            id: id,
            name: product.value.name,
            quantity: product.value.quantity
        }
       
    })
    return navigateTo('/')
}
// Cancelling edit
function cancelEdit(){
    return navigateTo('/')
}


</script>
<template>
    <div class="col-sm-6 container d-flex justify-content-center flex-column align-items-center">
        <div class="container d-flex justify-content-center flex-column align-items-center">
            <h2>{{ pageTitle }} Stock</h2>
        </div>
       
        <div class="form-outline form-white mb-3 col-sm-6  d-flex justify-content-center flex-column">
            <label class="form-label" for="name">Name</label>
            <input type="text" id="name" class="form-control" 
                v-model="product.name"
                placeholder="Name of product"
                name="name"
                required />
                
        </div>
        <div class="form-outline form-white mb-3 col-sm-6  d-flex justify-content-center flex-column">
            <label class="form-label" for="quantity">Quantity</label>
            <input type="number" id="quantity" class="form-control" 
                v-model="product.quantity"
                placeholder="Quantity of product"
                name="quantity"
                required />
                
        </div>
        <div class="d-flex justify-content-around col-sm-6  d-flex justify-content-between align-items-center">
            
                <button type="button" class="btn btn-outline-danger" @click="cancelEdit()">Cancel</button>
            
            
                <button type="button" class="btn btn-primary" @click.prevent="upsertStock()">Save</button>
                <button v-if="id!='new' " type="button" class="btn btn-danger" @click="deleteStock()">Delete</button>
            
        </div>
    </div>    

</template>

