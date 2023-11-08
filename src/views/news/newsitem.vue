<template>
  <div class="container">
    <div class="banner">
      <div class="products-desc">
        <h1>{{ newsDetail.title }}</h1>
        <div class="white-line"></div>
        <p>{{ newsDetail.desc }}</p>
      </div>
    </div>

    <adaptive-container >
      <div class="news-container">
        <div class="news-wrapper">
          <div class="news-detail-container">
            <div class="news-tag">
              <h1 class="tag">公司新闻</h1>
              <h1>{{ newsDetail.date }}</h1>
            </div>
            <div class="split-line"></div>
            <div class="news-content">
              <p v-html="getProductIntroHtml(newsDetail.htmlText)"></p>
            </div>
          </div>


          <div class="hot-news-container">
            <h1>最新新闻</h1>
            <div v-for="(item, index) in recentNewsList" class="hot-news-item"
                 @click="gotoTargetNewDetail(item)"
            >
              <t-image class="hot-news-img-container" :src="item.imgUrl" scale="true"></t-image>
              <h2>{{ item.title }}</h2>
              <div class="hot-news-tag">
                <h4>{{ item.viewCount }}</h4>
                <p>{{ item.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </adaptive-container>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, ref, computed, onUpdated} from 'vue'
import { useRoute, useRouter } from "vue-router";
//引入获取实例
const router = useRouter()
const route = useRoute()
import news from "../../assets/ts/news/news";
import NavHeader from "../../components/NavHeader.vue";
import AdaptiveContainer from "../../components/adaptive-container.vue";
import TImage from "../../components/tentech/t-image.vue";
const newsId = ref(route.params.newsId)
const newsDetail = ref(news.newsMap.get(parseInt(route.params.newsId)))
console.log("newsDetail是",newsDetail.value)

function getProductIntroHtml(thtml){
  let html = thtml
      .replace(/\n/g, '<br>','<router-link>')
      .replace(/<img/g, '<img style="width: 100%;object-fit:cover;margin:10px 0"')
  return html
}
const recentNewsList = ref(news.newsList.slice(0,4))


function gotoTargetNewDetail(item){

  router.push({path:`/newsitem/${item.newsId}`})
  /*  scrollToTop();*/
}


const scrollToTop = () => {
  const duration = 400; // 滚动持续时间（毫秒）
  const startPosition = window.scrollY;
  const targetPosition = 140; // 目标Y轴位置
  const startTime = performance.now();
  const animateScroll = (timestamp: number) => {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
    const newPosition = startPosition + (targetPosition - startPosition) * easeProgress;
    window.scrollTo(0, newPosition);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  requestAnimationFrame(animateScroll);
};

onUpdated(()=>{
  newsDetail.value = news.newsMap.get(parseInt(route.params.newsId))
})
</script>

<style scoped>
.container{
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.my-bread{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.news-swiper{
  margin-top: 16px;
  width: 100%;

}
.banner{
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  /*  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/news-bj.jpg");
    background-size: cover;*/
  background-position: center;
  min-height: 300px;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.products-desc>p{
  font-style: italic; /* 将字体设置为斜体 */
}
.white-line{
  width: 160px;
  height: 3px;
  background: #000;
}
.news-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.news-wrapper {
  width: 100%;
  max-width: 1550px;
  padding: 48px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.news-detail-container{
  width: calc(75% - 32px);
  min-height: 400px;

}

.news-detail-container>h1 {
  line-height: 1.5;
  font-size: 32px;
  font-weight: 500;
}
.hot-news-container{
  width: 25%;
  min-height: 300px;
}

.hot-news-container>h1 {
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 400;
}

.news-tag {
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.news-tag>h1 {
  font-size: 18px;
  color: #545557;
  font-weight: 400;
  margin-right: 16px;
}

.split-line {
  margin: 16px 0 24px;
  width: 100%;
  height: 1px;
  opacity: 0.3;
  background-color: #303233;
}

.news-content{

  width: 100%;
  display: flex;
  flex-direction: column;
}
.news-content>p{
  color: rgba(0,0,0,0.93);
  font-size: 18px;
  line-height: 23px;
}

.hot-news-item {
  width: 100%;
}

.hot-news-item:last-child {
  margin-bottom: 0;
}

.hot-news-img-container {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}

.hot-news-item>h2 {
  font-size: 16px;
  margin-top: 8px;
  color: black;
  font-weight: 400;
}

.hot-news-tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2px;
  margin-bottom: 16px;
}

.hot-news-tag>p {
  color: #909399;
  font-size: 10px;
  font-weight: 300;
}

.hot-news-tag>h4 {
  color: #fff;
  background-color: #909399;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 300;
  padding: 1px 5px;
}

.hot-news-tag>* {
  margin-right: 16px;
}

.hot-news-tag>*:last-child {
  margin-right: 0;
}



@media screen and (max-width: 1582px){
  .products-desc{
    padding: 0 16px;
  }

}

@media screen and (max-width: 1024px){

}

@media screen and (max-width: 800px){


}

@media screen and (max-width: 767px) {
  .hot-news-container {
    display: none;
  }


  .news-detail-container{
    width: 100%;
    min-height: 400px;
  }



}


@media screen and (max-width: 600px){

  .banner{
    min-height: 300px;
  }
  .banner::before {
    min-height: 300px;
  }
}


@media screen and (max-width: 480px){


}
</style>