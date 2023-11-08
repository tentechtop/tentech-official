<template>
  <div class="container">
<!--    <div class="banner">
      <div class="products-desc">
        <h1>7x24团队服务</h1>
        <div class="white-line"></div>
        <p>24-hour service</p>
      </div>
    </div>-->

    <div class="products-desc">
      <h1>7x24团队服务</h1>
      <div class="white-line"></div>
      <p>24-hour service</p>
    </div>

    <div class="team-service-container">

      <div class="img-container">
        <div class="current-img-container">
          <img :src="currentService.imgUrl">
        </div>
      </div>


      <div class="select-item-container">
        <div class="select-item" :class="{'item-selected':item.isSelected,'item-hover':item.isHover}"
             :style="{'background-color': item.isSelected? '#fff':item.itemColor}"
             @click="gotoSelectButton(item)"
             v-for="(item,index) in teamServiceList">
          <img  src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/xin.png">
          <p>{{item.title}}</p>
        </div>



      </div>





    </div>




  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import serviceList from "../assets/ts/service/serviceList";

const currentService = ref(serviceList.teamServiceList[0])
const teamServiceList = ref(serviceList.teamServiceList)

function gotoSelectButton(item){
  teamServiceList.value.forEach(te=>{
    te.isSelected=false
  })
  item.isSelected=true
  item.isHover = true
  currentService.value=item
}

</script>

<style scoped>
.container{
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.my-bread{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.banner{
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/24hours-service.png");
  background-size: cover;
  background-position: center;
  min-height: 400px;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 500px;
  background-image: inherit; /* 继承父元素的背景图片 */
  background-size: cover;
  background-position: center;
  filter: brightness(0.98); /* 调整亮度值，0.7表示70%的亮度 */
  z-index: 2; /* 将伪元素放在父元素的底下 */
}
.banner:hover{

}
.products-desc{
  transition: all 0.5s ease;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1550px;

}
.products-desc>h1,p{
  margin: 8px 0;
  color: #000;
}
.products-desc>h1{
  font-weight: 700;
  font-size: 36px;

}
.products-desc>p{
  font-style: italic; /* 将字体设置为斜体 */
}
.white-line{
  width: 60px;
  height: 3px;
  background: #000;
}

.team-service-container{
  width: 100%;

  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.img-container{
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.current-img-container{
  height: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.current-img-container>img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.select-item-container{
  width: 45%;
  min-height: 480px;
  display: flex;
  flex-direction: column;

}
.select-item{
  transition: all 0.3s ease;
  padding: 0 16px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #2e7be5;
}
.select-item>img{
  z-index: 2;
  transition: all 0.3s ease;
  transform: translateX(-25px);
  opacity: 0;
  margin-right: 16px;
  width: 16px;
  object-fit: cover;
}
.select-item>p{
  transition: all 0.3s ease;
  font-size: 18px;
  color: #fff;
}

.item-selected>p{

  font-size: 22px;
  color: #000;
}
.item-selected >img{
  transform: translateX(0);
  opacity: 1;
  margin-right: 16px;
  width: 16px;
  object-fit: cover;
}


</style>