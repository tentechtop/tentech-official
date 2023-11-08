<template>
  <div class="swiperbox">
    <swiper :slidesPerView="1" :spaceBetween="10" :loop="true" :centeredSlides="true"
            :pagination="{clickable: true}"
            :autoplay="{delay: 5000,disableOnInteraction: false}"
            :navigation="true"
            :modules="modules"
            class="mySwiper">
      <swiper-slide v-for="(item, index) in picList">
        <div class="swiper-item">
          <img  :src="item.imgUrl" alt="" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
// import { defineProps, ref } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue'; // swiper所需光伏组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//默认滑动效果（这里面注释掉的可以不要）
const onSwiper = swiper => {
  console.log(swiper);
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



</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}

.swiper-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.swiper-item>img{
  width: 100%;
  height: 100%;
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
  color: rgb(255, 255, 255,0);/*首页轮播图按钮*/
}
</style>
