<script>

export default {
    data() {
      return {
        data: null,
      };
    },
    methods: {
      async fetchData() {      
        const response = await fetch("https://fakestoreapi.com/products/");      
        this.data = await response.json();
      },    
    },
    mounted() {
      this.fetchData();
    },
  };

</script>



<template>
    <div class="container-wrapper">
       <div class="img-cover">
        <img v-if="data" class="img-content" :src="data[0].image" alt="Product image">
       </div>
       <div class="container-detail">
        <div v-if="!data">Loading</div>
        <h1 v-else class="title-female">{{ data[0].title }}</h1>
        <div class="categorise">
        <h5 v-if="data" class="item-tag">{{ data[0].category }}</h5>
       </div>

       <div class="description">
        <p v-if="data" class="decript-tag">{{ data[0].description }}</p>
       </div>

       <div class="bottom-detail">
        <h1 v-if="data" class="title-female">${{data[0].price}}</h1>
       </div>

       <div class="button-styel">
        <button class="btn-buy" type="submit">Buy Now</button>
        <button class="btn-next" type="submit" >Next Product</button>
       </div>
       </div>
       

    </div>
</template>

<style>

</style>