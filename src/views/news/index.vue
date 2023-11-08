<template>
  <div class="container">
    <div class="banner">
      <div class="products-desc">
        <h1>新闻中心</h1>
        <div class="white-line"></div>
        <p>Tentech NEWS</p>
      </div>
    </div>

    <adaptive-container>
      <bread-crumb class="my-bread" :bread-crumb-list="breadCrumbList"></bread-crumb>

      <div class="news-swiper">
        <new-banner :pic-list="bannerList"></new-banner>
      </div>

      <div class="news-list-container">
        <div class="news-item-show-display" v-for="(newsI , NIndex) in newsList"
        :class="{'news-item-no-margin-right':(NIndex+1) % 3===0}"
             @click="gotoTarget(newsI)"
        >
          <div class="header-line"></div>
          <t-image class="img-container" :src = "newsI.imgUrl"></t-image>
          <h2>{{newsI.title}}</h2>
          <p>{{newsI.desc}}</p>
          <div class="news-date">
            <h1>Date: {{newsI.date}}</h1>
            <h1>view count: {{newsI.viewCount}}</h1>
          </div>
        </div>
      </div>
    </adaptive-container>
  </div>
</template>

<script lang="ts" setup>
import {ref,onBeforeMount} from 'vue'
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
import NewBanner from "../../components/new-banner.vue";
import AdaptiveContainer from "../../components/adaptive-container.vue";
import BreadCrumb from "../../components/bread-crumb.vue";
import news from "../../assets/ts/news/news";
import TImage from "../../components/tentech/t-image.vue";


const pageInfo = ref({
  title: '新闻中心',
  description: '新闻中心'
});

onBeforeMount(() => {
  // 在组件加载后动态设置页面标题
  document.title = pageInfo.value.title;
  // 在组件加载后动态设置<meta>标签中的描述信息
  const metaTag = document.querySelector('meta[name="description"]');
  if (metaTag) {
    metaTag.setAttribute('content', pageInfo.value.description);
  }
});

function gotoTarget(newsI){
  router.push({path:`/newsitem/${newsI.newsId}`})
}

const breadCrumbList = ref([
  {
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/home-icon.svg",
    name:"home",
    router:"/",
  },
  {
    imgUrl:"",
    name:"news",
    router:"/news",
  },
])
const bannerList = ref(news.newsList.slice(0,4))

const newsList = ref(news.newsList.slice(4,news.newsList.length))



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
.news-swiper{
  margin-top: 16px;
  width: 100%;

}
.banner{
  margin-top: 75px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/news-bj.jpg");
  background-size: cover;
  background-position: center;
  min-height: 500px;
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
  filter: brightness(0.7); /* 调整亮度值，0.7表示70%的亮度 */
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
  color: #fff;
}
.products-desc>p{
  font-style: italic; /* 将字体设置为斜体 */
}
.white-line{
  width: 60px;
  height: 3px;
  background: #fff;
}
.news-list-container{
  padding: 48px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.news-item-show-display{
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 36px;
  margin-right: 30px;
  width: calc(33.33% - 20px);
  min-height: 480px;
  background-color: #f3f3f3;
}
.header-line{
  width: 0;
  opacity: 0;
  position: absolute;
  height: 4px;
  background-color: #2e7be5;
}
.news-item-show-display:hover{
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
  transform: scale(1.02);
  background-color: #f0f0f0;

}
.news-item-show-display:hover .header-line{
  transition: all 0.3s ease;
  opacity: 1;
  width: 100%;
  display: block;
}
.img-container{
  margin:20px;
  width: calc(100% - 40px);
  height: 0;
  padding-bottom: 60%;
}
.news-item-show-display>h2{
  transition: all 0.3s ease;
  font-size: 18px;
  margin:20px;
  width: calc(100% - 40px);
  color: rgba(0,0,0,0.95);

}
.news-item-show-display>p{
  transition: all 0.3s ease;
  font-size: 16px;
  margin:20px;
  width: calc(100% - 40px);
  color: rgba(0,0,0,0.65);
}
.news-item-show-display:hover >h2{
  color: #2e7be5;
}
.news-item-no-margin-right{
  margin-right: 0;
}
.news-date{
  margin:20px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.news-date>h1{
  font-size: 14px;
}

@media screen and (max-width: 1582px){
  .products-desc{
    padding: 0 16px;
  }

}

@media screen and (max-width: 1024px){
  .banner{
    min-height: 360px;
  }
  .banner::before {
    min-height: 360px;
  }
  .news-item-show-display{
    min-height: 400px;
  }
}

@media screen and (max-width: 900px){
  .news-list-container{
    transform: translateX(10px);
  }
  .news-item-show-display{
    margin-right: 20px;
    width: calc(50% - 20px);
    min-height: 400px;
  }
  .news-item-no-margin-right{
    margin-right: 20px;
  }

}

@media screen and (max-width: 800px){


}

@media screen and (max-width: 700px){
  .news-item-show-display{
    min-height: 340px;
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
  .news-list-container{
    transform: translateX(0px);
  }
  .news-item-show-display{
    margin-right: 0px;
    width: 100%;
    min-height: 400px;
  }
  .news-item-no-margin-right{
    margin-right: 0px;
  }
}

</style>