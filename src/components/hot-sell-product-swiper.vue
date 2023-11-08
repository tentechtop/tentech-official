<template>
  <div class="container">
   <div class="slide-container" ref="slideContainer" :style="{ transform: 'translateX(' + (scrollPosition) + 'px)' ,width:((productList.length*3*imgWidth)+((productList.length*3)-1)*16)+'px' }">
     <div v-for="(slideItem,SIndex) in productList" class="slide-item" :class="{itemHover:slideItem.isHover}"
          :style="{height:imgHeight+'px',width:imgWidth+'px'}"
     @mouseover="slideItem.isHover=true"
     @mouseleave="slideItem.isHover=false">
       <div class="slide-item-img-container">
         <img :src="slideItem.imgUrl">
       </div>
       <div class="product-intro-container">
         <p>{{slideItem.productName}}</p>
       </div>
     </div>

     <div v-for="(slideItem,SIndex) in productList" class="slide-item" :class="{itemHover:slideItem.isHover}"
          :style="{height:imgHeight,width:imgWidth}"
          @mouseover="slideItem.isHover=true"
          @mouseleave="slideItem.isHover=false">
       <div class="slide-item-img-container">
         <img :src="slideItem.imgUrl">
       </div>
       <div class="product-intro-container">
         <p>{{slideItem.productName}}</p>
       </div>
     </div>

     <div v-for="(slideItem,SIndex) in productList" class="slide-item" :class="{itemHover:slideItem.isHover}"
          :style="{height:imgHeight,width:imgWidth}"
          @mouseover="slideItem.isHover=true"
          @mouseleave="slideItem.isHover=false">
       <div class="slide-item-img-container">
         <img :src="slideItem.imgUrl">
       </div>
       <div class="product-intro-container">
         <p>{{slideItem.productName}}</p>
       </div>
     </div>
   </div>






    <div class="button-container">
      <div class="button" @click="scrollLeft" :class="{buttonHover:isHoverLeftButton}"
      @mouseover="isHoverLeftButton=true"
      @mouseleave="isHoverLeftButton=false">
        <img class="button1"  :src="isHoverLeftButton?'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/right-arrow-white.svg':'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/right-arrow-black.svg'  "  >
      </div>
      <div class="button" @click="scrollRight" :class="{buttonHover:isHoverRightButton}"
           @mouseover="isHoverRightButton=true"
           @mouseleave="isHoverRightButton=false">
        <img  :src="isHoverRightButton? 'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/right-arrow-white.svg':'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/right-arrow-black.svg'"  >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, onUpdated, ref, watch} from 'vue'
const scrollPosition = ref((388+16)*2);//初始距离
const slidingLength = ref(404)
const activeItem = ref(0); //初始元素索引
const slideContainer = ref(null)
const enableClick = ref(true)

const imgWidth = ref(388)
const imgHeight = ref(341)

const isHoverLeftButton = ref(false)
const isHoverRightButton = ref(false)
function scrollRight(){
  if (activeItem.value===productList.value.length - 1){
    enableClick.value=false
    slideContainer.value.style.transition = 'transform 0.7s'
    scrollPosition.value -= slidingLength.value;
    setTimeout(() => {
      slideContainer.value.style.transition = 'none'
      scrollPosition.value = slidingLength.value*2;
      enableClick.value=true
      activeItem.value = 0;
    }, 700)
  }else {
    if (enableClick.value){
      enableClick.value=false
      if (activeItem.value < productList.value.length - 1) {
        slideContainer.value.style.transition = 'transform 0.7s'
        scrollPosition.value -= slidingLength.value;
        setTimeout(() => {
          enableClick.value=true
          activeItem.value = activeItem.value + 1;
        },700)
      }else {
        scrollPosition.value -= slidingLength.value;
        setTimeout(() => {
          slideContainer.value.style.transition = 'none'
          scrollPosition.value = slidingLength.value*2;
          activeItem.value = 0;
          enableClick.value=true
        }, 700)
      }
    }
  }

}

function scrollLeft(){
  if (activeItem.value===0){
    enableClick.value=false
    slideContainer.value.style.transition = 'transform 0.7s'
    scrollPosition.value += slidingLength.value;
    setTimeout(() => {
      enableClick.value=true
      slideContainer.value.style.transition = 'none'
      scrollPosition.value = -slidingLength.value*5;
      activeItem.value = productList.value.length - 1;
    }, 700)

  }else {
    if (enableClick.value){
      enableClick.value=false
      if (activeItem.value >0) {
        slideContainer.value.style.transition = 'transform 0.7s'
        scrollPosition.value += slidingLength.value;
        setTimeout(() => {
          activeItem.value = activeItem.value - 1;
          enableClick.value=true
        },700)
      }else {
        scrollPosition.value += slidingLength.value;
        setTimeout(() => {
          slideContainer.value.style.transition = 'none'
          scrollPosition.value = -slidingLength.value*5;
          activeItem.value = productList.value.length - 1;
          enableClick.value=true
        }, 700)
      }
    }
  }
}


const productList = ref([])

const props = defineProps({
  productSwiperList: {
    type: Array,
    required: true,
    default: () => []
  }
});

function handleResize() {
/*  console.log("当前屏幕宽度",window.innerWidth)*/
  const width = window.innerWidth
  if (width<480){

  }else {
    imgHeight.value=341
    imgWidth.value=388
  }
}
watch(scrollPosition,(newVal)=>{
  console.log("scrollPosition",scrollPosition.value)
})



onMounted(()=>{
  handleResize();
  console.log("newVal",scrollPosition.value)


  window.addEventListener('resize', handleResize);
})

onBeforeMount(()=>{
  productList.value=props.productSwiperList
})
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.slide-container{
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.slide-item{
  z-index: 2;
  cursor: pointer;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
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

}
.itemHover .product-intro-container{
  background-color: #999999;
}
.itemHover .product-intro-container>p{
  color: white;
}
.button-container{
  z-index: 1;
  transform: translateY(170px);
  cursor: pointer;
  width: 100%;
  max-width: 1620px;
  height: 0px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}
.button{
  margin: 0 8px;
  width: 45px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2585E0;
}
.buttonHover{
  background-color: black;
}

.button1{
  transform: rotate(180deg);
}
.button>img{
  transition: opacity 0.1s ease;
  border-radius: 100px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-right: 10px;
}
.button>img:hover{

}

@media screen and (max-width: 1400px){

}

</style>