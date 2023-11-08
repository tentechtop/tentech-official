<template>
  <div class="container">
    <div class="open-dialog" v-if="openDialog">
      <div class="close-bg" @click="openDialog=false"></div>
      <div class="img-dialog">
        <img :src="currentImg">
      </div>
    </div>

    <div class="banner">
      <div class="products-desc">
        <h1>关于我们</h1>
        <div class="white-line"></div>
        <p>About US</p>
      </div>
      <div class="select-button-container">
        <div class="button-container">
          <div class="about-button" :class="{buttonSelected:ab.isSelected}" v-for="(ab,abIndex) in selectMenu"
          @click="gotoSelectButton(ab)">
            <p>{{ab.title}}</p>
            <div class="button-line"></div>
          </div>
        </div>
      </div>
    </div>
    <adaptive-container>
      <bread-crumb class="my-bread" :bread-crumb-list="breadCrumbList"></bread-crumb>
    </adaptive-container>
    <div class="intro-container" v-if="currentDisplay===1">
      <div class="company-intro">
        <div class="company-desc">
          <h1>全德视讯概况</h1>
          <p>公司成立于2012年，是一家专业从事全彩LED显示屏相关产品的高科技企业.我们主要提供室内外显示屏，租赁显示屏，广告机等等。公司总部位于深圳市光明新区，经营面积3000余平方米，具有批量化，规模化的生产能力。</p>
          <p>自公司创立以来就专注于LED显示屏领域的研究和生产，销售，租赁服务，致力于为客户提供全方位的解决方案。全德视讯拥有现代化的生产流水线，SMT高速贴片机，高温回流焊，灌胶机及标准化的产品老化生产线等现代化生产设备和检验设备，保证产品批量化，规模化生产和一流产品质量。</p>
          <p>全德视讯已通过国家专利认证，获得ISO9001:2008质量认证体系，产品均通过了CCC，FCC，CE，RoHS 等认证。产品覆盖工程模组，租赁，传媒等各个领域。</p>
          <p>全德视讯始终为客户提供全方位，多元化服务。产品出口美国，墨西哥，西班牙，澳大利亚，欧洲等国家，获得一致好评。在未来，公司将以十二分的热枕，继续为广大客户提供更好，更适合的显示屏解决方案。</p>
        </div>
      </div>
      <adaptive-container style="background-color: #f3f3f3">
        <div class="corporate-culture">
          <h1>企业文化</h1>
          <div class=" culture">
            <div class="company-desc culture-desc">
              <h2>创品牌、成大业——让“全德视讯”这颗盛大的种子广泛传播</h2>
              <p>服务理念：“我就是用户”</p>
              <p>经营理念：自主经营、稳健发展；持续创新、合作共赢</p>
              <p>发展要求：不给别人带来麻烦的做事原则、兢兢业业的工作作风、雷厉风行的工作态度、充满活力的精神面貌</p>
              <p>核心价值观：为客户创造价值、为员工创造机会、为社会创造效益、为股东成就梦想</p>
              <p>对自己负责、对家庭负责、对社会负责。</p>
            </div>
          </div>
        </div>
      </adaptive-container>
      <div class="certificate">
        <div class="certificate-img-bg">
          <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/city-182223_1920.jpg">
        </div>
        <h1>资质证书</h1>
        <div class="certificate-list-container">
          <div class="certificate-item" v-for="(ca,cIndex) in certificate"
               @click="openDialog=true;currentImg=ca.imgUrl">
            <img :src="ca.imgUrl">
            <h1>{{ca.title}}</h1>
          </div>
        </div>

      </div>
      <div class="company-photo">
        <h1>公司相册</h1>
        <div class="photo-container">
          <div class="photo-container1">
            <div class="photo-item">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/photo1.jpg">
              <div class="photo-title">
                公司前台
              </div>
            </div>
            <div class="photo-item">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/photo2.jpg">
              <div class="photo-title">
                螺丝机
              </div>
            </div>
          </div>
          <div class="photo-container2">
            <div class="photo-item photo-item-2">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/photo3.png">
              <div class="photo-title">

                销售区
              </div>
            </div>
          </div>
          <div class="photo-container1">
            <div class="photo-item">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/photo1.jpg">
              <div class="photo-title">
                SMT车间

              </div>
            </div>
            <div class="photo-item">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/photo2.jpg">
              <div class="photo-title">
                SMT车间
              </div>
            </div>
          </div>
        </div>


      </div>
      <adaptive-container class="partners-list-container">
        <div class="partners-content">
          <h1>PARTNER</h1>
          <div class="title-underline"></div>
          <h2>合作伙伴</h2>
          <div class="partners-space">
            <div v-for="(partner,PIndex) in partners" class="partner-item"
                 @mouseover="partner.isHover=true"
                 @mouseleave="partner.isHover=false">
              <img :style="partner.isHover? 'filter: brightness(0.7);':'filter: brightness(0.96);'" :src="partner.coverImgUrl">
              <div class="partner-desc">
                <p v-if="partner.isHover">{{partner.partnerName}}</p>
              </div>
            </div>
          </div>
        </div>
      </adaptive-container>
    </div>
    <div class="intro-container" v-if="currentDisplay===3">
      <certificate-component></certificate-component>
    </div>
    <div class="intro-container" v-if="currentDisplay===4">
      <hours-service></hours-service>
    </div>
    <div class="intro-container" v-if="currentDisplay===5">
      <delivery-com></delivery-com>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import {aboutPageStore} from "../../store/about";
const aboutPageInfo = aboutPageStore()
//引入获取实例
const router = useRouter()
const route = useRoute()
import {ref, onBeforeMount, watch} from "vue";
import AdaptiveContainer from "../../components/adaptive-container.vue";
import BreadCrumb from "../../components/bread-crumb.vue";
import CertificateComponent from "../../components/certificate-component.vue";
import HoursService from "../../components/hours-service.vue";
import DeliveryCom from "../../components/delivery-com.vue";



const pageInfo = ref({
  title: '关于全德视讯',
  description: '关于全德视讯'
});

document.title = pageInfo.value.title;
// 在组件加载后动态设置<meta>标签中的描述信息
const metaTag = document.querySelector('meta[name="description"]');
if (metaTag) {
  metaTag.setAttribute('content', pageInfo.value.description);
}



const currentDisplay = ref(1)

const openDialog = ref(false)
const partners = ref([
  {
    partnerName:"创联光电",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/01.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"诺瓦科技",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/02.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"希尔顿",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/03.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"国星光电",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/04.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"洲明",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/05.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"灵星雨科技",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/06.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"深圳北站",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/07.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"信达光电",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/08.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"利亚德",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/09.jpg",
    isSelected:false,
    isHover:false,
  },
  {
    partnerName:"明纬电子",
    coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/partners/10.jpg",
    isSelected:false,
    isHover:false,
  },
])

const currentImg = ref("")
const certificate = ref([
  {
    title:"CE , FCC .UL Certification",
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/certification.jpg",
  },
  {
    title:"ISO Certification",
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/certification1%20.jpg",
  },
])

const breadCrumbList = ref([
  {
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/home-icon.svg",
    name:"home",
    router:"/",
  },
  {
    imgUrl:"",
    name:"about us",
    router:"/aboutus",
  },
])

function gotoSelectButton(ab){
  selectMenu.value.forEach((ab)=>{
    ab.isSelected=false
  })
  ab.isSelected=true
  currentDisplay.value=ab.menuValue

  aboutPageInfo.updateCurrentDisplay(currentDisplay.value)
  if (ab.path){
    router.push({path:ab.path})
  }
}

const selectMenu = ref([
  {
    isSelected:true,
    title:"公司简介",
    path:null,
    menuName:"companyIntro",
    menuValue:1,
  },
  {
    isSelected:false,
    title:"资质证书",
    menuName:"certificate",
    path:null,
    menuValue:3,
  },
  {
    isSelected:false,
    title:"团队服务",
    path:"",
    menuName:"24hours-service",
    menuValue:4,
  },
  {
    isSelected:false,
    title:"物流运输",
    path:null,
    menuName:"delivery",
    menuValue:5,
  },
/*  {
    isSelected:false,
    title:"社会责任",
    path:"",
    menuName:"responsibility",
    menuValue:6,
  },*/
])


const currentRouteSeries = ref(route.query.seriesId)
console.log("通过路由获取的系列"+currentRouteSeries.value)
watch(route,(newValue)=>{
  if (route.path==='/aboutus' && newValue.query.seriesId){
    currentRouteSeries.value = newValue.query.seriesId
    selectMenu.value.forEach((ab)=>{
      ab.isSelected=false
    })
    selectMenu.value.find(se =>se.menuName === newValue.query.seriesId).isSelected=true
    currentDisplay.value=selectMenu.value.find(se =>se.menuName === newValue.query.seriesId).menuValue
    aboutPageInfo.updateCurrentDisplay(currentDisplay.value)
    console.log("watch设置全局变量"+currentRouteSeries.value)
  }
})

onBeforeMount(()=>{
  if (route.path==='/aboutus' && route.query.seriesId){
    selectMenu.value.forEach((ab)=>{
      ab.isSelected=false
    })
    selectMenu.value.find(se =>se.menuName === route.query.seriesId).isSelected=true
    currentDisplay.value = selectMenu.value.find(se =>se.menuName === route.query.seriesId).menuValue
    aboutPageInfo.updateCurrentDisplay(currentDisplay.value)
  }else if (aboutPageInfo.currentDisplay){
    selectMenu.value.forEach((ab)=>{
      ab.isSelected=false
    })
    selectMenu.value.find(se =>se.menuValue === aboutPageInfo.currentDisplay).isSelected=true
    currentDisplay.value = selectMenu.value.find(se =>se.menuValue === aboutPageInfo.currentDisplay).menuValue
  }else {

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
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/aboutus-bj.jpg");
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
.company-intro{
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/aboutus-bg1.jpg");
  background-size: cover;
}
.company-desc{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 30px;
  width: 50%;
  height: 100%;
  z-index: 10;
  background-image: linear-gradient(to right, rgba(240, 240, 240, 0.6), rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1));
}
.company-desc>h1{
  color: #000;
  font-size: 32px;
  font-weight: 400;
}
.company-desc>p{
  line-height: 30px;
  font-weight: 400;
  color: #000;
  font-size: 18px;
}
.corporate-culture{
  padding: 72px 0 32px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f3f3;
}
.corporate-culture>h1{
  font-size: 44px;
  margin: 16px 0;
}
.culture{
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: row;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/buildings-647400_1920.jpg");
  background-size: cover;
  justify-content: flex-start;

}
.culture-desc{
  height: auto;
  background-image: linear-gradient(to left,  rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1));
}
.certificate{
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 600px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.certificate-img-bg{
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.certificate >h1{
  color: #fff;
  z-index: 4;
  margin-bottom: 32px;
}
.certificate-img-bg>img{
  width: 100%;
  object-fit: cover;
  filter: brightness(0.5); /* 调整亮度值，0.7表示70%的亮度 */
}
.certificate-list-container{
  padding: 0 16px;
  z-index: 3;
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.certificate-item{
  margin: 0 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.certificate-item:hover{

  transform: translateY(-10px);
}
.certificate-item>h1{
  font-size: 16px;
  color: #fff;
}
.certificate-item>img{
  width: 200px;
  object-fit: cover;
}
.open-dialog{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  background-color: rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.close-bg{
  position: absolute;
  width: 100%;
  height: 100%;
}
.img-dialog{
  background-color: transparent;
  width: 40%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-dialog>img{
  width: 70%;
  object-fit: cover;
}
.company-photo{
  width: 100%;
  min-height: 800px;
  background-color: #eceaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.company-photo>h1{
  margin-top: 72px;
  font-size: 40px;

}
.photo-container{
  width: 100%;
  height: 750px;
  max-width: 1600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.photo-container1{
  background-color: #f3f3f3;
  width: calc(30% - 16px);
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.photo-container2{
  background-color: #f3f3f3;
  width: calc(40% - 16px);
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.photo-item{
  overflow: hidden;
  width: 100%;
  height: calc(50% - 16px);
  cursor: pointer;
}
.photo-item-2{
  height: 100%;
}

.photo-item>img{
  width: 100%;
  object-fit: cover;
}
.photo-item-2{
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.photo-item-2>img{
  height: 100%;
  object-fit: cover;
}
.photo-title{
  transition: all 0.3s ease;
  opacity: 0;
  width: 100%;
  height: 0;
  background-color: rgba(0,0,0,0.65);
  bottom: 0;
  position: sticky;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.photo-item:hover .photo-title{
  opacity: 1;
  height: 15%;
}
.partners-content{

  margin-bottom: 96px;
  padding-top: 96px;
  width: 100%;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.partners-content>h1{
  font-weight: bold;
  margin-bottom: 10px;
}
.partners-content>h2{
  font-weight: bold;
  margin-top: 10px;
  font-size: 20px;
  margin-bottom: 10px;
}
.partners-space{
  width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.partner-item{
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
  width: 19.5%;
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
.partners-list-container{
  background-color: #f3f3f3;
}
.intro-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.global{
  background-color: #FFF;
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

@media screen and (max-width: 1220px){
  .partners-space{
    width: 100%;
  }

  .img-dialog{
    background-color: transparent;
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .img-dialog>img{
    width: 70%;
    object-fit: cover;
  }
}

@media screen and (max-width: 1024px){
  .company-intro{
    height: auto;
  }
  .desc-container>h1{
    font-size: 14px;
  }
  .partner-item{
    width: 24.5%;
  }

  .company-desc{
    padding: 40px 30px;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .company-desc>h1{
    color: #000;
    font-size: 22px;
    font-weight: 400;
  }
  .company-desc>p{
    line-height: 30px;
    font-weight: 400;
    color: #000;
    font-size: 18px;
  }
  .corporate-culture{
    padding: 72px 0 32px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f3f3f3;
  }
  .corporate-culture>h1{
    font-size: 44px;
    margin: 16px 0;
  }
  .culture-desc{
    height: 100%;
  }

  .company-desc>h1{
    color: #000;
    font-size: 22px;
    font-weight: 400;
  }
  .company-desc>p{
    line-height: 30px;
    font-weight: 400;
    color: #000;
    font-size: 18px;
  }

  .culture-desc>h2{
    color: #000;
    font-size: 22px;
    font-weight: 400;
  }
  .culture-desc>p{
    line-height: 30px;
    font-weight: 400;
    color: #000;
    font-size: 18px;
  }


  .photo-container{
    transition: all 0.3s ease;
    width: 100%;
    height: auto;
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .photo-item{
    overflow: hidden;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .photo-container1{
    background-color: #f3f3f3;
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .photo-container2{
    background-color: #f3f3f3;
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .photo-item:hover .photo-title{
    display: none;
    opacity: 1;
    height: 0%;
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
  .partner-item{
    width: 33.33%;
  }

  .sidebar {
    display: none;

  }
  .help-list-container{
    padding: 10px;
    width: 100%;
  }
  .certificate-item{
    margin-right: 0;
  }
  .certificate-list-container{
    padding: 0 0px;
  }

  .certificate-img-bg>img{
    height: 100%;
    object-fit: cover;
    filter: brightness(0.5); /* 调整亮度值，0.7表示70%的亮度 */
  }
  .certificate-item{
    margin: 4px;

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
  .partner-item{
    width: 50%;
  }

}


</style>