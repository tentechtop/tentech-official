<template>
  <div class="swiperbox">
    <swiper :slidesPerView="1" :spaceBetween="0" :loop="true" :centeredSlides="true" :pagination="{
      clickable: true
    }" :autoplay="{
  delay: 5000,
  disableOnInteraction: false
}" :navigation="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(item, index) in picList">
        <div class="swiper-item">
          <img  :src="item.imgUrl" alt="" />
        </div>

      </swiper-slide>
<!--      <div class="second">
        <div class="countdown" ref="countdownRef"></div>
      </div>-->
    </swiper>
  </div>
</template>

<script setup>
import { defineProps, ref,onMounted } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue'; // swiper所需光伏组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//默认滑动效果（这里面注释掉的可以不要）

const countdownRef = ref(null);

/*@swiper="onSwiper"*/
const onSwiper = (swiperInstance) => {
  resetCountdownPosition(swiperInstance);
  swiperInstance.on('slideChange', () => {
    console.log("切换图片了")
    resetCountdownPosition(swiperInstance);
  });
};

const resetCountdownPosition = (swiperInstance) => {
  console.log("当前元素",countdownRef.value.style.transform)
  countdownRef.value.style.transform = 'translateX(-0%)';
/*  countdownRef.value.style.width = '50%'*/
};
const onSlideChange = e => {
  // swiper切换的时候执行的方法
  console.log('slide change', e.activeIndex);
};

const modules = [Autoplay, Pagination, Navigation, A11y];



// eslint-disable-next-line vue/no-setup-props-destructure
const props = defineProps({
  picList: {
    type: Array,
    required: true,
    default: () => []
  }
});




onMounted(() => {

});

</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}

.swiper-item {
  transition: all 0.3s ease;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.swiper-item>img{
  transition: all 0.3s ease;
  object-fit: cover;
  width: 100%;
  height: 100vh;
}

.txt-content {
  top: 40%;
  left: 20%;
  position: absolute;
  text-align: left;
}

.txt-content>p {
  color: rgba(200, 200, 200);
}

.txt-content>h1 {
  color: rgba(200, 200, 200);
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mySwiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.swiper-pagination) .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: rgb(255, 255, 255);

}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background-color: #fff;
}

.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
:deep(.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet {
  margin: 0 8px;
}




:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  transition: all 0.3s ease;
  transform: scale(0.85);
  margin:  0 36px;

  opacity: 0;
  color: #fff;

}

.mySwiper:hover :deep(.swiper-button-prev) {
  opacity: 1;
}

.mySwiper:hover :deep(.swiper-button-next) {
  opacity: 1;
}

.second {
  z-index: 998;
  position: absolute;
  bottom: 100px;
  right: 200px;
  width: 200px;
  height: 2px;
  background-size: 200% 100%;
  background-color: #fff;
  overflow: hidden;
}
.countdown {
  width: 100%;
  height: 100%;
  background-color: #000;
  animation: moveCountdown 5s linear forwards;
}

@keyframes moveCountdown {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}


@media screen  and (max-width: 767px){
  .swiper-item {
    height: 100%;
  }
  .swiper-item>img{
    height: 100%;
  }

}
</style>
