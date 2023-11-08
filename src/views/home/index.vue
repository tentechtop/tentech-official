<template>
  <div class="container">
    <div class="home-banner-container">
      <home-banner :pic-list="homeBanner"></home-banner>
    </div>
    <div class="hot-product-container">
      <div class="index_pro_title_group1">
        <span class="index_pro_title1">{{ t('home.productExpress') }}</span>
        <div class="title-underline"></div>
      </div>
      <div class="product-container">
        <div v-for="(hotItem ,HIndex)  in hotProduct" class="hot-product-item" :class="{'hot-item-hover':hotItem.isHover}"
             @click="gotoProductspage(hotItem)"
             @mouseover="hotItem.isHover=true"
             @mouseleave="hotItem.isHover=false">
          <div class="hot-product-img-container">
            <img :src="hotItem.imgUrl">
          </div>
          <div class="hot-product-intro-container">
            <p>{{ t(hotItem.productName)}}</p>
            <div class="learn-more-button">
              <p>{{ t('common.learnMore') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-us-container">
      <div class="index_pro_title_group1">
        <span class="index_pro_title1 aboutUs">{{ t('menu.about') }}</span>
        <div class="title-underline"></div>
      </div>
      <div class="about-us-detail-container">

        <div class="about-us-img-container">
          <div class="about-us-intro-img-container">
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/about-us/about-us-company-01.jpg">
          </div>
        </div>

        <div class="about-us-intro-container">
          <div class="about-us-company-intro-container">
            <p>{{t('common.visualTechnology')}}</p>
          </div>
          <div class="company-desc-container">
            <p>{{ t('common.companyDescription') }}</p>

          </div>
          <div class="intro-detail-button"
          @click="router.push({path:'/aboutus',query:{seriesId:'companyIntro'}})"
          >
            <p>{{ t('common.detail') }}</p>
          </div>
        </div>

      </div>
    </div>
    <div class="featured-product-container">
      <div class="featured-product-detail-container">
        <div class="featured-product-title-container">
          <p>{{ t('home.featuredProducts') }}</p>
          <div class="title-underline featured"></div>
        </div>
        <div class="product-list-swiper-container">
          <product-list-swiper class="full-width" :product-swiper-list="featuredProduct"></product-list-swiper>
          <product-list-swiper-min class="min-width-container" :product-swiper-list="featuredProduct"></product-list-swiper-min>
        </div>
      </div>
    </div>
    <div class="hot-sell-products-container">
      <div class="featured-product-detail-container">
        <div class="featured-product-title-container">
          <p style="color: #2e7be5">{{ t('home.caseShow') }}</p>
          <div class="title-underline show-case-underline"></div>
        </div>
        <div class="product-list-swiper-container case-show-container">

          <div class="case-show-item" :class="showCase.isSelected? 'showCaseSelected':''"
               v-for="(showCase,index) in caseList"
               :style="{'background-image': `url(\' ${showCase.imgUrl} \')`,
               'background-size':' cover','background-position': 'center'}"
               @mouseover="showCaseItemFun(showCase)">
<!--            <img style="filter: brightness(0.65)" :src="showCase.imgUrl">-->
            <router-link :to="showCase.path" class="show-case-desc" :class="{'show-desc-select':showCase.isSelected}">
                <img :src="showCase.icon">
                <h1>{{ t(showCase.title) }}</h1>
                <p v-if="showCase.isSelected">{{t(showCase.desc)}}</p>
            </router-link>
          </div>


        </div>
      </div>
    </div>
    <div class="news-list-container">
      <div class="news-container">
        <div style="margin-bottom: 32px" class="case-title-container">
          <p>{{ t('menu.news') }}</p>
          <div class="title-underline show-case-underline"></div>
        </div>
        <div class="news-item-container">

<!--          <div class="news-item-show news-show-list">
            <div class="news-item-list-show">

            </div>
          </div>-->
          <router-link :to="newsItem.path" style="cursor: pointer;" class="news-item-show news-item-hover" v-for="(newsItem,index) in newsList">
            <img :src="newsItem.imgUrl">
            <div class="news-desc">
              <p>{{newsItem.YearAndMonth}}</p>
              <h2>{{t(newsItem.intro)}}</h2>
              <div class="gotoNewDetail">
                <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/news/new-arrow.png">
              </div>
            </div>
          </router-link>


        </div>
      </div>
    </div>
    <div class="tentech-intro-container">

    </div>




  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
import {onBeforeMount, onMounted, ref} from 'vue'
import home from "../../assets/ts/home/home";
import HomeBanner from "../../components/home/home-banner.vue";
import ProductListSwiper from "../../components/product-list-swiper.vue";
import HotSellProductSwiper from "../../components/hot-sell-product-swiper.vue";
import {useI18n} from "vue-i18n";
const { t,locale } = useI18n();
import partnersList from "../../assets/ts/partners-list";
import ProductListSwiperMin from "../../components/product-list-swiper-min.vue";



const pageSEOInfo = ref({
  title: 'LED显示屏 ,Led显示屏箱体，led显示屏工厂、led拼接屏，led室外屏，led室内屏，led显示屏租赁、led全彩显示屏、led显示屏压铸箱体，租赁led显示屏,广告条屏 ，显示屏解决方案',
  description: '深圳市全德视讯有限公司成立于2015年，是一家创新型专注于生产LED 显示屏的公司，拥有自己的实力工厂，我司通过提供可靠的LED显示屏产品及LED显示屏配件，24小时咨询热线: 0755 27192472',
  keywords: 'led显示屏 ,led显示屏箱体，led显示屏工厂、显示屏生产厂家、led拼接屏，led户外显示屏，led室内屏，led显示屏租赁、led全彩显示屏、led显示屏压铸箱体，led模组、租赁led显示屏'
});

onBeforeMount(() => {
  // 在组件加载后动态设置页面标题
  document.title = pageSEOInfo.value.title;
  // 在组件加载后动态设置<meta>标签中的描述信息
  const descriptionMetaTag = document.querySelector('meta[name="description"]');
  if (descriptionMetaTag) {
    descriptionMetaTag.setAttribute('content', pageSEOInfo.value.description);
  }
  // 在组件加载后动态设置<meta>标签中的关键词信息
  const keywordsMetaTag = document.querySelector('meta[name="keywords"]');
  if (keywordsMetaTag) {
    keywordsMetaTag.setAttribute('content', pageSEOInfo.value.keywords);
  }
});


const homeBanner = ref(home.homeBannerList)
const hotProduct = ref(home.hotProductList)
const featuredProduct =ref(home.featuredProductList)
const hotSellProduct =ref(home.hotSellProductList)
const quickLinks = ref(home.quickLinks)
const caseList = ref(home.caseList)
const newsList = ref(home.newsList)


function gotoProductspage(hotItem){
  router.push({
    path: hotItem.path,
    query: { seriesId: hotItem.series }
  }).then(() => {

  });
}



const partners = ref(partnersList)
function showCaseItemFun(showCase){
  caseList.value.forEach((caseItem)=>{
    caseItem.isSelected= false
  })
  showCase.isSelected = true
}

onBeforeMount(()=>{
  // const homeBanner = ref(home.homeBannerList)
  // const hotProduct = ref(home.hotProductList)
  // const featuredProduct =ref(home.featuredProductList)
  // const hotSellProduct =ref(home.hotSellProductList)
  // const quickLinks = ref(home.quickLinks)
  // const caseList = ref(home.caseList)
  // const newsList = ref(home.newsList)
  // const partners = ref(partnersList)
})
</script>

<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-banner-container{
  background-color: white;
  width: 100%;
  height: auto;
  overflow: hidden;
}
.hot-product-container{
  background-color: #f3f3f3;
  min-height: 550px;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/background/producstbg.jpg");
  background-size: cover;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hot-product-container >h1{

}
.index_pro_title_group1 {
  margin-top: 48px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.index_pro_title1 {
  font-weight: 500;
  margin-top: 72px;
  font-size: 44px;
}
.title-underline {
  border-radius: 5px;
  margin-top: 2px;
  height: 6px;
  width: 80%;
  opacity: 0.9;
  background: linear-gradient(to right, #02b6ef, #04a0e6,#0683da, #076bcf,#0865cc,#085bc8,#085cc9);
}
.show-case-underline{
  margin-top: 16px;
  width: 160px;
}
.product-container{
  padding: 70px 0;
  width: 100%;
  max-width: 1600px;
  min-height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.hot-product-item{
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  padding: 70px 10px;
  cursor: pointer;
  width: calc(25% - 28px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hot-item-hover{

}
.hot-product-img-container{
  overflow: hidden;
  width: 100%;
  max-height: 283px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hot-product-img-container>img{
  transition: all 0.5s ease;
  width: 90%;
  object-fit: cover;
}
.hot-product-item:hover{
  background-color: #2e7be5;
}
.hot-item-hover .hot-product-img-container >img{
  transform: scale(1.1);
}
.hot-product-intro-container{
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hot-product-intro-container>p{
  margin: 16px 0;
  font-size: 17px;
  font-weight: 700;
}
.learn-more-button{
  margin-top: 8px;
  border-radius: 50px;
  padding: 6px 16px;
  border: 1px solid #2e7be5;
}
.learn-more-button>p{
  color: #2e7be5;
}
.hot-item-hover .hot-product-intro-container>p{
  color: #FFF;
}
.hot-item-hover .learn-more-button{
  transition: all 0.3s ease;
  background-color: #fff;
  border-color: #fff;
}
.hot-item-hover .learn-more-button:hover{
  padding: 10px 22px;



}
.aboutUs{
  color: #fff;
}
.hot-item-hover .learn-more-button>p{
  color: #2e7be5;
}
.learn-more-button:hover{

}
.about-us-container{
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/background/bg-01.jpg");
  background-size: cover;
  width: 100%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about-us-detail-container{
  padding: 48px 0;
  width: 100%;
  max-width: 1600px;
  display: flex;
  min-height: 450px;
  flex-direction: row;
  justify-content: space-between;
}
.about-us-intro-container{

  width: calc(50% - 8px);
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.about-us-img-container{
  width: calc(50% - 8px);
  height: 100%;
  display: flex;
  flex-direction: column;
}
.about-us-title-container>p{
  font-size: 48px;
  color: #2e7be5;
}
.about-us-company-intro-container>p{
  transition: all 0.5s ease;
  font-size: 26px;
  color: #2e7be5;
}

.company-desc-container>p{
  margin-top: 16px;
  color: white;
}
.intro-detail-button{
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 32px 0;
  padding: 10px 24px;
  background-color: #2e7be5;
}
.intro-detail-button:hover{
  border-color: #2e7be5;
  background-color: #FFF;
}
.intro-detail-button>p{
  color: white;
}
.intro-detail-button:hover >p{
  color: #2e7be5;
}
.featured{
  margin: 32px 0 8px 0;
  width: 80%;
  max-width: 160px;
}
.about-us-intro-img-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.about-us-intro-img-container>img{
  transition: all 0.6s ease;
  height: 100%;
  object-fit: cover;
}
.about-us-intro-img-container>img:hover{
  transform: scale(1.1);
}
.featured-product-container{
  width: 100%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/background/featured-product-bg-01.jpg");
  background-size: cover;
}
.featured-product-detail-container{
  height: 100%;
  width: 100%;
  padding: 48px 0;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
}
.featured-product-title-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.featured-product-title-container>p{
  margin-top: 48px;
  font-size: 44px;
  color: #FFF;
}
.product-list-swiper-container{
  margin-top: 48px;
  width: 100%;
  min-height: 450px;
}
.hot-sell-products-container{
  min-height: 550px;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/background/hotproductsbg-01.jpg");
  background-size: cover;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.case-show-container{
  transition: all 0.3s ease;
  max-width: 100%;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.case-show-item{
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 10px;
  width: calc(23.33% - 16px);
  min-height: 600px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.case-show-item >img{
  height: 100%;
  object-fit: cover;
}
.show-case-desc{
  transition: all 0.5s ease;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50px;
}
.show-case-desc >img{
  width: 45px;
  object-fit: cover;
}
.show-desc-select{
  transform: translateY(-100%);
}
.show-case-desc>h1{

  font-size: 24px;
  text-align: center;
  color: #fff;
}
.show-case-desc>p{
  font-size: 16px;
  text-align: center;
  color: #fff;
}
.showCaseSelected{
 width: calc(30% - 16px);
}
.quick-links-container{
  background-color: #040203;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.links-container{
  padding: 48px 0;
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
}
.links-title-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.links-title-container>p{
  font-size: 45px;
  color: white;
}
.quick-links-item-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.quick-links-item{
  cursor: pointer;
  width: calc(33.33% - 8px);
  min-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.div-line{
  margin-right: 5px;
  width: 30px;
  height: 2px;
  background-color: #2e7be5;
}
.quick-links-item>p{
  color: white;
}
.quick-links-item>p:hover{
  color: #2e7be5;
}
.case-list-container{
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/background/bg-03.jpg");
  background-size: cover;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.case-container{
  padding: 48px 0;
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
}
.case-title-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.case-title-container>p{
  font-size: 44px;
  color: black;
}
.case-item-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.case-item{
  cursor: pointer;
  margin:16px 0;
  width: calc(50% - 8px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-height: 376px;
}
.case-img-container{
  width: 50%;
  max-width: 376px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.case-img-container>img{
  transition: all 0.5s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.active-case .case-img-container>img{
  transform: scale(1.1);
}

.case-desc-container{
  margin-left: 16px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.case-desc-container>h2{
  font-size: 24px;
  color: white;
}
.case-desc-container>p{
  margin-top: 16px;
  font-size: 17px;
  color: white;
}
.case-detail-button{
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 16px;
  padding: 10px 24px;
  background-color: #2e7be5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.active-case .case-detail-button{
  transform: translateY(5px);
}
.case-detail-button>p{
  color: white;
}
.news-list-container{
  padding-bottom: 50px;
  min-height: 650px;
  background-size: cover;
  max-width: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.news-container{
  padding-top: 72px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.news-item-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.news-item-show{
  transition: all 0.3s ease;
  overflow: hidden;
  border-radius: 10px;
  background-color: #f3f3f3;
  min-height: 590px;
  width: calc(33.33% - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.news-item-hover:hover{
  box-shadow: 0 8px 6px rgba(0, 0, 0, 0.3);
}
.news-item-show >img{
  width: 100%;
  height: 58%;
  object-fit: cover;
}
.news-desc{
  width: 100%;
  height: 42%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.gotoNewDetail{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
}
.gotoNewDetail>img{
  transition: all 0.3s ease;
  cursor: pointer;
  width: 40px;
  object-fit: cover;
}

.news-desc>p{
  font-size: 20px;
  color: #2e7be5;
  margin-bottom: 16px;
}
.news-desc>h2{
  font-size: 22px;
}
.partners .news-item-container{
  flex-wrap: wrap;
}
.news-item{
  width: calc(33.33% - 8px);
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.date-container{
  min-width: 120px;
  width: 40%;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.date-day{
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2e7be5;
}
.date-day>p{
  color: white;
  font-size: 24px;
  font-weight: 700;
}
.year-and-month{
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
}
.year-and-month>p{
  color: white;
  font-size: 14px;
  font-weight: 700;
}
.news-intro-container{
  margin-left: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.news-intro-container>h1{
  color: white;
  font-size: 22px;
}
.news-intro-container>h1:hover{
  color: #2e7be5;
}
.news-intro-container>p{
  margin-top: 8px;
  color: white;
  font-size: 17px;
}
.partners{
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/background/bg-03.jpg");
  background-size: cover;
}

.partner-item{
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
  width: calc(20% - 8px);
  min-height: 177px;
  max-height: 177px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.partner-item>img{
  transition: all 0.3s ease;
  border-radius: 5px;
  filter: brightness(0.96);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.partner-desc{
  position: absolute;
}
.partner-desc>p{
  color: white;
}
.tentech-intro-container{
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/about-us/city-3213676_1280.jpg");
  background-size: cover;
  height: 30vh;
  min-height: 350px;
  max-width: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.min-width-container{
  display: none;
}
@media screen and (max-width: 1800px){
  .product-container{
    max-width: calc(100% - 160px)
  }
  .about-us-detail-container{
    max-width: calc(100% - 160px)
  }
  .featured-product-detail-container{
    max-width: calc(100% - 160px)
  }
  .links-container{
    max-width: calc(100% - 160px)
  }
  .case-container{
    max-width: calc(100% - 160px)
  }
  .news-container{
    max-width: calc(100% - 160px)
  }


}

@media screen and (max-width: 1260px){
  .about-us-title-container>p{
    font-size: 36px;
  }
  .about-us-title-container>p{
    font-size: 36px;
  }
  .about-us-company-intro-container>p{
    font-size: 22px;
  }
  .company-desc-container>p{
    margin-top: 14px;
    font-size: 14px;
  }
  .product-container{
    max-width: calc(100% - 80px)
  }
  .about-us-detail-container{
    max-width: calc(100% - 80px)
  }
  .featured-product-detail-container{
    max-width: calc(100% - 80px)
  }
  .links-container{
    max-width: calc(100% - 80px)
  }
  .case-container{
    max-width: calc(100% - 80px)
  }
  .news-container{
    max-width: calc(100% - 80px)
  }
  .news-intro-container>h1{
    font-size: 20px;
  }
  .news-intro-container>p{
    font-size: 14px;
  }
  .partner-item{
    width: calc(25% - 8px);
  }


}

@media screen and (max-width: 1080px){
  .hot-product-intro-container>p{
    font-size: 14px;
  }
  .learn-more-button>p{
    font-size: 14px;
  }
  .product-container{
    max-width: calc(100% - 60px)
  }
  .about-us-detail-container{
    max-width: calc(100% - 60px)
  }
  .featured-product-detail-container{
    max-width: calc(100% - 60px)
  }
  .links-container{
    max-width: calc(100% - 60px)
  }
  .case-container{
    max-width: calc(100% - 64px)
  }
  .news-container{
    max-width: calc(100% - 64px)
  }
  .quick-links-item{
    width: calc(50% - 8px);
  }
  .links-title-container>p{
    font-size: 32px;
  }
  .case-title-container>p{
    font-size: 32px;
  }

}

@media screen and (max-width: 1024px){
  .product-container{
    min-height: 400px;
    flex-wrap: wrap;
  }
  .hot-product-item{
    width: calc(50% - 8px);
  }
  .about-us-intro-container{
    padding-top: 24px;
  }
  .product-container{
    max-width: calc(100% - 50px)
  }
  .about-us-detail-container{
    max-width: calc(100% - 50px)
  }
  .featured-product-detail-container{
    max-width: calc(100% - 50px)
  }
  .links-container{
    max-width: calc(100% - 50px)
  }
  .case-container{
    max-width: calc(100% - 50px)
  }
  .news-container{
    max-width: calc(100% - 50px)
  }
  .partner-item{
    width: calc(33.33% - 8px);
  }



}

@media screen and (max-width: 1000px){
  .intro-detail-button{
    margin: 8px 0;
  }
  .about-us-company-intro-container>p{
    margin-top: 8px;
  }
  .company-desc-container>p{
    margin-top: 8px;
  }
  .product-container{
    max-width: calc(100% - 40px)
  }
  .about-us-detail-container{
    max-width: calc(100% - 40px)
  }
  .featured-product-detail-container{
    max-width: calc(100% - 40px)
  }
  .links-container{
    max-width: calc(100% - 40px)
  }
  .case-container{
    max-width: calc(100% - 40px)
  }
  .news-container{
    max-width: calc(100% - 40px)
  }

}

@media screen and (max-width: 767px){
  .about-us-detail-container{
    flex-wrap: wrap;
  }
  .about-us-intro-container{
    width: calc(100%);
  }

  .about-us-img-container{
    width: calc(100%);
  }
  .hot-product-item{
    width: calc(100%);
  }
  .featured-product-detail-container{

  }
  .product-container{
    max-width: calc(100% - 16px)
  }
  .about-us-detail-container{
    max-width: calc(100% - 32px)
  }
  .featured-product-detail-container{
    max-width: calc(100% - 32px)
  }
  .links-container{
    max-width: calc(100% - 32px)
  }
  .case-container{
    max-width: calc(100% - 32px)
  }
  .news-container{
    max-width: calc(100% - 32px)
  }
  .featured-product-title-container>p{
    font-size: 32px;
  }
  .div-line{
    display: none;
  }
  .case-title-container>p{
    font-size: 32px;
  }
  .news-item-container{
    flex-wrap: wrap;
  }
  .news-item{
    margin-bottom: 16px;
    width: calc(100%);
  }
  .date-container{
    width: 25%;
  }
  .case-item{
    width: calc(100%);
  }
  .partner-item{
    width: calc(50% - 8px);
  }
  .case-show-container{
    flex-wrap: wrap;
  }
  .case-show-item{
    min-height: 400px;
    margin-bottom: 16px;
    width: calc(50% - 8px);
  }
  .showCaseSelected{
    width: calc(50% - 8px);
  }
  .news-item-show{
    width: calc(50% - 8px);
    margin-bottom: 16px;
  }
}


@media screen and (max-width: 480px){
  .case-show-item{
    width: 100%;
  }
  .showCaseSelected{
    width: 100%;
  }
  .news-item-show{
    width: 100%;
  }
}

@media screen and (min-width: 1024px){

  .min-width-container{
    display: none;
  }
}

@media screen and (max-width: 1024px){
  .full-width{
    display: none;
  }
  .min-width-container{
    display: block;
  }

}
</style>