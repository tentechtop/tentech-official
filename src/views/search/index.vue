<template>
  <div class="container">


    <adaptive-container>
      <div class="search-bar">
        <search-bar btn="查询" v-model="searchQuery" placeholder="请输入" maxlength="64" @search="search"></search-bar>
      </div>

      <div class="search-result-container">
        <div class="select-search-series-container">
          <div class="select-series-item" v-for="(se,sIndex) in selectSeriesList">
            <div class="reselect-container">
              <h1>{{se.seriesTitle}}</h1>
              <div class="reselect-button"
              @click="reselectSeries()"
              >重置</div>
            </div>
            <div class="split-line-series"></div>
            <div class="select-menu-item" v-for="(mi,mIndex) in se.menuList"
            @click="gotoSelectButton(mi,mIndex)"
            >
              <div class="select-dot" :class="{'selected-dot':mi.isSelected}"></div>
              <p>{{mi.menuTitle}}</p>
            </div>
          </div>
          <div class="select-series-item" style="margin-top: 28px">
            <div class="reselect-container">
              <h1>排序</h1>
              <div class="reselect-button"
              @click="reselectOrder()"
              >重置</div>
            </div>
            <div class="split-line-series"></div>
            <div class="select-menu-item" v-for="(oi,oIndex) in orderMenu"
            @click="gotoSelectOrder(oi)"
            >
              <div class="select-dot" :class="{'selected-dot':oi.isSelected}"></div>
              <p>{{oi.orderTitle}}</p>
            </div>
          </div>
        </div>
        <div class="search-result-list-container">
          <div class="reselect-container result-title-container"><h1>{{filteredProductList.length}} 个结果</h1></div>
          <div class="result-item-container">


            <div v-for="(result,rIndex) in disPlayProductList"  class="search-result-item">
              <h1>{{ startPage +rIndex+ 1 }}: {{result.productName}}</h1>
            </div>


            <div class="pager">
              <!--   一个系列的产品超过18个开始分页-->
              <pager  @change-current-page="handleCustomEvent" :current-page="currentPage"  :total="pageCount" :product-count="productCount"></pager>
            </div>
          </div>
        </div>
      </div>
    </adaptive-container>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted, onUpdated, watch, onBeforeMount} from 'vue';
import allProductInfoList from "../../assets/ts/product/product-all-info";
import {searchInfoStore} from "../../store/search";
const searchInfo = searchInfoStore()

import {useRoute,useRouter} from "vue-router";
import NavHeader from "../../components/NavHeader.vue";
import AdaptiveContainer from "../../components/adaptive-container.vue";
import SearchBar from "../../components/search-bar.vue";
import Pager from "../../components/pager.vue";
const route = useRoute()
const router = useRouter()





function gotoSelectButton(mi,mIndex){
  selectSeriesList.value[0].menuList.forEach(menuItem=>{
    menuItem.isSelected=false
  })
  mi.isSelected=true
}
function reselectSeries(){
  selectSeriesList.value[0].menuList.forEach(menuItem=>{
    menuItem.isSelected=false
  })
  selectSeriesList.value[0].menuList[0].isSelected=true
}
function gotoSelectOrder(oi){
  orderMenu.value.forEach(or=>{
    or.isSelected=false
  })
  oi.isSelected=true
}

function reselectOrder(){
  orderMenu.value.forEach(or=>{
    or.isSelected=false
  })
  orderMenu.value[0].isSelected=true
}
function search(text: any) {

  setTimeout(()=>{
    searchQuery.value = text
  },500)


}
const searchQuery = ref('');
const productInfoList = ref([])
const inputQuestionFaq = ref("")
const filteredProductList = computed(() => {
  return productInfoList.value.filter((product) => {
    const keyword = searchQuery.value.toLowerCase().trim();
    const productNameKeyword = product.productName.toLowerCase().includes(keyword);
    const productModelKeyword = product.productModel.toLowerCase().includes(keyword);
    return productNameKeyword || productModelKeyword;
  });
});
productInfoList.value=allProductInfoList.productInfo
searchQuery.value=route.query.search
watch(route,(newValue)=>{
  if (route.path==='/search' && route.query.search){
    searchQuery.value = route.query.search
    console.log("当前是"+searchQuery.value)
  }
})



const disPlayProductList = ref([])

const selectSeriesList = ref([
  {
    seriesTitle:"类别",
    isSelected:true,
    menuList:
        [
      {
        menuTitle:"全部分类",
        menuValue:0,
        isSelected:true,
      },
      {
        menuTitle:"Led显示屏",
        menuValue:1,
        isSelected:false,
      },
      {
        menuTitle:"显示屏配件",
        menuValue:2,
        isSelected:false,
      },
      {
        menuTitle:"铝合金箱体",
        menuValue:3,
        isSelected:false,
      },
      {
        menuTitle:"新闻",
        menuValue:4,
        isSelected:false,
      },
    ],
  },
])
const orderMenu = ref([
  {
    orderTitle:"相关性",
    keyValue:1,
    isSelected:true,
  },
  {
    orderTitle:"日期",
    keyValue:2,
    isSelected:false,
  },
])

const currentPage = ref(1)
const productCount = ref(0)
const pageCount =  ref(0)
const itemsPerPage = 20 // 每页显示的项目数量



watch(filteredProductList,(newValue)=>{
  productCount.value = newValue.length
  pageCount.value = Math.ceil(newValue.length / 20)
  console.log("startPage"+startPage.value,"endPage"+endPage.value)
  if (disPlayProductList.value.length<20){
    startPage.value = 0
    endPage.value = 20
  }
})

watch(disPlayProductList.value,(newValues)=>{
  if (disPlayProductList.value.length<20){
    searchInfo.startPage = 0
    searchInfo.endPage=20
    startPage.value = 0
    endPage.value = 20
  }
})

const startPage = ref(0)
const endPage = ref(20)

function handleCustomEvent(valueReceived){
  currentPage.value = valueReceived

  startPage.value = (currentPage.value - 1) * itemsPerPage
  endPage.value = startPage.value + itemsPerPage
  if (endPage.value>productCount.value){
    endPage.value = productCount.value
  }
  searchInfo.startPage = startPage.value
  searchInfo.endPage = endPage.value
  searchInfo.currentPage = currentPage.value

  disPlayProductList.value = filteredProductList.value.slice(startPage.value,endPage.value)

}


watch(searchQuery,(newValue)=>{
  disPlayProductList.value = filteredProductList.value.slice(startPage.value,endPage.value)

  if (newValue){
    console.log("newValue")
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
.search-bar {
  border-bottom: 1px solid #b9b9b9;
  width: 100%;
  padding: 48px 0;
  display: flex;
  justify-content: center;
}
.search-result-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}
.select-search-series-container{
  padding: 24px 0;
  width: calc(25% - 16px);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.search-result-list-container{
  width: calc(70% - 16px);
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.select-series-item{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.reselect-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.reselect-container>h1{
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
.reselect-button{
  color: #C7000B;
  cursor: pointer;
  padding: 4px 14px;
  font-weight: 700;
}
.split-line-series{
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,0.35);
}
.select-menu-item{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.select-menu-item>p{
  font-size: 18px;
}
.select-dot{
  cursor: pointer;
  margin: 8px 10px 6px 0;
  width: 17px;
  height: 17px;
  border: 1px solid rgba(0,0,0,0.15);
}
.selected-dot{
  outline: 1px solid rgba(0,0,0,0.35);
  border: 3px solid rgba(255,255,255);
  background-color: #C7000B;
}
.result-title-container{
  padding: 28px 0 16px 0;
}
.result-title-container>h1{
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  color: rgba(0,0,0,0.75);
}
.result-item-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.search-result-item{
  cursor: pointer;
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0,0,0,0.25);
}
.search-result-item>h1{
  font-size: 16px;
}
.pager{
  width: 100%;
}
</style>