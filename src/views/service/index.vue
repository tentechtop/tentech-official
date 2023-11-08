<template>
  <div class="container">
    <div class="banner">
      <div class="products-desc">
        <h1>{{ t('menu.serviceAndSupport') }}</h1>
        <div class="white-line"></div>
        <p>Service & Support</p>
      </div>
      <div class="select-button-container">
        <div class="button-container">
          <div class="about-button" :class="{buttonSelected:ab.isSelected}" v-for="(ab,abIndex) in selectMenu"
               @click="gotoSelectButton(ab)">
            <p>{{t(ab.title)}}</p>
            <div class="button-line"></div>
          </div>
        </div>
      </div>
    </div>

    <adaptive-container>
      <bread-crumb class="my-bread" :bread-crumb-list="breadCrumbList"></bread-crumb>
      <div v-if="currentDisplay===1" class="service-guide">
        <div class="service-guide-title">
          <p>{{ t('menu.serviceGuide') }}</p>
        </div>
        <div class="service-guide-desc">
          <p>{{t('menu.serviceGuideDesc')}}</p>
        </div>
        <div class="guide-container">
          <div class="guide-item" v-for="(g,gIndex) in guideList">
            <div class="guide-title">
              <p>{{t(g.title)}}</p>
            </div>
            <div class="guide-title guide-desc">
              <p>{{t(g.content)}}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentDisplay===2" class="data-download">
        <div class="search-bar">
          <search-bar :btn="t('menu.searchFind')" v-model="inputQuestion" :placeholder="t('menu.inputSearchFile')" maxlength="64" @search="search"></search-bar>
        </div>
        <div class="download-content">
          <div class="sidebar">
            <div v-for="(item, index) in menuList" class="sidebar-menu" :class="{ 'expand-menu': item.isExpand }"
                 :style="{ height: item.isExpand ? (item.subMenu.length * 48) + 48 + 'px' : '48px' }">
              <div class="sidebar-menu-button" @click="goToExpand(item, index)">
                <h1>{{ t(item.title) }}</h1>
                <img v-if="item.subMenu.length > 0" src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/arrow-right.svg">
              </div>
              <div class="sub-menu-list"
                   :style="{ height: item.isExpand ? (item.subMenu.length) * 48 + 'px' : '0px', opacity: item.isExpand ? '1' : '0' }">
                <div v-for="(sub, subIndex) in item.subMenu" class="sub-menu table"
                     @click="changItemSelected(sub, index, subIndex)">
                  <h1 :style="sub.isSelected ? 'color:#000;font-weight: 700;' : ''">{{ t(sub.name) }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="help-list-container">
              <h6>{{filteredHelpList.length}}{{ t('个结果') }}</h6>
              <a :href="item.downloadUrl" target="_blank"  v-for="(item, index) in filteredHelpList" class="download-item">
                <h1>{{ index + 1 }}、{{ t(item.title) }}</h1>
                <p>{{ t(item.desc) }}</p>
                <div class="help-desc-container">
                  <p>{{ t('发布时间') }}:{{ item.date }}</p>  <p>{{ t('点赞数量') }}:{{ item.likeNumber }}</p>
                </div>
              </a>
          </div>
        </div>
      </div>


      <div v-if="currentDisplay===3" class="data-download">
        <div class="search-bar">
          <search-bar :btn="t('menu.searchFind')" v-model="inputQuestionFaq" :placeholder="t('menu.PleaseInput')" maxlength="64" @search="search"></search-bar>
        </div>



        <div class="download-content">
          <div class="sidebar">
            <div v-for="(item, index) in faqMenuList" class="sidebar-menu" :class="{ 'expand-menu': item.isExpand }"
                 :style="{ height: item.isExpand ? (item.subMenu.length * 48) + 48 + 'px' : '48px' }">
              <div class="sidebar-menu-button" @click="goToFaqExpand(item, index)">
                <h1>{{ item.title }}</h1>
                <img v-if="item.subMenu.length > 0" src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/arrow-right.svg">
              </div>
              <div class="sub-menu-list"
                   :style="{ height: item.isExpand ? (item.subMenu.length) * 48 + 'px' : '0px', opacity: item.isExpand ? '1' : '0' }">
                <div v-for="(sub, subIndex) in item.subMenu" class="sub-menu table"
                     @click="changFaqItemSelected(sub, index, subIndex)">
                  <h1 :style="sub.isSelected ? 'color:#000;font-weight: 700;' : ''">{{ sub.name }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="help-list-container">
            <h6>{{filteredFaqList.length}}{{ t('个结果') }}</h6>
            <div   v-for="(item, index) in filteredFaqList" class="download-item">
              <h1>{{ index + 1 }}、{{ t(item.faqTitle) }}</h1>
              <p>{{ t(item.faqQuestion) }}</p>
              <div class="help-desc-container">
                <p>{{ t('发布时间') }}:{{ item.date }}</p>  <p>{{ t('点赞数量') }}:{{ item.likeNumber }}</p>
              </div>
            </div>
          </div>
        </div>





      </div>





    </adaptive-container>



  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
const { t,locale } = useI18n();
import {servicePageStore} from "../../store/service";
const servicePageInfo = servicePageStore()
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
import {ref, computed, watch, onBeforeMount, onUpdated,onMounted} from "vue";
import AdaptiveContainer from "../../components/adaptive-container.vue";
import BreadCrumb from "../../components/bread-crumb.vue";
import serviceList from "../../assets/ts/service/serviceList";
import SearchBar from "../../components/search-bar.vue";
const inputQuestion = ref("")
const inputQuestionFaq = ref("")



function search(text: any) {
  inputQuestionFaq.value = text
}
const guideList = ref(serviceList.serviceGuideList)



const pageInfo = ref({
  title: '服务与支持',
  description: '服务与支持'
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

const menuList  = ref([
  {
    title: "全部",
    isExpand: false,
    subMenu: [],
  },
  {
    title: "常见下载",
    isExpand: true,
    subMenu: [
      { name: "app下载", isSelected: false, minorMenu: [] },
      { name: "产品使用前注意事项", isSelected: false, minorMenu: [] },
      { name: "产品规格说明书", isSelected: false, minorMenu: [] },
      { name: "产品使用前注意事项", isSelected: false, minorMenu: [] },
      { name: "首次使用快速指引", isSelected: false, minorMenu: [] },
      { name: "产品使用说明书", isSelected: false, minorMenu: [] },
      { name: "维修手册", isSelected: false, minorMenu: [] },
    ],
  },
])



const faqMenuList  = ref([
  {
    title: "全部",
    isExpand: false,
    subMenu: [],
  },
  {
    title: "常见下载",
    isExpand: true,
    subMenu: [
      { name: "公司成立年份", isSelected: false, minorMenu: [] },
      { name: "公司生成车间", isSelected: false, minorMenu: [] },
    ],
  },
])
const currentHelpList = ref(serviceList.downloadList)
const currentFaqList = ref(serviceList.faqList)
function goToExpand(item, index) {
  item.isExpand = !item.isExpand
  if (item.isExpand && index === 0) {
    inputQuestion.value = ""
  }
}

function goToFaqExpand(item, index){
  item.isExpand = !item.isExpand
  if (item.isExpand && index === 0) {
    inputQuestionFaq.value = ""
  }
}

const filteredHelpList = computed(() => {
  return currentHelpList.value.filter((help) => {
    const keyword = inputQuestion.value.toLowerCase().trim();
    const titleContainsKeyword = help.title.toLowerCase().includes(keyword);
    const contentContainsKeyword = help.desc.toLowerCase().includes(keyword);
    return titleContainsKeyword || contentContainsKeyword;
  });
});


const filteredFaqList = computed(() => {
  return currentFaqList.value.filter((faq) => {
    const keyword = inputQuestionFaq.value.toLowerCase().trim();
    const titleContainsKeyword = faq.faqTitle.toLowerCase().includes(keyword);
    const contentContainsKeyword = faq.faqQuestion.toLowerCase().includes(keyword);
    return titleContainsKeyword || contentContainsKeyword;
  });
});


function changItemSelected(sub, index, subIndex) {
  const temp1 = menuList.value[index].subMenu[subIndex].isSelected
  const temp = sub.isSelected;
  menuList.value.forEach((item) => {
    item.subMenu.forEach((sub) => {
      sub.isSelected = false
    })
  })
  sub.isSelected = !temp;
  inputQuestion.value = sub.name
  if (sub.name !== "组件类型") {
    inputQuestion.value = sub.name
  } else {
    inputQuestion.value = "组件"
  }
  scrollToTop()
}

function changFaqItemSelected(sub, index, subIndex){
  const temp1 = menuList.value[index].subMenu[subIndex].isSelected
  console.log("temp1"+temp1)
  const temp = sub.isSelected;
  faqMenuList.value.forEach((item) => {
    item.subMenu.forEach((sub) => {
      sub.isSelected = false
    })
  })
  sub.isSelected = !temp;
  inputQuestionFaq.value = sub.name
  console.log("faq是"+inputQuestionFaq.value)
  scrollToTop()
}


const scrollToTop = () => {
  const duration = 400; // 滚动持续时间（毫秒）
  const startPosition = window.scrollY;
  const targetPosition = 440; // 目标Y轴位置
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


const breadCrumbList = ref([
  {
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/home-icon.svg",
    name:"home",
    router:"/",
  },
  {
    imgUrl:"",
    name:"service",
    router:"/service",
  },
])
const currentDisplay = ref(1)
const selectMenu = ref([
  {
    isSelected:true,
    title:"menu.serviceGuide",
    menuName:"guide",
    menuValue:1,
  },
  {
    isSelected:false,
    title:"menu.download",
    menuName:"download",
    menuValue:2,
  },
  {
    isSelected:false,
    title:"menu.faq",
    menuName:"faq",
    menuValue:3,
  },

])

function gotoSelectButton(ab){
  selectMenu.value.forEach((ab)=>{
    ab.isSelected=false
  })
  ab.isSelected=true
  currentDisplay.value=ab.menuValue
  servicePageInfo.updateCurrentDisplay(currentDisplay.value)
}



const currentRouteSeries = ref(route.query.seriesId)
console.log("通过路由获取的系列"+currentRouteSeries.value)
watch(route,(newValue)=>{
  if (route.path==='/service' && newValue.query.seriesId){
    currentRouteSeries.value = newValue.query.seriesId
    selectMenu.value.forEach((ab)=>{
      ab.isSelected=false
    })
    selectMenu.value.find(se =>se.menuName === newValue.query.seriesId).isSelected=true
    currentDisplay.value=selectMenu.value.find(se =>se.menuName === newValue.query.seriesId).menuValue
    servicePageInfo.updateCurrentDisplay(currentDisplay.value)
    console.log("watch设置全局变量"+currentRouteSeries.value)
  }
})


onBeforeMount(()=>{
  if (route.path==='/service' && route.query.seriesId){
    selectMenu.value.forEach((ab)=>{
      ab.isSelected=false
    })
    selectMenu.value.find(se =>se.menuName === route.query.seriesId).isSelected=true
    currentDisplay.value = selectMenu.value.find(se =>se.menuName === route.query.seriesId).menuValue
    servicePageInfo.updateCurrentDisplay(currentDisplay.value)
  }else if (servicePageInfo.currentDisplay){
    selectMenu.value.forEach((ab)=>{
      ab.isSelected=false
    })
    selectMenu.value.find(se =>se.menuValue === servicePageInfo.currentDisplay).isSelected=true
    currentDisplay.value = selectMenu.value.find(se =>se.menuValue === servicePageInfo.currentDisplay).menuValue
  }else {

  }
})

onUpdated(()=>{

})

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
  margin-top: 75px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/service/service-bg.jpg");
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
.select-button-container{
  bottom: 0;
  position: absolute;
  transition: all 0.5s ease;
  z-index: 4;
  width: 100%;
  background-color: rgba(0,0,0,0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.button-container{
  width: 100%;
  max-width: 1550px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.about-button{
  padding: 20px 30px;
  cursor: pointer;
  color: #fff;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.about-button:first-child{
  padding-left: 0;
}

.button-line{
  transition: all 0.5s ease;
  width: 0;
  opacity: 0;
  position: sticky;
  height: 4px;
  background-color: #fff;
}

.about-button:hover .button-line{
  transition: all 0.3s ease;
  width: 100%;
  opacity: 1;
}
.buttonSelected .button-line{
  transition: all 0.3s ease;
  width: 100%;
  opacity: 1;
}

.service-guide{
  padding: 72px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.service-guide-title{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.service-guide-title>p{
  font-size: 44px;
  color: #000;
  margin-bottom: 32px;
}
.service-guide-desc{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.service-guide-desc>p{
  font-size: 20px;
  color: #000;
  margin-bottom: 32px;
}
.guide-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.guide-item{
  cursor: pointer;
  padding: 20px;
  margin-bottom: 20px;
  width: calc(50% - 20px);
  min-height: 80px;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;

}
.guide-item:hover{
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
}
.guide-title{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.guide-title>p{
  font-size: 18px;
  color: #000;
}

.guide-title>h2{
  opacity: 0;
  font-size: 16px;
  margin-right: 16px;
  padding: 5px;
  background-color: #F08000;
  margin-bottom: 16px;
}
.guide-title>h1{
  opacity: 0;
  font-size: 16px;
  margin-right: 16px;
  padding: 5px;
  background-color: #2e7be5;
  margin-bottom: 16px;
}

.guide-item:hover .guide-title>p{
  color: #F08000;

}

.guide-desc>p{
  font-size: 16px;
  color: rgba(0,0,0,0.55);
}
.guide-item:hover .guide-desc>p{
  color: rgba(0,0,0,0.55);
}

.search-bar {
  border-bottom: 1px solid #b9b9b9;
  width: 100%;
  padding: 48px 0;
  display: flex;
  justify-content: center;
}
.download-content{
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sidebar {
  background-color: #f0f0f0;
  width: calc(30% - 16px);
  min-width: 230px;
  height: calc(100vh - 64px);
  margin-right: 48px;
  padding: 16px;
  top: 64px;
  position: sticky;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar-menu {
  height: 48px;
  width: 100%;
  transition: height 0.3s ease;
  display: flex;
  flex-direction: column;
}


.sidebar-menu-button {
  z-index: 999;
  height: 48px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: height 0.3s ease;
}

.sidebar-menu-button>h1 {
  color: #3a3a3a;
  font-size: 16px;
}

.sidebar-menu-button>img {
  transition: transform 0.2s ease;
  width: 20px;
  transform: rotate(0deg);
}



.expand-menu>.sidebar-menu-button>h1 {
  font-weight: 700;
}

.expand-menu>.sidebar-menu-button>img {
  transform: rotate(90deg);
}

.sub-menu-list {
  overflow: hidden;
  width: 100%;
  transition: height 0.3s ease, opacity 0.6s ease;
}

.sub-menu {
  cursor: pointer;
  padding-left: 32px;
  height: 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sub-menu>h1 {
  font-size: 16px;
}

.help-list-container{
  padding: 20px;
  width: calc(70% - 16px);
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.download-item{
  cursor: pointer;
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0,0,0,0.15);

}
.download-item>h1{
  color: #000;
  font-size: 18px;
}
.download-item>p{
  opacity: 0.75;
  text-indent: 1em;
  color: #000;
  font-size: 16px;
}
.download-item:hover >p{
  text-decoration: underline;
}
.help-desc-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.help-desc-container>p{
  font-size: 12px;
  color: #000;
}

@media screen and (max-width: 1582px){
  .products-desc{
    padding: 0 16px;
  }
  .select-button-container{
  }
  .button-container{
    padding: 0 16px;
  }
}

@media screen and (max-width: 1024px){
  .desc-container>h1{
    font-size: 14px;
  }
}

@media screen and (max-width: 800px){
  .about-button{
    padding: 20px 20px;
    font-size: 14px;
  }

}

@media screen and (max-width: 767px){
  .guide-item{
    padding: 20px;
    width: 100%;
  }
  .service-guide-title>p{
    font-size: 34px;
    margin-bottom: 32px;
  }
  .service-guide{
    padding: 36px 0;
  }
  .service-guide-desc>p{
    font-size: 16px;
  }


  .sidebar {
    display: none;

  }
  .help-list-container{
    padding: 10px;
    width: 100%;
  }

}

@media screen and (max-width: 600px){
  .about-button{
    padding: 20px 10px;
    font-size: 13px;
  }
  .banner{
    min-height: 300px;
  }
  .banner::before {
    min-height: 300px;
  }
}


@media screen and (max-width: 480px){
  .about-button{
    padding: 20px 15px;
    font-size: 13px;
  }
  .desc-container>h1{
    font-size: 14px;
  }

}


</style>
