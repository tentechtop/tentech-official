<template>
  <div v-if="!whiteList.includes(route.path)" class="footer-container">
    <div v-if="isOpenDrawerSelectLanguage" class="drawer-select-table-container" @click="openDrawerSelectLanguage()">
      <h2>{{ t('menu.selectLanguage') }}</h2>
      <div class="drawer-language-table-container">
        <div v-for="(languageItem, langIndex) in languageList" class="language-table-item"
                   @click="CurrentLanguage = languageItem;locale=languageItem.language;openDrawerSelectLanguage()" >
          <p>{{ languageItem.label }}</p>/<p>{{ languageItem.enName }}</p>
        </div>
      </div>
    </div>


  <div  class="container">
    <div class="adaptive-container">
      <div class="contact-container">
        <div class="company-logo">
          <img src="../../assets/images/tentech-logo.png">
          <h1>TENTECH</h1>
        </div>

        <div class="hot-phone">
          <p>{{ t('common.24HoursService') }}</p>
          <h1>0755-27192472</h1>
        </div>
      </div>

      <div class="menu-container">
        <div class="body">
          <ul v-for="(item,index) in list" :key="index">
            <li><span>{{ t(item.title) }}</span></li>
            <li v-for="(sub,index) in item.list" :key="index">
              <router-link   :to="getRouterLink(sub)">{{t(sub.title)}}</router-link>
            </li>
          </ul>
        </div>
      </div>
<!--      <div class="contact-link-container">
        <div class="social-link-container">
          <div v-for="(link) in contactList" class="link-item-container">
            <div class="popup-image-container">
              <img :src="link.popupImgUrl">
            </div>
            <t-image class="link-item-images" :src="link.imgUrl"></t-image>
          </div>
        </div>
      </div>-->
    </div>
    <div class="info-container">
      <div class="copy-right bottom-info">
        <p>Copyright © 2018-{{ formatDate(new Date()) }} Tentech 全德视讯 版权所有
          <a href="/">隐私政策</a>
          <a href="/">使用条款</a>
        </p>
        <p>
          <a class="icp" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">粤ICP备2021034388号</a>
          <a class="beian" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702004694" target="_blank">
            <img src="https://com2024.oss-cn-shenzhen.aliyuncs.com/image/beian.png">粤公网安备 44030702004694号</a>
        </p>
      </div>
    </div>
  </div>

    <!--收纳式页脚  -->
    <div class="drawer-footer">
      <div class="goto-top">
        <div class="goto-top-button" @click="scrollToTop">
          <h1>返回顶部</h1>
          <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/right-arrow-white.svg">
        </div>
        <div style="background-color: rgba(150,150,150);opacity: 0.5" class="divider"></div>
      </div>
      <div class="drawer-title">
        <h1>联系我们</h1>
        <t-button style="margin-bottom: 16px; width: 200px" color="#606060" over="#888888">联系我们</t-button>
        <div class="divider"></div>
      </div>
      <div class="menu-space">
        <div v-for="(menu, menuIndex) in list" class="menu-item">
          <div class="menu-content" @click="goToExpandSubmenu(menu)">
            <h1>{{ t(menu.title) }}</h1>
            <img
                :style="menu.isExpand ? 'transform: rotate(90deg);transition:transform 0.2s ease' : 'transform: rotate(0deg);transition:transform 0.2s ease'"
                src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/right-arrow-white.svg">
          </div>
          <div class="sub-menu-space"
               :style="{ height: menu.isExpand ? (menu.list.length) * 40 + 'px' : '1px', opacity: (menu.isExpand ? '1' : '0.8') }">
            <router-link v-for="( sub, subIndex) in menu.list" class="sub-menu-item" :to="sub.router">
              <p>{{ t(sub.title) }}</p>
            </router-link>
          </div>
        </div>

        <div class="menu-item">
          <div class="menu-content">
            <div class="language-switch" style="margin-left: 0" @click="openDrawerSelectLanguage()">
              <img style="width: 20px;opacity: 1;filter: brightness(1.5);" src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/diqiu.svg">
              <p style="color: rgb(240,240,240,1)" class="language">
                <a style="color: rgb(250,250,250,1)">{{ CurrentLanguage.label }}/{{ CurrentLanguage.enName }}</a>
              </p>
            </div>
<!--                        <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/right-arrow-white.svg">-->
          </div>
          <div style="background-color: rgba(150,150,150);opacity: 0.2;margin-top: 15px" class="divider"></div>
        </div>





      </div>

      <div class="subscribe">
        <p>订阅我们</p>
        <div class="email-input">
          <div class="email-wrapper">
            <input type="text" style="border: none;" placeholder="输入你的邮箱" maxlength="90" v-model="inputEmail">
            <div class="email-button">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/email.svg">
            </div>
          </div>
        </div>
        <div class="media-links">
          <div v-for="(link) in contactList" class="link-item-container drawer-link">
            <div class="popup-image-container" :class="{onlyOne:contactList.length===1}">
              <img :src="link.popupImgUrl">
            </div>
            <t-image class="link-item-images" :src="link.imgUrl"></t-image>
          </div>
        </div>

        <div class="policy-terms">
          <router-link to="/">
            <p>隐私政策</p>
          </router-link>
          <span class="terms-divider">|</span>
          <router-link to="/">
            <p>条款</p>
          </router-link>
        </div>


        <p class="website-info">Copyright © 2018-{{ formatDate(new Date()) }} tentech 全德视讯 版权所有 </p>
        <p class="website-info"><a href="https://beian.miit.gov.cn/#/Integrated/index"
                                   target="_blank">粤ICP备2021034388号</a></p>
        <p class="website-info"><a class="beian"
                                   href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702004694" target="_blank">
          <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/foot/beian.png">
          粤公网安备 44030702004694号</a>
        </p>
        <p class="website-info"></p>

      </div>




    </div>


  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t, locale, locales } = useI18n()
import {computed, onMounted, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import TButton from "../../components/t-button.vue";
const router = useRouter()
const route = useRoute()
import language from "../../assets/ts/language";
import TImage from "../tentech/t-image.vue";
const languageList = ref(language.language)
const isOpenDrawerSelectLanguage = ref(false)
const inputEmail = ref("")
const CurrentLanguage = ref(language.LanguageMap.get(locale.value))



const contactList = ref([
  { imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/wechat-icon-white.svg", popupImgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/gongzhonghao.jpg"},
])

console.log("在map中获取的语言是"+CurrentLanguage.value.label)

function openDrawerSelectLanguage() {
  isOpenDrawerSelectLanguage.value = !isOpenDrawerSelectLanguage.value
  if (isOpenDrawerSelectLanguage.value) {
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
  } else {
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


function goToExpandSubmenu(menu) {
  const temp = menu.isExpand
  /*  list.value.forEach((menu)=>{
      menu.isExpand=false
    })*/
  menu.isExpand = !temp
}


const scrollToTop = () => {
  const duration = 800; // 滚动持续时间（毫秒）
  const startPosition = window.scrollY;
  const startTime = performance.now();

  const animateScroll = (timestamp: number) => {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
    window.scrollTo(0, startPosition - easeProgress * startPosition);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  requestAnimationFrame(animateScroll);
};
function  formatDate(date) {
  const year = date.getFullYear();
  return `${year}`;
}
const whiteList = ref(["/login", "/reset-password","/sign-up"]); // 不需要渲染的名单

const list = ref(
    [
      {
        title: "menu.hotProduct",
        isExpand:false,
        list: [
          {title:"menu.rentalLEDDisplay",router:"/products",id:1,seriesId:"rental-led-display"},
          {title:"menu.fixedInstallLEDDisplay",router:"/products",id:2,seriesId:"fixed-install-led-display"},
          {title:"menu.fineSmallPixelLEDDisplay",router:"/products",id:3,seriesId:"fines-mall-pixel-led-display"},
          {title:"menu.transparentLEDDisplay",router:"/products",id:4,seriesId:"transparent-led-display"},
          {title:"menu.iposterLEDDisplay",router:"/products",id:4,seriesId:"iposter"},
          {title:"menu.creativeDisplay",router:"/products",id:4,seriesId:"creative-display"},
        ]
      },
      {
      title: "menu.serviceAndSupport",
      isExpand:false,
      list: [
        {title:"menu.serviceGuide",router:"/service",seriesId:"guide"},
        {title:"menu.download",router:"/service",seriesId:"download"},
        {title:"menu.faq",router:"/service",seriesId:"faq"},
      ]
    },
      {
      title: "menu.newsCenter",
      isExpand:false,
      list: [
        {title:"menu.newsCenter",router:"/news",},
        {title:"menu.exhibitionEvents",router:"/news",},
      ]
    },
      {
        title: "menu.successCases",
        isExpand:false,
        list: [
          {title:"menu.successCases",router:"/case",},
          {title:"menu.classicCases",router:"/case",},
        ]
      },
      {
        title: "menu.contact",
        isExpand:false,
        list: [
          {title:"menu.contact",router:"/contact",},
          {title:"menu.feedbackAndSuggestions",router:"/",},
        ]
      },
      {
        title: "menu.about",
        isExpand:false,
        list: [
          {title:"menu.about",router:"/aboutus",},
        ]
      },
    ]
);

function getRouterLink(sub) {
  if (sub.seriesId && sub.seriesId !=="") {
    return {
      path: sub.router,
      query: { seriesId: sub.seriesId }
    };
  } else {
    return { path: sub.router };
  }
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
.adaptive-container{
  width: 1600px;
  max-width: 1800px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.contact-container{
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.contact-container>img{
  height: 40px;
  object-fit: cover;
}
.company-logo{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.company-logo>img{
  height: 40px;
  object-fit: cover;
}
.company-logo>h1{
  white-space: nowrap;
    background: linear-gradient(to right, #2e7be5, #2e7be5, #2e7be5, #2e7be5, #2e7be5, #2e7be5, #2e7be5);
    -webkit-background-clip: text;
    color: transparent;
  font-size: 22px;
  font-weight: 700;
  font-style: italic; /* 将字体设置为斜体 */
}
.hot-phone{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.hot-phone>p{
  color: black;
  font-size: 18px;
  margin-right: 16px;
}
.hot-phone>h1{

}
.menu-container{
  width: 100%;
  height: 400px;
  background-color: #fff;
  border-top:1px solid rgba(0,0,0,0.15);
  display: flex;
  flex-direction: row;
  justify-content: space-between;


}
.info-container{
  width: 100%;
  height: 70px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.bottom-info{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

}

.bottom-info>a{
  font-size: 14px;
  color: #7e7e7e;
  margin-right: 16px;
}

.body {
  padding: 70px 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.body::after {


}

.body ul {




}
.body ul >li{
  font-size: 15px;
  margin-bottom: 20px;
}

.body ul >li >span{
  font-size: 20px;
  color: #000;
}

.body ul >li >a{
  font-size: 14px;
  color: #7e7e7e;
}
.bottom-info{
  width: 100%;
  min-height: 70px;
  padding: 4px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.bottom-info>p{
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  padding: 0;
  margin: 0;
  color: #000;
}
.bottom-info >p >a{
  font-weight: 300;
  margin-right: 8px;
  text-decoration: none;
  font-size: 16px;
  color: #000;
}
.bottom-info >p >a >img{
  width: 16px;
}
.drawer-footer {
  display: none;
  padding: 0 16px;
}

.goto-top {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.goto-top-button {
  height: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.goto-top-button>h1 {
  color: rgba(240, 240, 240);
  font-size: 13px;
  margin-right: 8px;
}
.drawer-title {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.drawer-title>h1 {
  margin-top: 16px;
  font-size: 20px;
  margin-bottom: 8px;
}
.goto-top-button>img {
  width: 18px;
  transform: rotate(-90deg);
}
.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(200, 200, 200, 0.2);
}

.menu-space {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu-item {
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: height 0.3s ease;
}

.menu-content {
  z-index: 2;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.menu-content>h1 {
  font-size: 14px;
}

.menu-content>img {
  width: 14px;
}

.sub-menu-space {
  overflow: hidden;
  z-index: 1;
  transition: height 0.3s ease, opacity 0.6s ease;
  opacity: 0.5;
  width: 100%;
  height: 1px;
  background-color: rgba(50, 50, 50);
}

.sub-menu-item {
  color: rgba(180, 180, 180);
  font-size: 14px;
  width: 100%;
  height: 40px;
  padding-left: 16px;
  transition: opacity 0.3s ease, display 0.6s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sub-menu-item:hover {
  color: white;
}

.subscribe {
  margin: 32px 0 48px;
  width: 100%;
}

.subscribe>p {
  margin-bottom: 10px;
  font-size: 14px;
}

.email-input {
  z-index: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
}

.email-wrapper {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.email-wrapper>input {
  flex: 1;
  background-color: #272727;
  height: 36px;
  padding: 0 5px;
  color: #fff;
}

.email-wrapper>input[type="text"] {
  /* 设置输入框正常状态下的样式 */
  border: none;
  outline: 1px solid rgba(240, 240, 240, 0.25);
}

.email-wrapper>input[type="text"]:focus {
  /* 设置输入框选中状态下的样式 */
  border: none;
  outline: 1px solid rgba(240, 240, 240, 0.6);
}

.email-button {
  cursor: pointer;
  width: 50px;
  height: 38px;
  background-color: rgba(80, 80, 80);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.subscribe-button{
  width: auto;
  padding: 0 10px;
  height: 100%;
}
.email-button:hover {
  background-color: rgba(120, 120, 120);
}

.email-button>img {
  width: 28px;
  opacity: 0.7;
}
.subscribe-button>img{
  width: 20px;
}
.subscribe-email-input-container{
  height: 34px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border:  1px solid rgba(240, 240, 240, 0.25);;
}
.subscribe-email-input-container>input {
  height: 100%;
  padding: 0px 5px;
  width: 100%;
  background-color: #272727;
  color: #fff;
  font-size: 12px;
}
.subscribe-email-input-container>input[type="text"] {
  /* 设置输入框正常状态下的样式 */
  border: none;

}

.subscribe-email-input-container>input[type="text"]:focus {
  /* 设置输入框选中状态下的样式 */
  border: none;
  outline: none;
}

.media-links {
  margin: 16px 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.link-item {
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-right: 16px;
}

.link-item>img {
  height: 100%;
  object-fit: cover;
}

.website-info,
.website-info a {
  color: rgba(180, 180, 180);
}

.website-info a:hover {
  color: #fff;
}

.policy-terms {
  color: rgba(180, 180, 180);
  line-height: 22px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.policy-terms>a {
  white-space: nowrap;
  font-size: 14px;
  color: rgba(180, 180, 180);
}

.policy-terms>a:hover {
  color: rgba(255, 255, 255);
}

.policy-terms>.terms-divider {
  margin: 0 16px;
}

.split-line {
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 24px 0;
}

.remote-experience-container {
  top: 0;
  z-index: 99999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.language-table {
  align-items: center;
  justify-content: flex-start;
}

.language-table-container {
  padding: 16px 32px;
  margin-top: 254px;
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.language-item-container {
  transform: translateX(8px);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.language-item {
  cursor: pointer;
  padding: 16px 8px;
  margin-right: 16px;
  margin-bottom: 16px;
  width: calc(33.33% - 16px);
  min-height: 30px;
  background-color: #F7F9FA;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.language-item>p {
  color: black;
  font-weight: 400;
}

.language-item:hover {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  /* 添加阴影样式 */
}

.language-item:hover>p {
  font-weight: 700;
}

.select-country-container {
  width: 100%;

}
.language >a{
  white-space: nowrap;
}

.select-country-container>h2 {
  padding: 32px 0;
  align-items: center;
  cursor: pointer;
  text-align: center;
}

.drawer-select-table-container {
  top: 0;
  z-index: 99999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.drawer-select-table-container>h2 {
  margin-top: 48px;
  text-align: center;
}

.language-table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
}

.drawer-language-table-container {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 16px;
}

.language-table-item {
  cursor: pointer;
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.language-table-item>p {
  font-size: 17px;
  color: black;
}

.language-color {
  color: black;
}

.language-color:hover {
  color: white;
}

.close-button {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

}

.close-button>p {
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  background-color: #3d48d2;
  color: white;
}
.whiteBackground-button{
  background-color: #afabab;
}
.whiteBackground-button:hover{
  background-color: #737171;
}

.language-switch {
  border-radius: 5px;
  padding: 4px 4px;
  cursor: pointer;
  height: 30px;
  color: rgba(140, 140, 140, 0.7);
  font-size: 13px;
  margin-left: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.language-switch>img {
  margin-right: 3px;
}

.language-switch:hover {
  background-color: #3b3e40;
}

.language-switch:hover .language{
  color: rgba(256, 256, 256, 0.9);
}
.link-item-container{
  border-radius: 100px;
  margin-right: 5px;
  width: 28px;
  height: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #5d5d5d;
  padding: 3px;
}

.popup-image-container{
  display: none;
}
.link-item-container:hover{
  background-color: #2585E0;
}
.link-item-container:hover .popup-image-container{
  transform: translateY(-65%);
  position: absolute;
  height: 144px;
  width: 144px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 4px rgba(200, 200, 200, 0.2); /* 添加阴影样式 */
  border-radius: 5px;
}

.link-item-container:hover .popup-image-container >img{
  width: 90%;
  height: 90%;
  object-fit: cover;
}
.drawer-link:first-child:hover .popup-image-container{
  transform: translateY(-65%) translateX(40%);
}
.drawer-link:nth-child(2):hover .popup-image-container{
  transform: translateY(-65%) translateX(20%);
}
.link-item-images{
  opacity: 0.85;
  cursor: pointer;
  width: 80%;
  height: 80%;
  object-fit: cover;
}
.contact-link-container{
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.social-link-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 1800px){
  .adaptive-container{
    width: calc(100% - 120px);
  }
}
@media screen and (max-width: 1260px){
  .adaptive-container{
    width: calc(100% - 80px);
  }
}
@media screen and (max-width: 1024px){
  .adaptive-container{
    width: calc(100% - 60px);
  }
}
@media screen and (max-width: 900px){
  .adaptive-container{
    width: calc(100% - 80px);
  }
}


@media screen and (max-width: 767px) {
  .container {
    display: none;
  }

  .drawer-footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    height: auto;
    z-index: 999;
    color: #fff;
    background-color: #272727;
  }

}

@media screen and (max-width: 512px){
  .info-container{
    min-height: 100vh;
  }
  .login-card{
    min-height: 80vh;
    width: calc(100% - 32px);
  }
  .bottom-info>p{
    padding: 0 16px;
    font-size: 14px;
  }
  .bottom-info >p >a{
    font-size: 14px;
  }
}
</style>
