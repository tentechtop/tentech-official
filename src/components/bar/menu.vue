<template>
  <div v-if="needNav &&!whiteList.includes(route.path)">
    <div  class="nav-container" :class="{theme}" :style="getHeaderStyle">
      <div v-if="isSwitchLanguages" class="switch-language-dialog">
        <div class="close-bg" @click="openOrCloseSwitchLanguage"></div>
        <div class="switch-language-container">
          <h1>{{ t('menu.selectLanguage') }}</h1>
          <div class="language-line"></div>
          <div class="language-list-container">
            <div v-for="(la,lIndex) in languageList" class="language-item" :class="{'last-item':(lIndex+1) % 3===0,'langSelected':la.isSelected}"
                 @click="gotoSelectLanguage(la)">
              {{la.label}}
            </div>

          </div>

        </div>
      </div>



      <div class="nav-space" :style="{'background-color':theme === 'nav-top' ? 'transparent':'rgba(255,255,255)'}">
        <nav>
          <div class="left-space">
            <div class="logo-space" @click="goToHome">
              <img src="../../assets/images/tentech-logo.png">
              <div class="logo-text">
                <h1 :style="{color:theme === 'nav-top' ? 'rgba(255,255,255)':'rgba(0,0,0,0.85)'}">{{ t('tentech') }}</h1>
              </div>
            </div>
            <div class="menu-space" :style="{width:menuList.length*90+'px',}">
              <div v-for="(menu,index) in menuList" class="menu-item"
                   @click="goToTargetPage(menu)"
                   @mouseenter="addUnderline(index)"
                   @mouseleave="removeUnderline(index);menu.subMenuVisible=false"
                   @mouseover="menu.subMenuVisible=true"
              >
                <p :style="{color:theme === 'nav-top' ? 'rgba(255,255,255)':'rgba(0,0,0,0.85)'}">{{ t(menu.name)}}</p>

                <div v-if="menu.subMeuns.length>0 "   class="sub-menu"
                     @mouseleave="menu.subMenuVisible=false"
                     @mouseover="menu.subMenuVisible=true"
                     :style="{height:menu.subMenuVisible? (menu.subMeuns.length*44+'px'):(0+'px')}"
                >
                  <div  v-for="(sub,subIndex) in menu.subMeuns" class="sub-menu-item"
                        @click="gotoTargetPageBySub(sub)"
                        :style="{opacity:menu.subMenuVisible? (1):(0),display:menu.subMenuVisible?(''):('none')}"
                  >
                    <p>{{ t(sub.name)}}</p>
                  </div>
                </div>

                <div v-if="isMenuUnderlined(index)" class="underline"
                     :style="theme === 'nav-top'?'background-color: rgba(0,0,0)':''"></div>
              </div>
            </div>
          </div>
          <div class="contact-right">
            <ul class="nav-right">
              <li v-if="showSearch" class="search-bar-container">
            <span class="nav-btn search-bar" :class="{ active: searchBarActive }"
                  @keyup.enter="search"
                  @mouseover="showSearchBar"
                  @mouseout="hideSearchBar" @blur="hideSearchBar">
               <input v-model="searchText" class="search-text" type="text" maxlength="100" >
              <span class="btn-search" @click="search">
                <img style="width: 23px" class="icon-search"    :src="theme === 'nav-top' ? 'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/search-icon1.svg':'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/search-icon.svg'">
              </span>
            </span>
              </li>
              <li v-if="showUser" class="user-bar">
                <router-link to="/login" class="nav-btn">
                  <img style="width: 31px" class="icon-search" :src="theme === 'nav-top' ?'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/user-icon1.svg':'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/user-icon.svg'">
                </router-link>
              </li>

              <li v-if="showUser" class="user-bar"
                  @click="openOrCloseSwitchLanguage"
              >
                <a class="nav-btn">
                  <img style="width: 33px" class="icon-search" :src="theme === 'nav-top' ? 'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/language.svg' :'https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/language1.svg'">
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <!--收纳式导航栏  -->
    <div class="drawer-nav" >
      <div class="nav-content"
           :style="{'background-color':theme==='nav-top'?'transparent':'#fff'}"
      >
        <div class="drawer-space1">
          <directory-button :theme="theme"
                            @click="openOrCloseDialog"
                            style="margin-left: 20px"
          ></directory-button>
        </div>
        <div class="drawer-space">
          <img src="../../assets/images/tentech-logo.png">
        </div>
        <div class="drawer-space">
          <div class="switch-button"
               :style="{'background-color':theme === 'nav-top' ? 'transparent':'#f3f3f3'}"
               @click="switchLanguages"
          >
            <p :style="{color:theme === 'nav-top' ? 'rgba(255,255,255)':'rgba(0,0,0,0.85)'}">{{LanguageComparison.get(currentLanguage)}}</p>
          </div>
        </div>
      </div>
      <div class="drawer-content"
           :style="isExpandMenu ? 'height:100%;width:100%;opacity: 1;overflow: auto;' : 'height:0px;width:0px;opacity: 0;'"
      >
        <div class="drawer-menu-space">
          <div v-for="(drawerMenu,drawerMenuIndex) in menuList" class="drawer-menu-item"
               :style="{height:drawerMenu.isExpand? (drawerMenu.subMeuns.length)*40+70+'px':'50px'}"
               @click="goToTargetPage(drawerMenu)"
          >
            <div class="menu-content" @click="goToExpandSubmenu(drawerMenu)">
              <div class="menu-button">
                <h1 :style="{'font-weight':drawerMenu.isExpand?'bold':''}">{{ t(drawerMenu.name)}}</h1>
                <img :style="drawerMenu.isExpand? 'transform: rotate(90deg);transition:transform 0.2s ease':'transform: rotate(0deg);transition:transform 0.2s ease'" src="../../assets/images/common/right-arrow-black.svg">
              </div>
            </div>
            <div class="sub-menu-space"
                 :style="{height:drawerMenu.isExpand?  (drawerMenu.subMeuns.length)*40+'px':'0px',opacity: drawerMenu.isExpand?'1':'0.8'}"
            >
              <div :style="{opacity: drawerMenu.isExpand?'1':'0',display:drawerMenu.isExpand?'':'none',height:drawerMenu.isExpand?'40px':'0px'}"
                   v-for="( sub , subIndex) in drawerMenu.subMeuns" class="drawer-sub-menu-item"
                   @click="gotoTargetPageBySub(sub)"
              >
                <p>{{t(sub.name)}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, watch, computed, onUnmounted, onUpdated} from "vue";
import allLanguage from "../../assets/ts/language";
import { useRoute, useRouter } from "vue-router";
import logo from "../../assets/logo"
import DirectoryButton from "../../components/directory-button.vue";
import {useI18n} from "vue-i18n";
const props = defineProps(['msg']);
const { t,locale } = useI18n();
const router = useRouter()
const route = useRoute()
const theme = ref('nav-top')
theme.value = 'nav-top'
const showSearch = ref(true);
const showUser = ref(true);
const showMall = ref(true);

console.log("theme",theme.value)

const languageList = ref(allLanguage.language)



function search() {
  if (!searchBarActive.value) {
    searchBarActive.value = true
  } else if (searchText.value) {
    router.push({
      path:`/search`,
      query:{search:searchText.value}
    })
    searchText.value=""
  }
}

const isSwitchLanguages=ref(false)


const currentLanguage = ref({})

function gotoSelectLanguage(la){
  locale.value = la.language
  currentLanguage.value=la
  this.openOrCloseSwitchLanguage()
  localStorage.setItem('language',la.language);    //最后缓存当前使用的语言
}

const LanguageComparison = ref(new Map())

const searchText = ref("")

function     hideSearchBar() {
  if (!searchText.value) {
    searchBarActive.value = false
  }
}

const searchBarActive  = ref(false)

const language = ref([])

function switchLanguages(languageItem){
/*  locale.value = languageItem.language
  currentLanguage.value=languageItem.language*/
}

function showSearchBar() {
  searchBarActive.value = true
}


function openOrCloseDialog() {
  isExpandMenu.value = !isExpandMenu.value;
  if (isExpandMenu.value){
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
  }else {
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = '0';
  }
}

function openOrCloseSwitchLanguage() {
  isSwitchLanguages.value = !isSwitchLanguages.value;
  if (isSwitchLanguages.value){
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





/*打开抽屉*/
const isExpandMenu = ref(false)

const isEnglishLanguage = ref(false)




function goToHome(){
  router.push({path:"/"})
}

function goToTargetPage(menu){
  router.push({path:menu.path})
}


function gotoTargetPageBySub(sub){
  if (sub.seriesId && sub.seriesId!==""){
    router.push({
      path: sub.path,
      query: { seriesId: sub.seriesId }
    }).then(() => {

    });
  }else {
    router.push({path:sub.path})
  }
}

function goToExpandSubmenu(drawerMenu){
  if (drawerMenu.subMeuns.length>0){
    const temp = drawerMenu.isExpand
    /*  this.list.forEach((menu)=>{
        menu.isExpand=false
      })*/
    drawerMenu.isExpand=!temp
  }
}

const whiteList = ref(["/login", "/reset-password","/sign-up"]); // 不需要渲染的名单

const relativeList  = ref(["/search"]);//不需要跟随导航栏名单

const menuList = ref([
  {
    name: 'menu.home',
    path: '/',
    subMenuVisible: false,
    isExpand:false,
    subMeuns: []
  },
  { name:  'menu.products',
    path: '/products',
    subMenuVisible: false,
    isExpand:false,
    subMeuns: [
      {name:"menu.rentalLEDDisplay",path:'/products',seriesId:"rental-led-display"},
      {name:"menu.fixedInstallLEDDisplay",path:'/products',seriesId:"fixed-install-led-display"},
      {name:"menu.fineSmallPixelLEDDisplay",path:'/products',seriesId:"fines-mall-pixel-led-display"},
      {name:"menu.transparentLEDDisplay",path:'/products',seriesId:"transparent-led-display"},
      {name:"menu.iposterLEDDisplay",path:'/products',seriesId:"iposter"},
      {name:"menu.creativeDisplay",path:'/products',seriesId:"creative-display"},
      {name:"menu.ledModule",path:'/products',seriesId:"led-module"},
      {name:"menu.ledDisplayAccessories",path:'/products',seriesId:"led-display-accessories"},
    ] },
  { name: 'menu.case',
    path: '/case',
    subMenuVisible: false,
    isExpand:false,
    subMeuns: [
/*      {name:"经典案例",path:'/series?seriesId=1',seriesId:""},
      {name:"行业应用",path:'/series?seriesId=1',seriesId:""},*/
    ] },
  { name: 'menu.service',
    path: '/service',
    subMenuVisible: false,
    isExpand:false,
    subMeuns: [
      {name:"menu.serviceGuide",path:'/service',seriesId:"guide"},
      {name:"menu.download",path:'/service',seriesId:"download"},
      {name:"menu.faq",path:'/service',seriesId:"faq"},
    ] },
  { name: 'menu.news',
    path: '/news',
    subMenuVisible: false,
    isExpand:false,
    subMeuns: [
      {name:"menu.news",path:'/news',seriesId:""},
      {name:"menu.exhibitionEvents",path:'/news',seriesId:""},
    ] },
  { name: 'menu.about',
    path: '/aboutus',
    isExpand:false,
    subMenuVisible: false,
    subMeuns: [
      {name:"menu.companyIntroduction",path:'/aboutus',seriesId:"companyIntro"},
      {name:"menu.brandQualifications",path:'/aboutus',seriesId:"certificate"},
      {name:"menu.teamServices",path:'/aboutus',seriesId:"24hours-service"},
      {name:"menu.delivery",path:'/aboutus',seriesId:"delivery"},
/*      {name:"社会责任",path:'/aboutus',seriesId:"responsibility"},*/
    ] },
  { name: 'menu.contact',
    path: '/contact',
    isExpand:false,
    subMenuVisible: false,
    subMeuns: [] }
]);

// 添加响应式数据
const menuState = reactive({
  underlinedMenuIndex: null,
});

// 添加鼠标悬停时显示下划线的函数
function addUnderline(index) {
  menuState.underlinedMenuIndex = index;
}

// 添加鼠标离开时移除下划线的函数
function removeUnderline(index) {
  menuState.underlinedMenuIndex = null;
}

// 判断是否显示下划线的函数
function isMenuUnderlined(index) {
  return menuState.underlinedMenuIndex === index;
}

//了解堒的路径
const isNewsDetailRoute = computed(() => {
  return route.path.startsWith('/newsitem');
});




const getHeaderStyle = computed(()=>{
  if (
      relativeList.value.includes(route.path)
  ) {
    //这里是不跟随路径
    return {
      position: 'relative',
    }
  }
})

const NoNeedFollowList = ref([])
const whiteBackgroundList=ref([]);


//需要导航栏
const needNav  = ref(false);

watch(
    () => router.currentRoute.value.path,
    (newValue) => {
      needNav.value  = false;
      needNav.value = !whiteBackgroundList.value.includes(newValue);//堒购买路径不在白名单中
    }
);



function setTheme(path: string){
  if (path === '/') {
    theme.value = 'nav-top'
  } else {
    theme.value = 'nav-bottom'
  }
}



function showSubMenu(index: string | number) {
  this.list[index].subMenuVisible = true;
}

function hideSubMenu(index: string | number) {
  this.list[index].subMenuVisible = false;
}

setTheme(route.path)

watch(() => route.path, (val) => {
  setTheme(val)
})


const screenHeight = ref(0);





onMounted(() => {
  needNav.value = !whiteList.value.includes(route.path);//购买路径
  language.value=allLanguage.language
  LanguageComparison.value=allLanguage.LanguageComparison
  window.addEventListener('scroll', () => {
    screenHeight.value=window.scrollY
    if (screenHeight.value>0||route.path !== '/'){
      theme.value = 'nav-bottom'
    }else {
      theme.value = 'nav-top'
    }
  })

  const navLang = navigator.language;    //判断当前浏览器使用的语言
  const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
  let lang = localStorage.getItem('language') || localLang || 'en-US';    //如果有缓存，取缓存的语言
  localStorage.setItem('language',lang);    //最后缓存当前使用的语言
  const parts = lang.split('-'); // 以-字符进行切割
  const resultLang = parts[0]; // 获取第一个部分
  locale.value = resultLang
  if (allLanguage.LanguageMap.get(resultLang)){
    currentLanguage.value=allLanguage.LanguageMap.get(resultLang)
  }
})
</script>

<style scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.relative-nav{
  position: relative;
}

.nav-space{
  background-color: transparent;
  width: 100%;
  transition: height 0.3s ease,width 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


nav{
  transition: all 0.3s ease;
  width: 1600px;
  max-width: 1800px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.left-space{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo-space{
  margin-right: 60px;
  cursor: pointer;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo-space>img{
  margin-right: 12px;
  height: 36px;
  object-fit: cover;
}

.logo-text{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.logo-text>h1{
  white-space: nowrap;
  /*  background: linear-gradient(to right, #2e7be5, #2e7be5, #2e7be5, #2e7be5, #2e7be5, #2e7be5, #2e7be5);
    -webkit-background-clip: text;
    color: transparent;*/
  font-size: 22px;
  font-weight: 700;
  font-style: italic; /* 将字体设置为斜体 */
}

.menu-space{
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.menu-item {
  z-index: 999;
  cursor: pointer;
  min-width: 100px;
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* 添加相对定位 */
}

.menu-item>p{
  font-weight: 700;
  transition: color 0.1s ease;
  font-size: 14px;
  color: rgba(0,0,0,0.85);
}

.sub-menu {
  border-radius: 8px;
  z-index: 999;
  position: absolute;
  top: 100%; /* 设置 sub-menu 在 menu-item 下方显示 */
  left: 50%; /* 将 sub-menu 水平偏移量设置为 50%，即居中对齐 */
  transform: translateX(-50%); /* 使用 translateX 实现水平居中对齐 */
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.75); /* 下划线颜色为黑色 */
  transition: opacity 0.3s ease,height 0.3s ease,display 0.3s ease; /* 添加渐变动画效果 */
  background-color: #fdfdfd;
  overflow: hidden;
}

.underline {
  position: absolute;
  bottom: 0;
  left: 50%; /* 将 sub-menu 水平偏移量设置为 50%，即居中对齐 */
  transform: translateX(-50%); /* 使用 translateX 实现水平居中对齐 */
  width: 80%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.75); /* 下划线颜色为黑色 */
  pointer-events: none; /* 防止下划线干扰鼠标事件 */
  opacity: 0; /* 初始时透明度为0，不显示下划线 */
  transition: opacity 0.2s ease; /* 添加渐变动画效果 */
  background-color: black;
}

.menu-item:hover .underline {
  opacity: 1; /* 鼠标悬停时显示下划线 */
}


.sub-menu-item{
  transition: opacity 0.3s ease,display 0.3s ease;
  height: 44px;
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sub-menu-item:hover{
  background-color: #f7f7f7;
}
.sub-menu-item>p{
  transition: color 0.1s ease;
  font-size: 14px;
}


.contact-right{
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.contact-right>img{
  opacity: 0.9;
  width: 32px;
  margin-right: 10px;
}
.contact-right>p{
  transition: color 0.1s ease;
  font-size: 19px;
  color: rgba(255,255,255);
  font-weight: bold;
}

.drawer-nav{
  display: none;
}

.nav-content{
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.nav-content{
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.drawer-space{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.drawer-space>img{
  height: 42px;
  object-fit: cover;
}
.drawer-space1{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.drawer-content{
  border-top: 1px solid rgba(0,0,0,0.15);
  margin-top: 70px;
  z-index: 999;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: height 0.3s, width 0.3s ease;
}
.drawer-menu-space{
  margin-top: 40px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.drawer-nav{
  display: none;
}
.drawer-menu-item{
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50px;
  transition: height 0.3s ease;
}
.menu-content{
  margin-top: 2px;
  z-index: 2;
  padding-left: 5%;
  padding-right: 5%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.menu-button{
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;
  display: flex;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.menu-button:hover{
  background-color: #f3f3f3;
}
.menu-button>h1{
  font-size: 13px;
}
.menu-button>h1:hover{
  font-weight: bold;
}
.menu-button>img{
  width: 14px;
}
.sub-menu-space{
  overflow: hidden;
  margin-left: 10px;
  z-index: 1;
  margin-top: 15px;
  transition: height 0.3s ease,opacity 0.6s ease;
  width: 90%;
  height: 1px;
  background-color: #f9f9f9;
}
.drawer-sub-menu-item{
  transition: opacity 0.9s ease,display 0.6s ease,height 0.3s ease;
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.drawer-sub-menu-item >p{
  margin-left: 13px;
  font-size: 13px;
  color: rgba(10,10,10,0.75);
}
.drawer-sub-menu-item >p:hover{
  margin-left: 13px;
  font-size: 13px;
  color: rgba(10,10,10,0.75);
}
.drawer-sub-menu-item:hover{
  background-color: #f1f1f1;
}


.search-bar-container {
  min-width: 40px;
}

.nav-btn{
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 16px;
  min-width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-btn:hover,
.nav-btn.active{
  transition: all 0.3s ease;
}

.nav-btn::before{
  position: absolute;
  width: 150%;
  height: 100%;
  top: 0;
  left: -150%;
  background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.2));
  transition: none;
  content: "";
}

.nav-btn:hover::before{
  transition: all 1.5s ease;
  left: 150%;
}

.nav-btn .iconfont{
  font-size: 22px;
}

.search-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 40px;
  width: auto;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  position: absolute;
  right: 0;
  top: 0;
}

.search-bar .btn-search {
  width: 40px;
  display: flex;
  justify-content: center;
}

input.search-text {
  border: 0 !important;
  font-size: 14px;
  line-height: 32px;
  height: 40px;
  width: 0;
  padding: 0;
  background-color: transparent;
  transition: width 0.3s ease-in-out;
}

input.search-text:focus {
  border: none;
  outline: none;
}

.search-bar.active {
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(241, 255, 255, 0.3);
  background-color: #bdbdbd;
}

.search-bar.active input.search-text {
  width: 200px;
  padding: 4px 0 4px 15px;
}

ul.nav-right {
  display: flex;
  align-items: center;
  z-index: 3;
}

ul.nav-right>li {
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;
}

.icon-search{
  width: 26px;
}
.switch-language-dialog{
  z-index: 9999999;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  overflow-y: auto;
}
.close-bg{
  z-index: 1;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0,0,0,0.65);
}
.switch-language-container{
/*  transform: translateY(15vh);*/
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
  padding: 20px 20px;
  z-index: 2;
  width: 65%;
  min-height: 80%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.switch-language-container>h1{
  font-size: 18px;
  font-weight: 550;
  opacity: 0.66;
}
.language-line{
  margin-top: 12px;
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,0.45);
}
.language-list-container{
  padding-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.language-item{
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
  width: calc(33.33% - 16px);
  margin-right: 24px;
  padding: 20px;
  background-color: #F7f7f7;
  margin-bottom: 24px;
}
.language-item:hover{
  box-shadow: 0 5px 4px rgba(0, 0, 0, 0.3);
}
.last-item{
  margin-right: 0;
}
.langSelected{
  box-shadow: 0 5px 4px rgba(0, 0, 0, 0.3);
}
@media screen and (max-width: 1800px){
  nav{
    width: calc(100% - 120px);
  }
}
@media screen and (max-width: 1260px){
  nav{
    width: calc(100% - 80px);
  }
}
@media screen and (max-width: 1024px){
  nav{
    width: calc(100% - 60px);
  }
}
@media screen and (max-width: 900px){
  nav{
    width: calc(100% - 50px);
  }
}

@media screen and (max-width: 767px) {
  nav{
    display: none;
  }
  .drawer-nav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
@media screen and (max-width: 767px){
  .menu-space{
    display: none;
  }
  .nav-content{
    height: 50px;
  }
}

@media screen and (max-width: 414px){

}

@media screen and (max-width: 376px){

}
</style>
