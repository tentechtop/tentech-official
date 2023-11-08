<template>
  <div class="container">
    <swiper
        :slidesPerView="1"
        :spaceBetween="0"
        :loop="true"
        :centeredSlides="true"
        :pagination="{clickable: true}"
        :autoplay="{delay: 50000,disableOnInteraction: false}"
        :navigation="true" :modules="modules"
        class="mySwiper">
      <swiper-slide v-for="(item, index) in picList">
        <div class="swiper-item">
          <div class="news-cover">
            <img :src="item.imgUrl">
          </div>
          <div class="news-cover news-intro">
            <h1>{{item.title}}</h1>
            <p>{{item.desc}}</p>
            <h2>{{item.date}}</h2>
            <div class="gotoTargetButton" @click="gotoTarget(item)">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/news/right-arrow-icon-news.svg">
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import {useRoute,useRouter} from "vue-router";
const route=useRoute()
const router = useRouter()
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TImage from "./tentech/t-image.vue";


function gotoTarget(item){
  console.log("path",`/newsitem/${item.newsId}`)
  router.push({path:`/newsitem/${item.newsId}`})
}



const onSwiper = swiper => {
  console.log(swiper);
};
const onSlideChange = e => {
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
.container{
  width: 100%;
}
.mySwiper {
  width: 100%;
  height: auto;
}
.swiper-item {
  transition: all 0.3s ease;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.news-cover{
  overflow: hidden;
  width: 45%;
  height: 100%;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.news-cover>img{
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.news-intro{
  width: 55%;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.news-intro>h1{
  font-size: 28px;
  margin-bottom: 32px;
}
.news-intro>p{
  font-size: 16px;
  text-indent: 2em;
  line-height: 28px;
  margin-bottom: 32px;
}
.news-intro>h2{
  opacity: 0.75;
  font-size: 16px;
}
.gotoTargetButton{
  cursor: pointer;
  padding: 10px 24px;
}
.gotoTargetButton>img{
  width: 50px;
  object-fit: cover;
}
.intro-container{
  transition: all 0.3s ease;
  top: 40%;
  left: 20%;
  z-index: 2;
  position: absolute;
  text-align: left;
}
.intro-container>p {
  font-size: 26px;
  color: #ffffff;
}

.intro-container>h1 {
  color: #ffffff;
  font-size: 36px;
  margin-bottom: 10px;
}
.solution-img{
  transition: all 0.3s ease;
  z-index: 1;
  height: 100%;
  object-fit: cover;


}
.button-space{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
}
.goto-video-button{
  cursor: pointer;
  margin-right: 16px;
  border-radius: 50px;
  padding: 10px 32px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.goto-video-button:hover{
}
.goto-video-button>img{
  width: 17px;
}
.learn-more{
  background-color: transparent;
  border: 1px solid #ffffff;
}
.learn-more>p{
  color: white;
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
  color: rgb(255, 255, 255,0);
}
@media screen and (max-width: 1243px) {
  .intro-container{
    top: 40%;
    left: 96px;
  }
  .solution-img{
    height: 600px;
  }
}

@media screen and (max-width: 1024px) {
  .intro-container{
    top: 40%;
    left: 72px;
  }
  .solution-img{
    height: 500px;
  }
  .news-intro{
    padding: 20px 30px;
  }

  .news-intro>h1{
    font-size: 22px;
    margin-bottom: 22px;
  }
  .news-intro>p{
    font-size: 16px;
    text-indent: 2em;
    line-height: 28px;
    margin-bottom: 22px;
  }
  .news-intro>h2{
    opacity: 0.75;
    font-size: 16px;
  }
}

@media screen and (max-width: 911px){
  .news-intro{
    padding: 10px 30px;
  }

  .news-intro>h1{
    font-size: 22px;
    margin-bottom: 12px;
  }
  .news-intro>p{
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 12px;
  }
  .news-intro>h2{
    opacity: 0.75;
    font-size: 16px;
  }

}

@media screen and (max-width: 767px) {
  .intro-container{
    top: 40%;
    left: 36px;
  }
  .solution-img{
    height: 400px;
  }
  .intro-container>p {
    font-size: 20px;
  }

  .intro-container>h1 {
    font-size: 24px;
  }
  .goto-video-button{
    padding: 5px 16px;
  }
  .swiper-item {
    width: 100%;
    height: 660px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .news-cover{
    width: 100%;
    height: 400px;
  }
  .news-intro{
    padding: 10px 16px;
    width: 100%;
    height: 260px;
  }
}

@media screen and (max-width: 480px) {
  .intro-container{
    top: 40%;
    left: 16px;
  }
  .solution-img{
    height: 300px;
  }
  .intro-container>p {
    font-size: 14px;
  }

  .intro-container>h1 {
    font-size: 16px;
  }
  .goto-video-button{
    padding: 4px 16px;
  }
  .goto-video-button>p{
    font-size: 12px;
  }
}
</style>
