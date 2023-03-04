<script>

export default {
  data() {
    return {
      imgLoading: null,
      allData: null,
      data: null,
      index: 1,
    };
  },
  methods: {
    async fetchData() {  
      const responseAllData = await fetch ("https://fakestoreapi.com/products/")    
      const response = await fetch(`https://fakestoreapi.com/products/${this.index}`);      
      this.data = await response.json();
      this.allData = await responseAllData.json()
      this.imgLoading = this.data.image
    },  

    onClickHandler() {
      this.data = null
      this.imgLoading = null
      if (this.index >= this.allData.length) {
        this.index = 1;
      } else {
        this.index++;
      }
      this.fetchData()
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    index(newValue, oldValue) {
      console.log(`index changed from ${oldValue} to ${newValue}`);
    }
  }
};
</script>

<template>
    <div v-if="!data && !imgLoading">Loading...</div>
    <div v-else class="container-wrapper">
       <div class="img-cover">
        <img v-if="data" class="img-content" :src="data.image" alt="Product image">
       </div>
       <div class="container-detail">
        <h1 v-if="data" class="title-female">{{ data.title }}</h1>
        <div class="categorise">
        <h5 v-if="data" class="item-tag">{{ data.category }}</h5>
        <h5 v-if="data" class="item-rate">{{data.rating.rate}}</h5>
       </div>

       <div class="description">
        <p v-if="data" class="decript-tag">{{ data.description }}</p>
       </div>

       <div class="bottom-detail">
        <h1 v-if="data" class="title-female">$ {{data.price}}</h1>
       </div>

       <div class="button-styel">
        <button class="btn-buy" type="submit">Buy Now</button>
        <button class="btn-next" type="submit" @click="onClickHandler();" >Next Product</button>
       </div>
       </div>
       

    </div>
</template>

<style>

</style>