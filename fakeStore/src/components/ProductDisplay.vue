<script>
export default {
  data() {
    return {
      imgLoading: null,
      allData: null,
      data: null,
      index: 1,
      active: false,
      categorise: null
    };
  },
  methods: {
    async fetchData() {  
      const responseAllData = await fetch ("https://fakestoreapi.com/products/")    
      const response = await fetch(`https://fakestoreapi.com/products/${this.index}`);      
      this.data = await response.json();
      this.allData = await responseAllData.json()
      this.imgLoading = this.data.image
      this.bgHandler()
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

    bgHandler() {
      if ( this.data != null && this.data.category === "men's clothing"){
      this.active = true;
      this.categorise = "men's clothing"
      document.body.setAttribute("class", "bg-color-male")
    } else if (this.data.category === "women's clothing") {
      this.active = false
      this.categorise = "women's clothing"
      document.body.setAttribute("class", "bg-color-female")
    } else if (this.data.category === "jewelery" || this.data.category === "electronics" ){
      //index jump
      let found = false;
      for (let i = this.index + 1; i < this.allData.length; i++) {
        if (this.allData[i].category === "men's clothing" || this.allData[i].category === "women's clothing") {
          this.index = i;
          found = true;
          break;
        }
      }

      if (!found) {
        for (let i = 0; i < this.index; i++) {
          if (this.allData[i].category === "men's clothing" || this.allData[i].category === "women's clothing") {
            this.index = i;
            break;
          }
        }
      }
      this.onClickHandler()
    }
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
    <div v-if="!data && !imgLoading" class="loader"></div>
    <div v-else class="container-wrapper">
       <div class="img-cover">
        <img v-if="data" class="img-content" :src="data.image" alt="Product image">
       </div>
       <div class="container-detail">
        <h1 v-if="data" :class= "active ? 'title-male' :  'title-female'" >{{ data.title }}</h1>
        <div class="categorise">
        <h5 v-if="data" class="item-tag">{{ data.category }}</h5>
        <h5 v-if="data" class="item-rate">{{data.rating.rate}}/5</h5>
       </div>

       <div class="description">
        <p v-if="data" class="decript-tag">{{ data.description }}</p>
       </div>

       <div class="bottom-detail">
        <h1 v-if="data" :class= "active ? 'title-male' :  'title-female'">$ {{data.price}}</h1>
       </div>

       <div class="button-styel">
        <button class="btn-buy" type="submit" :style="{background: active ? '#002772' : '#720060'}">Buy Now</button>
        <button class="btn-next" type="submit" :style="{border: active ? '3px solid #002772' : '3px solid #720060', color: active ? '#002772' : '#720060'}" @click="onClickHandler();" 
        >Next Product</button>
       </div>
       </div>
       

    </div>
</template>

<style>
.loader {
  border: 10px solid #f3f3f3;
  border-top: 10px solid gray;
  border-bottom: 10px solid gray;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-img{
  width: 120px;
  height: 120px;
  mix-blend-mode: multiply;
}
</style>