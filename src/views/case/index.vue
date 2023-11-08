<template>
  <div class="container">
    <div class="banner">
      <div class="products-desc">
        <h1>{{ t('home.caseShow')}}</h1>
        <div class="white-line"></div>
        <p>CASE SHOW</p>
      </div>
      <div class="select-button-container">
        <div class="button-container">
          <div class="about-button" :class="{buttonSelected:ab.isSelected}" v-for="(ab,abIndex) in selectMenu"
               @click="gotoSelectButton(ab)">
            <p>{{ t(ab.title) }}</p>
            <div class="button-line"></div>
          </div>
        </div>
      </div>
    </div>

    <adaptive-container>
      <bread-crumb class="my-bread" :bread-crumb-list="breadCrumbList"></bread-crumb>

      <div v-if="currentDisplay===0" class="series-list-container">
        <div class="case-series-item" v-for="(cs,csIndex) in caseItemList" :class="{'no-margin-item':(csIndex +1) % 4 ===0}"
        @click="gotoSelectCaseSeries(cs,csIndex)"
        >
          <div class="img-container">
            <img :src="cs.imgUrl" alt="">
            <div class="img-mask">
              <h1>{{t(cs.name)}}</h1>
              <div class="detail-button">
                {{ t('common.detail') }}+
              </div>
            </div>
          </div>
          <div class="desc-container">
            <h1>{{ t(cs.name)}}</h1>
          </div>
        </div>
      </div>


      <div v-if="currentDisplay!==0" class="series-list-container">
        <div class="case-series-item" v-for="(cs,csIndex) in currentCaseList" :class="{'no-margin-item':(csIndex +1) % 4 ===0}"
             @click="gotoCaseDetail(cs)"
        >
          <div class="img-container">
            <img :src="cs.coverImgUrl" alt="">
            <div class="img-mask">
              <h1>{{t(cs.title)}}</h1>
              <div class="detail-button">
                {{ t('common.detail') }}+
              </div>
            </div>
          </div>
          <div class="desc-container">
            <h1>{{t(cs.title)}}</h1>
          </div>
        </div>
      </div>






    </adaptive-container>


  </div>
</template>

<script lang="ts" setup>
import {casePageStore} from "../../store/case";
const casePageInfo = casePageStore()
import AdaptiveContainer from "../../components/adaptive-container.vue";
import BreadCrumb from "../../components/bread-crumb.vue";
import {onBeforeMount, onMounted, ref} from 'vue'
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()


const pageInfo = ref({
  title: '成功案例',
  description: '成功案例'
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

const selectMenu = ref([
  {
    isSelected:true,
    title:"全部案例",
    value:0,
  },
  {
    isSelected:false,
    title:"安防监控",
    value:1,
  },
  {
    isSelected:false,
    title:"会议应用",
    value:2,
  },
  {
    isSelected:false,
    title:"展览展示",
    value:3,
  },
  {
    isSelected:false,
    title:"指挥调度",
    value:4,
  },
  {
    isSelected:false,
    title:"教育培训",
    value:5,
  },
])
import {useI18n} from "vue-i18n";
const { t,locale } = useI18n();
import caseList from "../../assets/ts/case/case"

const currentCaseList = ref()

function gotoCaseDetail(cs){
  router.push({path:`/casedetail/${cs.caseId}`})
}

function gotoSelectCaseSeries(cs,csIndex){
  let index = csIndex+1
  currentCaseList.value = cs.caseList
  casePageInfo.updateCurrentCaseList(currentCaseList.value)
  console.log("当前案例元素",cs.caseList)
  currentDisplay.value=index
  casePageInfo.updateCurrentDisplay(currentDisplay.value)
  console.log("当前按钮位置",index)
  selectMenu.value.forEach((s,i)=>{
    s.isSelected=false
  })
  selectMenu.value[index].isSelected = true
}

const currentDisplay = ref(0)
function gotoSelectButton(ab){
  selectMenu.value.forEach((ab)=>{
    ab.isSelected=false
  })
  ab.isSelected=true
  currentDisplay.value=ab.value
  console.log("当前元素位置",currentDisplay.value)
  if (ab.value!==0){
    currentCaseList.value=caseList.seriesItemMap.get(ab.value).caseList
    casePageInfo.updateCurrentCaseList(currentCaseList.value)
  }
  casePageInfo.updateCurrentDisplay(currentDisplay.value)
}

const caseItemList = ref(caseList.caseSeriesList)
console.log("caseItemList",caseItemList.value)

const breadCrumbList = ref([
  {
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/home-icon.svg",
    name:"home",
    router:"/",
  },
  {
    imgUrl:"",
    name:"case show",
    router:"/case",
  },
])

onBeforeMount(()=>{
  casePageInfo.addCurrentDisplay(0)
  selectMenu.value.forEach((ab)=>{
    ab.isSelected=false
  })
  selectMenu.value.find(se =>se.value === casePageInfo.currentDisplay).isSelected=true
  currentDisplay.value = casePageInfo.currentDisplay
  casePageInfo.addCurrentCaseList(currentCaseList.value)
  currentCaseList.value = casePageInfo.currentCaseList
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
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-bg.jpg");
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
.series-list-container{
  padding: 48px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.case-series-item{
  overflow: hidden;
  position: relative;
  cursor: pointer;
  width: calc(25% - 18px);
  margin-right: 24px;
  margin-bottom: 38px;
  background-color: #fff;
}
.no-margin-item{
  margin-right: 0;
}
.img-container{
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-container>img{
  transition: all 1s ease;
  z-index: 1;
  width: 100%;
  object-fit: cover;
}
.case-series-item:hover .img-container>img{
  transform: scale(1.05);
}
.img-mask{
  bottom: 0;
  left: 0;
  transition: all 0.3s ease;
  position: absolute;
  opacity: 0;
  width: 100%;
  z-index: 3;
  height: 0;
  background-color: rgba(0,0,0,0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-mask>h1{
  text-align: center;
  color: #fff;
  font-size: 22px;
}
.detail-button{
  transition: all 0.3s ease;
  margin-top: 14px;
  padding: 8px 16px;
  color: #fff;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255);
}
.detail-button:hover{
  background-color: #fff;
  color: #000;

}
.case-series-item:hover .img-mask{
  height: 100%;
  opacity: 1;
}
.desc-container{
  width: 100%;

}
.desc-container>h1{
  margin-top: 8px;
  text-align: center;
  font-size: 18px;
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
  .series-list-container{
    transform: translateX(9px);
  }
  .case-series-item{
    width: calc(33.33% - 18px);
    margin-right: 18px;
  }
  .no-margin-item{
    margin-right: 18px;
  }
  .desc-container>h1{
    font-size: 14px;
  }
}

@media screen and (max-width: 800px){
  .about-button{
    padding: 20px 20px;
    font-size: 14px;
  }
  .case-series-item{
    width: calc(50% - 18px);
    margin-right: 18px;
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
    padding: 20px 5px;
    font-size: 12px;
  }
  .case-series-item{
    width: 100%;
    margin-right: 0px;
  }
  .desc-container>h1{
    font-size: 14px;
  }
  .series-list-container{
    transform: translateX(0px);
  }
}

</style>