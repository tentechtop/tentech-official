<template>
  <div class="container">
    <div class="slide-container">

      <router-link :to="slideItem.path" v-for="(slideItem,SIndex) in productList" class="slide-item"
                   :class="{itemHover:slideItem.isHover}"
                   @mouseover="slideItem.isHover=true"
                   @mouseleave="slideItem.isHover=false">
        <div class="slide-item-img-container">
          <img :src="slideItem.imgUrl">
        </div>
        <div class="product-intro-container">
          <p>{{t(slideItem.productName)}}</p>
        </div>
      </router-link>



    </div>
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
const { t,locale } = useI18n();
import {onBeforeMount, onMounted, onUpdated, ref, watch,defineProps} from 'vue'


const productList = ref([])
const props = defineProps({
  productSwiperList: {
    type: Array,
    required: true,
    default: () => []
  }
});
productList.value=props.productSwiperList
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.slide-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.slide-item{
  width: calc(33.33% - 16px);
  border-radius: 10px;
  min-height: 200px;
  z-index: 2;
  cursor: pointer;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}
.tem-last-child{
  margin-right: 0px;
}

.slide-item-img-container{
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.slide-item-img-container>img{
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.itemHover .slide-item-img-container>img{
  transform: scale(1.1);
}
.product-intro-container{
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.product-intro-container>p{
  text-align: center;
}
.itemHover .product-intro-container{
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #999999;
}
.itemHover .product-intro-container>p{
  color: white;
}

@media screen  and (max-width: 767px){
  .slide-item{
    width: calc(50% - 16px);
  }
}
@media screen  and (max-width: 480px){
  .slide-item{
    width: 100%;
  }
}
</style>