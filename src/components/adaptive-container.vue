<template>
  <div class="container">
    <div class="adaptive-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
import {useI18n} from "vue-i18n";
const { t,locale } = useI18n();

function goToSelectSeries(product,PIndex){

}

function goToExpandSubmenu(product){
  const temp = product.isSelected
  /*    this.productList.forEach((menu)=>{
        menu.isSelected=false
      })*/
  product.isSelected=!temp
}

const productList = ref([])

onMounted(()=>{

})
</script>

<style scoped>
.container{
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.adaptive-container{
  transition: all 0.3s ease;
  width: 100%;
  max-width: 1600px;
}


@media screen and (max-width: 1800px){
  .adaptive-container{
    max-width: calc(100% - 120px)
  }
}

@media screen and (max-width: 1260px){
  .adaptive-container{
    max-width: calc(100% - 80px)
  }
}

@media screen and (max-width: 1024px){
  .adaptive-container{
    max-width: calc(100% - 60px)
  }
}

@media screen and (max-width: 1024px){
  .adaptive-container{
    max-width: calc(100% - 50px)
  }
}

@media screen and (max-width: 900px){
  .adaptive-container{
    max-width: calc(100% - 50px)
  }
}

@media screen and (max-width: 767px){
  .adaptive-container{
    max-width: calc(100% - 32px)
  }
}
</style>