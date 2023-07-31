<template>
    <div class="col-sm-8">
        <div class="form-outline form-white mb-3 col-sm-6">
            <label class="form-label" for="email">Name</label>
            <input type="email" id="text" class="form-control" 
                v-model="product.name"
                placeholder="Name of product"
                name="name"
                required />
                
        </div>
        <div class="form-outline form-white mb-3 col-sm-6">
            <label class="form-label" for="number">Quantity</label>
            <input type="email" id="email" class="form-control" 
                v-model="product.name"
                placeholder="Number of product"
                name="quantity"
                required />
                
        </div>
        <div class="d-flex justify-content-around col-sm-6">
            
                <button type="button" class="btn btn-outline-danger">Danger</button>
            
            
                <button type="button" class="btn btn-primary">Save</button>
            
        </div>
    </div>    

</template>

<script lang="ts" setup>
    const product = ref({
        name: '',
        quantity : 0
    })
</script>