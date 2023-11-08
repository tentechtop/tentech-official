<template>
  <div class="root-page">
    <div class="product-swiper">
<!--      -->
      <div v-for="(item,index) in productList" class="product-item"
           :style="{ opacity: activeIndex === index ? 1 : 0,display:activeIndex === index ? '':'none',transition: 'opacity 0.9s ease,display 0.3s ease'}"
      >
        <div class="desc-space">
          <h1>{{item.productTitle}}</h1>
          <p>{{item.desc}}</p>
          <div class="learn-more-button">
            <p>了解更多</p>
            <img src="@img/common/right-arrow-orange.svg">
          </div>
        </div>
        <div class="img-space">
          <img :src="item.productImgUrl">
        </div>
      </div>



    </div>

    <div class="button-space">
      <div class="dot-space">
        <div class="dot-content"
             :style="{height: (productList.length*30)+(productList.length-1)*5+'px'}"
        >
          <div v-for="(dot,dotIndex) in productList.length" class="dot"
               @click="goDotLocation(dotIndex)"
          >
            <div class="dot-button"
                 :style="{'background-color':dotIndex===activeIndex? '#F08000':'#E2E2E2'}"
            >
            </div>
            <div class="dot-title">
              <p>{{productList[dotIndex].productTitle}}</p>
            </div>
          </div>
        </div>

        <div class="dot-content1">
          <div v-for="(dot,dotIndex) in productList.length" class="dot1"

               :style="{'background-color':dotIndex===activeIndex? '#F08000':'#E2E2E2'}"
               @click="goDotLocation(dotIndex)"
          >
          </div>
        </div>
      </div>

    </div>



  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUpdated, ref, watch} from "vue";

const activeIndex = ref(0);
const scroll = ref(0);//初始距离
const scrollPosition = ref(0);//初始距离

const productList = ref([])
const dragStartX = ref(0);
const dragOffset = ref(0);
const dragging = ref(false);
function goDotLocation(dotIndex){
  if (dotIndex-activeIndex.value>0){
    scrollPosition.value -= (scroll.value)*(dotIndex-activeIndex.value);
    activeIndex.value=dotIndex
  }else {
    scrollPosition.value += (scroll.value)*(activeIndex.value-dotIndex);
    activeIndex.value=dotIndex
  }
}
const startDrag = (event: MouseEvent) => {
  dragging.value = true;
  dragStartX.value = event.clientX;
};
const drag = (event: MouseEvent) => {
  if (dragging.value) {
    dragOffset.value = event.clientX - dragStartX.value;
    if (dragOffset.value < 0) {
      scrollRight();
      endDrag();
    } else if (dragOffset.value > 0) {
      scrollLeft();
      endDrag();
    }
  }
};
const endDrag = () => {
  dragging.value = false;

};

const scrollRight = () => {
  if (activeIndex.value < productList.value.length - 1) {
    scrollPosition.value -=  scroll.value;
    activeIndex.value = activeIndex.value + 1;

  } else {
    scrollPosition.value =  scroll.value;
    activeIndex.value = 0;
  }
};

const scrollLeft = () => {
  if (activeIndex.value > 0) {
    scrollPosition.value +=  scroll.value;
    activeIndex.value = activeIndex.value - 1;
  } else {
    scrollPosition.value -= scroll.value
  }
};

const props = defineProps({
  propsProductList: {
    type:Array,
    required: true,
    default: () => []
  },
  activeSeries:{
    type:Number,
    required:true,
    default: 0
  }
});

onMounted(()=>{
  productList.value=props.propsProductList
})



watch(productList,()=>{
 activeIndex.value=0
})





onUpdated(()=>{
  productList.value=props.propsProductList
})
</script>

<style scoped>
.root-page{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.product-swiper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: transform 0.6s ease; /* 添加过渡效果 */
}
.product-item{
  transition: opacity 0.3s ease,display 0.0s ease;
  cursor: pointer;
  height: 100%;
  width: 100%;
  background-color: #EDEEF0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.desc-space{
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.img-space{
  width: 40%;
  height: 100%;
  overflow: hidden;
}
.img-space>img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.learn-more-button{
  margin-top: 20px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border-radius: 50px;
  width: 115px;
  height: 35px;
  border: 1px solid #F08000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.learn-more-button:hover{
  /*  background-color: #F08000;*/
}

.learn-more-button>p{
  font-size: 12px;
  color: #F08000;
}
.learn-more-button>img{
  width: 12px;

}
.desc-space{
  padding: 30px;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255,255,255);
  border-top-left-radius: 5px; /* 设置右上角圆角 */
  border-bottom-left-radius: 5px; /* 设置右下角圆角 */
}
.desc-space>h1{
  transition: color 0.2s ease;
  cursor: pointer;
  opacity: 0.75;
  color: #212121;
  font-size: 27px;
  margin-bottom: 25px;
}
.desc-space>h1:hover{
  opacity: 1;
  color: #F08000;
}
.desc-space>p{

  font-size: 15px;
  color: rgba(0,0,0,0.65);

}
.button-space{
  padding-left: 50px;
  cursor: pointer;
  width: 1200px;
  height: 400px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.dot-space{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dot-content{
  width:255px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.dot{
  margin-right: 3px;
  margin-left: 3px;
  width: 255px;
  height: 30px;
  border-radius: 5px;
  transition: background-color 0.0s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.dot-title{
  width: 245px;
  padding-left: 10px;
}
.dot-title>p{
  font-size: 14px;
  color: rgba(0,0,0,0.75);
}
.dot-button{
  margin-right: 3px;
  margin-left: 3px;
  width: 10px;
  height: 30px;
  border-radius: 5px;
  transition: background-color 0.0s ease;
}

.dot-content1{
  display: none;
}
.dot1{
  margin-right: 3px;
  margin-left: 3px;
  width: 55px;
  height: 10px;
  border-radius: 5px;
  transition: background-color 0.0s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #212121;
}
@media screen and (max-width: 1200px) {
  .product-item{
    cursor: pointer;
    height: 100%;
    width: 100%;
    background-color: #EDEEF0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .desc-space{
    width: 94%;
  }
  .img-space{
    width: 94%;
  }
  .button-space{
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dot-content{
    display: none;
  }
  .dot-content1{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

}


</style>