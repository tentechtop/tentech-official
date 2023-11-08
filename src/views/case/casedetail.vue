<template>
  <div class="container">
    <div class="banner">
      <div class="products-desc">
        <h1>{{ t('home.caseShow')}}</h1>
        <div class="white-line"></div>
        <p>{{t(caseDetail.title)}}</p>
      </div>
    </div>
    <adaptive-container>
      <bread-crumb class="my-bread" :bread-crumb-list="breadCrumbList"></bread-crumb>
      <div class="case-detail-container">
        <div class="case-info-container">
          <t-image  class="case-img" :src="caseDetail.coverImgUrl"></t-image>
        </div>
        <div class="recent-case-container">
          <h1>{{t(caseDetail.title)}}</h1>
          <div class="news-tag">
            <h1 class="tag">{{ t('common.date') }}:</h1>
            <h1>{{ getRandomDateInRange(2018, 2022) }}</h1>
          </div>
          <div class="split-line"></div>
          <div class="case-desc-container">
            <p v-html="getProductIntroHtml(t(caseDetail.htmlContent))"></p>
            <div class="sign-container">
              <p>TenTech 全德视讯</p>
            </div>
          </div>
        </div>
      </div>
    </adaptive-container>
  </div>
</template>

<script lang="js" setup>
import {useI18n} from "vue-i18n";
const { t,locale } = useI18n();
import {onBeforeMount, onMounted, ref,computed} from 'vue'
import { useRoute, useRouter } from "vue-router";
//引入获取实例
const router = useRouter()
const route = useRoute()
import caseList from "../../assets/ts/case/case"
import AdaptiveContainer from "../../components/adaptive-container.vue";
import BreadCrumb from "../../components/bread-crumb.vue";
import NavHeader from "../../components/NavHeader.vue";
import TImage from "../../components/tentech/t-image.vue";


function getRandomDateInRange(startYear, endYear) {
  // 生成随机年份在指定范围内
  const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  // 生成随机月份（1 到 12）
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  // 生成随机日期（1 到 31，不考虑特定月份的天数）
  const randomDay = Math.floor(Math.random() * 31) + 1;
  // 将年、月、日格式化成字符串
  const year = String(randomYear);
  const month = String(randomMonth).padStart(2, '0');
  const day = String(randomDay).padStart(2, '0');
  // 组合成日期字符串
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}



function getProductIntroHtml(thtml){
  let html = thtml.replace(/\n/g, '<br>','<router-link>').replace(/<img/g, '<img style="width: 100%;object-fit:cover;margin:10px 0"')
  return html
}

const caseId = ref(parseInt(route.params.caseId))
console.log("caseId是",caseId.value)
const caseDetail = ref(caseList.caseDetailMap.get(parseInt(route.params.caseId)))
console.log("caseDetail",caseDetail.value)

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
breadCrumbList.value.push({
  imgUrl:"",
  name:caseDetail.value.title,
  router:`/casedetail/${caseDetail.value.caseId}`,
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
.case-detail-container{
  width: 100%;
  margin: 48px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}
.case-info-container{
  width: calc(50% - 16px);
  min-height: 400px;
}
.case-img{
  width: 100%;
  height: 0;
  padding-bottom: 80%;
  object-fit: cover;
}

.recent-case-container{
  width: calc(50% - 16px);
  min-height: 300px;
}
.recent-case-container>h1 {
  line-height: 1.5;
  font-size: 32px;
  font-weight: 500;
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
.case-desc-container{
  width: 100%;
}
.case-desc-container>p{
  color: #000;
}
.sign-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.sign-container>p{
  color: #000;
  font-style:italic;
  font-size: 18px;
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

@media screen and (max-width: 767px){
  .case-detail-container{
    flex-direction: column;
  }
  .case-info-container{
    width: 100%;
  }
  .recent-case-container{
    width: 100%;
  }
  .banner{
    min-height: 300px;
  }
  .banner::before {
    min-height: 300px;
  }
}

@media screen and (max-width: 480px){
  .case-detail-container{
    width: 100%;
    margin: 48px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .case-info-container{
    width: 100%;
    min-height: 300px;
  }
  .recent-case-container{
    margin-top: 16px;
    width: 100%;
    min-height: 300px;
  }
  .recent-case-container>h1 {
    font-size: 24px;
  }
}

</style>