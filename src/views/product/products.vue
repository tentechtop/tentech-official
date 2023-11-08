<template>
  <div class="container">
    <div class="banner">
      <div class="products-desc">
        <h1>{{ t('menu.products') }}</h1>
        <div class="white-line"></div>
        <p>{{t('tentech')}}</p>
      </div>
    </div>
    <div class="series-select-container">
      <div class="series-item"
           @click="isSelectSeries=!isSelectSeries">
        <h3>{{ t(currentSeriesName) }}</h3>
        <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/right-arrow-white.svg">
      </div>
    </div>
    <div class="series-table" :style="{height:isSelectSeries? (seriesList.length*48)+'px':'0px'}">
      <div v-for="(seriesSelectItem,SIndex) in seriesList" class="series-select-item"
           :style="{height:isSelectSeries? '48px':'0px',opacity:isSelectSeries? 1:0}"
           @click="goToExpand(seriesSelectItem,SIndex)">
        <h3>{{ t(seriesSelectItem.seriesTitle) }}</h3>
      </div>
    </div>
    <adaptive-container>
      <!--产品系列-->
      <bread-crumb class="my-bread" :bread-crumb-list="breadCrumbList"></bread-crumb>
      <div class="display-wrap">
        <div class="series-directory">
          <div class="desc-title">
            <h1>{{ t('menu.products') }}</h1>
            <p>{{t('tentech')}}</p>
          </div>
          <div class="series-menus">
            <div v-for="(item,index) in seriesList" class="series-menus-item" :class="{'series-active': item.isExpand}"
                 :style="{height:item.isExpand? 48+'px':'48px'}">
<!--              :style="{height:item.isExpand? (item.subMenus.length*48)+48+'px':'48px'}"-->
              <div class="menu-container" @click="goToExpand(item,index)">
                <h1>{{ t(item.seriesTitle) }}</h1>
                <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/right-arrow-icon1.svg">
              </div>
<!--              <div class="sub-menu-space"
                   :style="{ height: item.isExpand ? (item.subMenus.length) * 48 + 'px' : '0px', opacity: item.isExpand ? '1' : '0' }">
                <div v-for="(sub, subIndex) in item.subMenus" class="sub-menu"
                     :class="{'sub-menu-active': sub.isSelected, 'sub-menu-open': item.isExpand}"
                     :style="{ opacity: item.isExpand ? '1' : '0' }"
                     @click="changItemSelected(sub,index,subIndex,item)">
                  <h1 :style="sub.isSelected? 'color:rgba(0,0,0,1);font-weight: bold;':''">{{ sub.productName }}</h1>
                </div>
              </div>-->
            </div>
          </div>
        </div>
        <div class="product-content">
<!--          <div v-for="(product,pIndex) in productList" class="product-item" :class="{'last-item':(pIndex+1) % 3===0}"
               :style="{'background-image': `url(\' ${product.content.media[0].ResourcesUrl} \')`,
               'background-size':' cover','background-position': 'center'}">
          </div>-->
          <div class="product-list-container">
            <div v-for="(product,pIndex) in disPlayProductList" class="product-item" :class="{'last-item':(pIndex+1) % 3===0}"
                 @click="gotoProductDetail(product)"
            >
              <div class="img-container">
                <img :src="product.content.media[0].ResourcesUrl">
                <div class="mask"></div>
                <div class="gotoDetail">
                  <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/forward-o.svg">
                </div>
                <div v-if="product.isHotSell" class="is-hot-sell">hot</div>
              </div>
              <div class="product-title">
                <h1>{{t(product.productName)}}</h1>
              </div>
            </div>
          </div>
          <div class="pager">
          <!--   一个系列的产品超过18个开始分页-->
            <pager  @change-current-page="handleCustomEvent" :current-page="currentPage"  :total="pageCount" :product-count="productCount"></pager>
          </div>
        </div>
      </div>
    </adaptive-container>
  </div>
</template>

<script lang="ts" setup>
import {pageInfoStore} from "../../store/page";
const pageInfoS = pageInfoStore();
import {onBeforeMount, onMounted, onUpdated, ref, watch} from 'vue'
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
import {useI18n} from "vue-i18n";
const { t,locale } = useI18n();
import productAllInfo from "../../assets/ts/product/product-all-info";
const isSelectSeries = ref(false)

const currentSeriesName = ref("")
function gotoProductDetail(product){
  router.push({path:`/product/${product.productModel}`})
}

const seriesList = ref(productAllInfo.productAllInfo)
const currentPage = ref(pageInfoS.currentPage)
const itemsPerPage = 9 // 每页显示的项目数量
const maxPage = productAllInfo.productAllInfo[0].subMenus.length
const startPage = ref(pageInfoS.startPage)
const endPage = ref(pageInfoS.endPage)

const pageInfo = ref({
  title: '产品中心',
  description: '产品中心'
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

const disPlayProductList = ref([])
const productList = ref(productAllInfo.productAllInfo[0].subMenus.slice(startPage.value,endPage.value))
const productCount = ref(0)
const pageCount =  ref(0)

function handleCustomEvent(valueReceived){
  currentPage.value = valueReceived
  // 计算 startPage 和 endPage
  startPage.value = (currentPage.value - 1) * itemsPerPage
  endPage.value = startPage.value + itemsPerPage
  if (endPage.value>productCount.value){
    endPage.value = productCount.value
  }
  pageInfoS.startPage = startPage.value
  pageInfoS.endPage = endPage.value
  pageInfoS.currentPage = currentPage.value
  disPlayProductList.value = pageInfoS.currentProductList.slice(startPage.value,endPage.value)
}


function goToExpand(item, index) {
  const temp = item.isSelected
  seriesList.value.forEach((item) => {
    item.isSelected = false
    item.isExpand = false
    item.subMenus.forEach((sub) => {
      sub.isSelected = false;
    })
  })
  item.subMenus[0].isSelected = true
  item.isSelected = true
  item.isExpand = true
  productList.value=item.subMenus
  pageInfoS.updateProductList(item.subMenus)
  if (pageInfoS.currentProductList.length<9){
    pageInfoS.startPage = 0
    pageInfoS.endPage=9
    startPage.value = 0
    endPage.value = 9
  }
  disPlayProductList.value = pageInfoS.currentProductList.slice(startPage.value,endPage.value)
  productCount.value = pageInfoS.currentProductList.length
  console.log("产品对应的页数"+Math.ceil(pageInfoS.currentProductList.length / 9))
  pageCount.value = Math.ceil(pageInfoS.currentProductList.length / 9)
  isSelectSeries.value=!isSelectSeries.value

  currentSeriesName.value = item.seriesTitle
}




onUpdated(()=>{
  pageCount.value = Math.ceil(pageInfoS.currentProductList.length / 9)
})


const currentRouteSeries = ref(route.query.seriesId)
const currentRouteSeriesProductList = ref(productAllInfo.seriesProductMap.get(route.query.seriesId))



watch(disPlayProductList.value,(newValues)=>{
  if (disPlayProductList.value.length<9){
    pageInfoS.startPage = 0
    pageInfoS.endPage=9
    startPage.value = 0
    endPage.value = 9
  }
})

function changItemSelected(sub, index, subIndex,item) {
  const temp1 = seriesList.value[index].subMenus[subIndex].isSelected
  const temp = sub.isSelected;
  seriesList.value.forEach((item) => {
    item.isSelected = false;
    item.subMenus.forEach((sub) => {
      sub.isSelected = false;
    })
  })
  seriesList.value[index].isSelected = true
  sub.isSelected = !temp; // 设置选中的子菜单项为 true
  productList.value=item.subMenus
}


import AdaptiveContainer from "../../components/adaptive-container.vue";
import BreadCrumb from "../../components/bread-crumb.vue";
import ProductDirectTrain from "../../components/home/product-direct-train.vue";
import Pager from "../../components/pager.vue";
const breadCrumbList = ref([
  {
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/home-icon.svg",
    name:"home",
    router:"/",
  },
  {
    imgUrl:"",
    name:"Products",
    router:"/products",
  },
])



onBeforeMount(()=>{
  if (route.path==='/products' && currentRouteSeries.value){
    seriesList.value.forEach((see) => {
      see.isSelected = false
      see.isExpand = false
      see.subMenus.forEach((sub) => {
        sub.isSelected = false;
      })
    })
    seriesList.value.find(se => se.series === currentRouteSeries.value).subMenus[0].isSelected = true
    seriesList.value.find(se => se.series === currentRouteSeries.value).isSelected = true
    seriesList.value.find(se => se.series === currentRouteSeries.value).isExpand = true




    //找到 得通过 Series找到 productList
    const routeProductList = productAllInfo.seriesProductMap.get(currentRouteSeries.value)
    pageInfoS.updateProductList(routeProductList)
    if (pageInfoS.currentProductList.length<9){
      pageInfoS.startPage = 0
      pageInfoS.endPage=9
      startPage.value = 0
      endPage.value = 9
    }
    disPlayProductList.value = pageInfoS.currentProductList.slice(startPage.value,endPage.value)
    productCount.value = pageInfoS.currentProductList.length
    pageCount.value = Math.ceil(productCount.value / 9)
  }else {
    pageInfoS.addCurrentProductList(productAllInfo.productAllInfo[0].subMenus)
    disPlayProductList.value = pageInfoS.currentProductList.slice(startPage.value,endPage.value)
    productCount.value = pageInfoS.currentProductList.length
    pageCount.value = Math.ceil(productCount.value / 9)
    currentSeriesName.value = disPlayProductList.value[0].series
    console.log("无路由时"+currentSeriesName.value )
  }
})


watch(route,(newValue)=>{
  if (route.path==='/products' && newValue.query.seriesId){

    currentRouteSeries.value = newValue.query.seriesId
    currentRouteSeriesProductList.value = productAllInfo.seriesProductMap.get(currentRouteSeries.value)


    seriesList.value.forEach((see) => {
      see.isSelected = false
      see.isExpand = false
      see.subMenus.forEach((sub) => {
        sub.isSelected = false;
      })
    })
    seriesList.value.find(se => se.series === currentRouteSeries.value).subMenus[0].isSelected = true
    seriesList.value.find(se => se.series === currentRouteSeries.value).isSelected = true
    seriesList.value.find(se => se.series === currentRouteSeries.value).isExpand = true

    const routeProductList = productAllInfo.seriesProductMap.get(currentRouteSeries.value)
    pageInfoS.updateProductList(routeProductList)

    if (pageInfoS.currentProductList.length<9){
      pageInfoS.startPage = 0
      pageInfoS.endPage=9
      startPage.value = 0
      endPage.value = 9
    }
    disPlayProductList.value = pageInfoS.currentProductList.slice(startPage.value,endPage.value)
    productCount.value = pageInfoS.currentProductList.length
    pageCount.value = Math.ceil(productCount.value / 9)


    currentSeriesName.value = productAllInfo.seriesMap.get(currentRouteSeries.value).seriesName


  }
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
.banner{
  margin-top: 75px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/products/image/products-bj.jpg");
  background-size: cover;
  background-position: center;
  height: 300px;
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
  height: 300px;
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
.products-container{
  width: 100%;
  height: 250px;
  background-color: #2e7be5;
}
.my-bread{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.display-wrap{
  padding: 48px 0;
  min-height: 750px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
}
.series-directory{
  width: calc(25% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f3f3f3;
}

.product-content{
  position: relative;
  width: calc(75% - 20px);
  display: flex;
  flex-direction: column;
}

.product-list-container{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.pager{
  width: 100%;
}
.desc-title{
  width: 100%;
  padding: 30px 20px;
  background-color: #2e7be5;
}
.desc-title>h1{
  color: #fff;
}
.desc-title>p{
  color: #fff;
}

.series-menus {
  transition: all 0.3s ease;
  width: 100%;
  height: fit-content;
  background-color: white;
  position: sticky;
  display: flex;
  flex-direction: column;
}

.series-menus-item {
  cursor: pointer;
  height: 48px;
  width: 100%;
  transition: height 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.series-active > .menu-container > h1 {
  font-weight: bold;
}

.menu-container {
  width: 100%;
  height: 48px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: height 0.3s ease;
}

.menu-container > h1 {
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.95);
  font-size: 16px;
}

.menu-container > img {
  opacity: 0.75;
  transition: transform 0.2s ease;
  width: 30px;
  margin-right: 20px;
  transform: rotate(0deg);
}

.series-active > .menu-container > img {
  transform: rotate(90deg);
}

.sub-menu-space {
  overflow: hidden;
  width: 100%;
  transition: height 0.3s ease, opacity 0.6s ease;
}

.sub-menu {
  padding-left: 32px;
  height: 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sub-menu > h1 {
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
}

.product-item{
  position: relative;
  cursor: pointer;
  width: calc((100% / 3) - 16px);
  margin-right: 24px;
  margin-bottom: 16px;
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-container{
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border:1px solid rgba(0,0,0,0.20);
  overflow: hidden;
}
.mask{
  bottom: 15%;
  opacity: 0;
  transition: all 0.3s ease;
  height: 65%;
}
.gotoDetail{
  bottom: 50%;
  opacity: 0;
  transition: all 0s ease;
}
.gotoDetail>h1{
  color: #fff;
}
.gotoDetail>img{
  transform: translateX(-20px);
  width: 45px;
}
.img-container>img{
  transition: all 0.3s ease;
  width: 100%;
  object-fit: cover;
}
.last-item{
  margin-right: 0px;
}
.product-title{
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.product-title>h1{
  font-size: 14px;
}
.product-item:hover .img-container>img{
  transform: scale(1.1);

}
.product-item:hover .img-container .mask{
  opacity: 1;
  width: 100%;
  height: 85%;
  position: absolute;
  background-color: rgba(0,0,0,0.35);
}


.product-item:hover .img-container .gotoDetail{
  transition: all 0.3s ease;
  opacity: 1;
  position: absolute;
}

.product-item:hover .img-container .gotoDetail >img{
  transition: all 0.3s ease;
  transform: translateX(0px);
}
.is-hot-sell{
  position: absolute;
  top: 5%;
  left: 0;
  padding: 2px 5px;
  background-color: #F94825;
  color: #fff;
}

.series-select-container {
  display: none;
}

.series-table {
  display: none;
}


@media screen and (max-width: 1560px){
  .products-desc{
    padding: 0 16px;
  }
}

@media screen and (max-width: 1500px){
  .product-item{
    position: relative;
    cursor: pointer;
    width: calc(50% - 16px);
    margin-right: 16px;
    margin-bottom: 16px;
    height: 420px;
  }

}

@media screen and (max-width: 1260px){
  .series-directory{

  }
  .product-content{

  }
  .banner{
    height: 300px;
  }
  .banner::before {
    height: 300px;
  }
  .product-list-container{
    transform: translateX(8px);
  }
  .product-item{
    position: relative;
    cursor: pointer;
    width: calc(50% - 16px);
    margin-right: 16px;
    margin-bottom: 16px;
    height: 360px;
  }
  .last-item{
    margin-right: 16px;
  }
}


@media screen and (max-width: 1024px){
  .series-directory{
    width: calc(30% - 20px);
  }
  .product-content{

    width: calc(70% - 20px);
  }

  .product-item{
    position: relative;
    cursor: pointer;
    width: calc(50% - 16px);
    margin-right: 16px;
    margin-bottom: 16px;
    height: 300px;
    min-height: 200px;
  }
}

@media screen and (max-width: 850px){
  .series-directory{
    width: calc(35% - 20px);
  }
  .product-content{

    width: calc(65% - 20px);
  }

  .product-item{
    position: relative;
    cursor: pointer;
    width: calc(50% - 16px);
    margin-right: 16px;
    margin-bottom: 16px;
    height: 260px;
    min-height: 200px;
  }
}

@media screen and (max-width: 767px){

  .series-directory{
   display: none;
  }
  .product-content{

    width: 100%;
  }
  .product-item{
    height: 300px;
  }


  .series-select-container {
    padding-left: 24px;
    z-index: 998;
    top: 75px;
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    background-color: black;
  }

  .series-item {
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .series-item > h3 {
    color: white;
  }

  .series-item > img {
    width: 16px;
  }

  .series-table {
    transition: height 0.3s ease, opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    z-index: 997;
    top: 125px;
    position: fixed;
    background-color: #3b3e40;
    height: 500px;
    width: 100%;
  }

  .series-select-item {
    transition: all 0.3s ease;
    cursor: pointer;
    padding-left: 24px;
    border-bottom: 1px solid rgba(180, 180, 180);
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .series-select-item > h3 {
    font-size: 16px;
    font-weight: 100;
    color: white;
  }





}

@media screen and (max-width: 600px){
  .product-item{
    height: 240px;
  }
}


@media screen and (max-width: 480px){
  .product-list-container{
    transform: translateX(0px);
  }
  .series-directory{
    display: none;
  }
  .product-content{
    width: 100%;
  }
  .banner{
    height: 200px;
  }
  .banner::before {
    height: 200px;
  }
  .product-item{
    width: 100%;
    margin-right: 0px;
    height: 320px;
  }
  .last-item{
    margin-right: 16px;
  }

}
</style>
