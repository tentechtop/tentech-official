<template>
  <div class="my-container">
    <div v-if="isExpandDrawerNav" class="open-windows" >
      <div class="windows-bg" @click="openOrCloseDialog"></div>
      <div class="product-img-container-windows">
        <t-image fit="contain" class="product-img-container-windows-img" :src="props.resourceList[index].ResourcesUrl"></t-image>
        <div class="switch-button-container">
          <div class="switch-button left-d" @click="scrollLeft">
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/switch-arrow-icon.svg">
          </div>
          <div class="switch-button right-d" @click="scrollRight">
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/switch-arrow-icon.svg">
          </div>
        </div>
      </div>

      <div class="switch-container-windows-d">
        <div class="list-container-d" :style="{width:((props.resourceList.length*80)+((props.resourceList.length-1)*12)+'px')}">
          <div v-for="(r,rindex) in props.resourceList" class="item-d" :class="{currentItem:rindex===index}" @click="goDotLocation(rindex)">
            <img v-if="r.type==='img'" :src="r.ResourcesUrl">
            <video v-if="r.type==='video'" :src="r.ResourcesUrl"></video>
          </div>
        </div>
      </div>

    </div>


    <div class="img-display-container">
      <t-image style="cursor: pointer" fit="cover" :src="props.resourceList[index].ResourcesUrl" class="current-img"
               @click="openOrCloseDialog">
      </t-image>
    </div>



    <div class="button-display-container">
      <div class="button left" @click="scrollLeft">
        <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/right-arrow-icon.svg">
      </div>

      <div class="swiper-container">
        <div class="list-container" >
          <div v-for="(r,rindex) in props.resourceList" class="select-swiper-item"
               :class="{currentItem:rindex===index}" @click="goDotLocation(rindex)">
            <img v-if="r.type==='img'" :src="r.ResourcesUrl">
            <video v-if="r.type==='video'" :src="r.ResourcesUrl"></video>
          </div>
        </div>
      </div>


      <div class="button right" @click="scrollRight">
        <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/right-arrow-icon.svg">
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, onBeforeUnmount, onMounted, ref} from 'vue'
import TImage from "../../components/tentech/t-image.vue";

const index = ref(0)
const scrollPosition = ref(6);//初始距离
const dragStartX = ref(0);
const dragOffset = ref(0);
const dragging = ref(false);
const lastPosition = ref(0)


function goDotLocation(rindex){
  if (rindex-index.value>0){
    scrollPosition.value -= (80 + 12)*(rindex-index.value);
    index.value=rindex
  }else {
    scrollPosition.value += (80 + 12)*(rindex.value-rindex);
    index.value=rindex
  }
}

const isExpandDrawerNav = ref(false)
function openOrCloseDialog() {
  isExpandDrawerNav.value = !isExpandDrawerNav.value;
  if (isExpandDrawerNav.value){
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
  }else {
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = '0';
  }
}
function getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}




const props = defineProps({
  resourceList:{
    type:Array,
    required:true
  }
})

const scrollRight = () => {
  if (index.value < props.resourceList.length - 1) {
    scrollPosition.value -= 80 + 12;
    index.value=index.value+1
  }else {
    scrollPosition.value = 5;
    index.value=0
  }
}

const scrollLeft = () => {
  if (index.value > 0) {
    scrollPosition.value += 80 + 12;
    index.value = index.value - 1;
  } else {
    scrollPosition.value =5
    index.value = props.resourceList.length - 1
  }
}


onMounted(()=>{
  lastPosition.value=(props.resourceList.length*200)+((props.resourceList.length-1)*16)+5
  console.log("最后的位置",lastPosition.value)
})


onBeforeUnmount(()=>{
  if (isExpandDrawerNav.value){
    openOrCloseDialog();
  }
})
</script>

<style scoped>
.my-container{
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.img-display-container{
  padding: 2px;
  width: calc(80% - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.15);
}
.button-display-container{
  height: 100%;
  width: calc(20% - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.current-img{
  width: 100%;
  height: 0;
  padding-bottom: 90%;
}
.switch-container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.button{
  padding: 5px 0;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.15);


}
.button>img{
  width: 32px;
  opacity: 0.65;
}

.resource-list{

  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.select-swiper-item{
  padding: 3px;
  cursor: pointer;
  width: 100%;
  min-width: 80px;
  min-height: 111px;
  max-height: 111px;
  border:1px solid rgba(0,0,0,0.15);
  margin-bottom: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.55;
}
.select-swiper-item>img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.select-swiper-item>video{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-container{
  overflow: hidden;
  padding: 16px 0;
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.list-container{
  max-height: 588px;
  width: 100%;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.open-windows{
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.product-img-container-windows{
  z-index: 2;
  padding: 30px;
  width: 60%;
  height: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  overflow-y: auto;
}
.product-img-container-windows-img{
  width: 80%;
  height: 100%;
}
.windows-bg{
  z-index: 1;
  position: absolute;
  background-color: transparent;
  width: 100%;
  height: 100%;
}
.switch-button-container{
  position: absolute;
  background-color: #0000FF;
  width: 60%;
  height: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.switch-button{
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.left{

}
.left>img{
  transform: rotate(270deg);
}
.right{

}
.right>img{
  transform: rotate(90deg);
}
.switch-button>img{
  width: 50px;
}
.switch-container-windows{
  z-index: 2;
  margin-top: 16px;
  width: 60%;
  height: 80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.switch-container-windows-d{
  z-index: 2;
  margin-top: 16px;
  width: 60%;
  height: 80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.list-container-d{
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.item-d{
  cursor: pointer;
  max-width: 80px;
  min-width: 80px;
  border:1px solid rgba(255,255,255);
  margin-right: 12px;
  width: 100%;
  overflow: hidden;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.45;
}
.left-d>img{
  transform: rotate(180deg);
}
.currentItem{
  opacity: 1;
}

@media screen and (max-width: 1024px){
  .img-display-container{
    width: 100%;
  }
  .my-container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button-display-container{
    padding: 16px 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .list-container{
    max-height: 588px;
    width: 100%;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .button{
    display: none;
  }
  .select-swiper-item{
    padding: 2px;
    min-width: 80px;
    max-height: 200px;
    min-height: 200px;
    margin-right: 8px;
  }
  .select-swiper-item>img{
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
  .select-swiper-item>video{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}


@media screen and (max-width: 767px){
  .button-display-container{
    display: none;
  }

  .product-img-container-windows{
    padding: 0 0px;
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .product-img-container-windows-img{
    width: 100%;
    height: 100%;
  }
  .switch-button-container{
    width: 100%;
  }
  .switch-container-windows-d{
    margin-top: 0px;
    width: 100%;
    height: 80px;
  }
}

</style>