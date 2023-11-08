<template>
  <div class="container">

    <div v-if="isOPenInputEmailWindows" class="input-email-windows-container">
      <div class="close-bg" @click="openInputEmailWindows()"></div>
      <div class="input-email-windows">
        <div class="send-email-container send-email-bg"></div>
        <div class="send-email-container">

          <div v-if="!isSendEmailInfo" class="is-seng-email-info-container">
            <h1>通过电话或者邮箱联系我们</h1>
            <div class="email-info-item-container">
              <input v-model="leaveMessage.name" placeholder="请输入您的姓名">
            </div>
            <div class="email-info-item-container">
              <input v-model="leaveMessage.phone" placeholder="请输入您的联系电话">
            </div>
            <div class="email-info-item-container">
              <input  v-model="leaveMessage.email" placeholder="请输入您的邮箱">
            </div>
            <div class="email-info-item-container">
              <input v-model="leaveMessage.company" placeholder="请输入您的公司名称">
            </div>
            <div class="email-info-item-container">
              <textarea v-model="leaveMessage.questions" placeholder="咨询内容"></textarea>
            </div>
            <div class="submit-email-detail-button" @click="saveMessage">
              <p>提交</p>
            </div>
          </div>

          <div v-if="isSendEmailInfo" class="is-seng-email-info-container">
            <div class="submit-success-container">
              <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/check.svg">
            </div>
            <h1>提交成功</h1>
            <p>感谢你对全德视讯的关注与支持</p>
            <div class="submit-email-detail-button"  @click="gotoCloseEmailSendWindows()">
              <p>关闭</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="banner">
      <div class="products-desc">
        <h1>{{ t(seriesName) }}</h1>
        <div class="white-line"></div>
        <p>全德视讯 tentech</p>
      </div>
    </div>
    <adaptive-container>
      <bread-crumb class="my-bread" :bread-crumb-list="breadCrumbList"></bread-crumb>
      <div class="display-wrap">
        <div class="product-media-container">
          <div class="swiper-container">
            <product-img-swiper  :resource-list="product.content.media"></product-img-swiper>
          </div>
        </div>
        <div class="product-desc-container">
          <h1>{{ t(product.productName) }}</h1>
          <div class="title-line"></div>
          <div class="product-desc-card">
            <div class="product-desc-containers product-desc">
              <div class="product-title-desc">
                <div class="desc-item"><h2>{{ t('common.Brand') }}</h2><p>{{ t(product.content.productDescInfo.brand) }}</p></div>
                <div class="desc-item"><h2>{{ t('common.ProductOrigin') }}</h2><p>{{ t(product.content.productDescInfo.productOrigin) }}</p></div>
                <div class="desc-item"><h2>{{t('common.DeliveryTime')}}</h2><p>{{ t(product.content.productDescInfo.deliveryTime) }}</p></div>
                <div class="desc-item"><h2>{{t('common.SupplyCapacity')}}</h2><p>{{ t(product.content.productDescInfo.supplyCapacity) }}</p></div>
              </div>
              <div class="advantage-desc">
                <div v-for="(ad,adIndex) in product.content.productDescInfo.description" class="ad-item">
                  <p v-if="ad.title!==''">{{ t(ad.title) }}:</p><p>{{t(ad.value)}}</p>
                </div>
              </div>
              <div class="contact-container">
                <div class="email-button"
                     @click="openInputEmailWindows()"
                >
                  <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/email-icon-button.svg">
                  <p>{{ t('EMail') }}</p>
                </div>
                <a class="download-button" :href="product.content.manual.downloadUrl" target="_blank">
                  <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/download-button-icon.svg">
                  <p>{{ t('Download') }}</p>
                </a>
              </div>
            </div>

          </div>
          <div class="product-specs-card">
            <p>{{t('common.productDesc')}}</p>
          </div>

<!--          <div class="buy-product-phone-number">
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/server-icon.svg">/<p>13510406359</p>
          </div>-->
        </div>
      </div>
      <div class="product-show">
        <div class="featured-products">
          <div class="products-menu-container">
            <div class="directory-title-banner"><p>{{t('featuredProducts')}}</p></div>
            <div class="directory-menu-container featured">
              <div v-for="(fp,fpIndex) in featuredProductsMenu"  class="featured-product-item" :class="{'hover-item':fp.isHover}"
                   @click="gotoTargetProduct(fp)"
                   @mouseover="fp.isHover=true"
                   @mouseleave="fp.isHover=false">
                <div class="img-scale-container">
                  <img :src="fp.imgUrl">
                </div>
                <div class="featured-product-intro-container">
                  <p>{{fp.productName}}</p>
                  <div class="detail-button">
                    <p>detail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div class="products-intro">
          <div class="directory-title-banner"><p>{{ t('common.productDescription') }}</p></div>
          <div class="product-media-intro-container">
            <p v-html="getProductIntroHtml( t(product.content.intro.specs))"></p>
            <p style="line-height: 25px;font-size: 15px;margin-top: 16px" class="warrenty-terms" v-html="t(product.content.intro.warrentyTerms).replace(/\n/g, '<br>','<router-link>')"></p>
          </div>
          <div class="related-products">
            <div class="related-products-button">
              {{ t('common.relatedProducts')}}
            </div>
          </div>
          <div class="related-product-container">
            <div v-for="(ri,rIndex) in filteredSeriesProductData"  class="related-item"
            @click="gotoSetRelateProduct(ri)"
            >
              <t-image class="related-item-img" scale="true" :src="ri.content.media[0].ResourcesUrl"></t-image>
              <p>{{ t(ri.productName)}}</p>
            </div>
          </div>

          <div class="product-tag-container">
            <div class="tag-item">
              {{ t('common.tag') }}:
            </div>
            <div v-for="(tag,tIndex) in product.content.tag" class="tag-item">
              {{t(tag.tagTitle)}}
            </div>
          </div>

        </div>
      </div>
    </adaptive-container>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n()
import {onBeforeMount, onMounted, ref, computed, onUpdated, onBeforeUnmount} from 'vue'
import { useRoute, useRouter } from "vue-router";
import kwValidate from "../../assets/js/t-validate.js";
//引入获取实例
const router = useRouter()
const route = useRoute()
import AdaptiveContainer from "../../components/adaptive-container.vue";
import productAllInfo from "../../assets/ts/product/product-all-info";
import BreadCrumb from "../../components/bread-crumb.vue";
import ProductImgSwiper from "../../components/product/product-img-swiper.vue";
import TImage from "../../components/tentech/t-image.vue";
import {md} from "../../assets/libs/markdown";

const isOPenInputEmailWindows = ref(false)
const productModel = ref(route.params.model)
console.log("型号是",productModel.value)
function getProductIntroHtml(thtml){
  let html = thtml.replace(/\n/g, '<br>','<router-link>').replace(/<img/g, '<img style="width: 100%;object-fit:cover;margin:10px 0"')
  return html
}
const isSaving = ref(false)

const leaveMessage = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  questions: ''
})

function gotoCloseEmailSendWindows(){
  openInputEmailWindows()
  isSendEmailInfo.value = false
  leaveMessage.value = {
    name: '',
    company: '',
    email: '',
    phone: '',
    questions: ''
  }
}

const submitMessage = ref({
  message:"",
  bgColor:"",
  borderRadius:""
})
const isShowMessage = ref(false)
const rules = ref({
  name: {
    rules: [{
      required: true,
      errorMessage: t('rules.required')
    }],
    label: t('contact.label.name'),
    validateTrigger: 'submit'
  },
  company: {
    rules: [
    ],
    label: t('contact.label.company'),
    validateTrigger: 'submit'
  },
  email: {
    rules: [{
      required: !locale.value.startsWith('zh'),
      errorMessage: t('rules.required')
    },
      {
        format: "email",
        errorMessage: t('rules.email')
      }],
    label: t('contact.label.email'),
    validateTrigger: 'submit'
  },
  phone: {
    rules: [{
      required: locale.value.startsWith('zh'),
      errorMessage: t('rules.required')
    },
      {
        format: "telphone",
        errorMessage: t('rules.telphone')
      },
    ],
    label: t('contact.label.phone'),
    validateTrigger: 'submit'
  },
  questions: {
    rules: [{
      required: true,
      errorMessage: t('rules.required')
    }],
    label: t('contact.label.questions'),
    validateTrigger: 'submit'
  }
})
async function saveMessage() {
  if (isSaving.value) {
    return
  }
  const data = {
    name: leaveMessage.value.name.trim(),
    company: leaveMessage.value.company.trim(),
    email: leaveMessage.value.email.trim(),
    phone: leaveMessage.value.phone.trim(),
    questions: leaveMessage.value.questions.trim()
  }

  const res = kwValidate.validate(data, rules.value)
  if (!res.isOk) {
    submitMessage.value.message = res.errorMessage
    submitMessage.value.bgColor = "#FF3366"
    submitMessage.value.borderRadius = "1px solid #CC3333"
    isShowMessage.value = true
    setTimeout(()=>{
      isShowMessage.value = false
    },3000)
    return
  }
  isSaving.value = true
  isShowMessage.value = false



  const response = await axios.post('https://formspree.io/f/xknleoaj', {
    data,
  }).then((res)=>{
    isSendEmailInfo.value=true


    isSaving.value = false
    leaveMessage.value.name = ""
    leaveMessage.value.company = ""
    leaveMessage.value.email = ""
    leaveMessage.value.phone = ""
    leaveMessage.value.questions = ""
    submitMessage.value.message = "Success"
    submitMessage.value.bgColor = "#FFF"
    submitMessage.value.borderRadius = "1px solid #99FF99"
    isShowMessage.value = true
    setTimeout(()=>{
      isShowMessage.value = false
    },3000)
  })

}


const isSendEmailInfo = ref(false)
function openInputEmailWindows(){
  isOPenInputEmailWindows.value = !isOPenInputEmailWindows.value
  if (isOPenInputEmailWindows.value) {
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

function gotoTargetProduct(fp){
  router.push({path:`/product/${fp.productModel}`})
}

function gotoSetRelateProduct(ri){
  router.push({path:`/product/${ri.productModel}`})
}

const featuredProductsMenu = ref([
  {
    isHover:false,
    isSelected:false,
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-01.jpg",
    productName:"Led Iposter For Shoppping Mall",
    productModel:"led-iposter-for-shoppping-mall",
    series:"iposter",
  },
  {
    isHover:false,
    isSelected:false,
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-02.jpg",
    productName:"1.25 Small Pixel Fixed Installation Indoor Screen",
    productModel:"125-small-pixel-fixed-installation-indoor-screen",
    series:"fines-mall-pixel-led-display",
  },
  {
    isHover:false,
    isSelected:false,
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-03.jpg",
    productName:"Show Window Led Transprent Display Screen",
    productModel:"show-window-led-transprent-display-screen",
    series:"transparent-led-display",
  },
  {
    isHover:false,
    isSelected:false,
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-04.jpg",
    productName:"Customized Shape Screen",
    productModel:"customized-shape-screen",
    series:"creative-display",
  },
])

const productDescInfo = ref({
  brand:"TENTECH",
  productOrigin:"CHINA",
  supplyCapacity:"100 SQM PER DAY",
  deliveryTime:"3-5DAYS",
  description:[
    {title:"",value:"1.Special Design This Panel has both 500*500mm and 500*1000mm verstion,and the two verstion can be used togother.Has achieve Front and rear maintenance.Rental Stage Indoor LED Screen 3.91 Video Full Color Led Panel Display/Screen LED Panel"},
    {title:"",value:"2.Exquisite Craft The curve lock it adopts is very easy to operate,both concave and convex is available,the manufacturing is precise amd accurate"},
    {title:"3.Excellent Quality",value:"Our field-tested LED panel is a self-contained, modular unit made of die-casting aluminum to provide superior heat dissipation,durability, and a longer lifespan. Unlike most digital signs, ours have no fans. This unique product meets strict quality controland is backed by a three year warranty."},
  ],
})
const breadCrumbList = ref([
  {
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/home-icon.svg",
    name:"home",
    router:"/",
  },
  {
    imgUrl:"",
    name:t("Products"),
    router:"/products",
  },
  {
    imgUrl:"",
    name:"Products",
    router:"/products",
  },
])

const product = ref(productAllInfo.productMap.get(route.params.model))
const series = ref(productAllInfo.productMap.get(route.params.model).series)
const seriesName = ref(productAllInfo.seriesMap.get(series.value).seriesName)


const seriesProduct = ref(productAllInfo.seriesProductMap.get(series.value))
const filteredSeriesProductData = ref([]);
for (let i = 0; i < seriesProduct.value.length; i++) {
  if (seriesProduct.value[i].productModel!==route.params.model){
    filteredSeriesProductData.value.push(seriesProduct.value[i])
  }
}
filteredSeriesProductData.value=filteredSeriesProductData.value.slice(0,4)
breadCrumbList.value[2].router=`/product/${productModel.value}`
breadCrumbList.value[2].name=t(product.value.productName)

onUpdated(()=>{
  product.value = productAllInfo.productMap.get(route.params.model)
  series.value = productAllInfo.productMap.get(route.params.model).series
  seriesName.value = productAllInfo.seriesMap.get(series.value).seriesName

  seriesProduct.value = productAllInfo.seriesProductMap.get(series.value)
  filteredSeriesProductData.value = []
  for (let i = 0; i < seriesProduct.value.length; i++) {
    if (seriesProduct.value[i].productModel!==route.params.model){
      filteredSeriesProductData.value.push(seriesProduct.value[i])
    }
  }
  filteredSeriesProductData.value=filteredSeriesProductData.value.slice(0,4)
  breadCrumbList.value[2].router=`/product/${productModel.value}`
  breadCrumbList.value[2].name=product.value.productName



})


onBeforeUnmount(()=>{
  if(isOPenInputEmailWindows.value){
    openInputEmailWindows()
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
  min-height: 300px;
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
  min-height: 300px;
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
.my-bread{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.display-wrap{
  position: relative;
  height: 100%;
  padding: 48px 0;
  min-height: 650px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.product-media-container{
  position: relative;
  height: 600px;
  width: calc(55% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.swiper-container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.product-desc-container{
  width: calc(45% - 20px);
  display: flex;
  flex-direction: column;
}
.product-desc-container>h1{
  font-size: 22px;
  font-weight: 700;
}
.title-line{
  margin: 12px 0;
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,0.35);
}
.product-specs-card{
  margin-top: 16px;
  width: 100%;
  padding: 20px 30px;
  background-color: #f3f3f3;
}
.product-specs-card>p{
  color: rgba(0,0,0,0.55);
}
.product-desc-card{
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.buy-product-phone-number{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 24px;
}
.buy-product-phone-number>img{
  width: 35px;
  margin-right: 16px;
}
.buy-product-phone-number>p{
  margin-left: 16px;
  color: black;
  font-size: 24px;
}
.product-desc-containers{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.product-desc{
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
}
.product-desc>h1{
  margin-top: 16px;
  font-size: 24px;
  color:#2585E0;
}
.product-title-desc{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.desc-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.desc-item>h2{
  margin-right: 16px;
  font-size: 16px;
  color:#000;
  font-weight: 700;
}
.desc-item>p{
  font-size: 16px;
  color:#000;
}
.advantage-desc{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.ad-item{

}
.ad-item>p{
  line-height: 23px;
  opacity: 0.75;
  font-size: 15px;
  color: #000;
}
.contact-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.email-button{
  margin-right: 16px;
  cursor: pointer;
  padding: 2px 18px;
  color: white;
  background-color: #2e7be5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.email-button>img{
  margin-right: 8px;
  width: 20px;
}
.email-button>p{
  color: white;
}
.download-button{
  cursor: pointer;
  padding: 2px 18px;
  color: white;
  background-color: #838181;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.download-button:hover{
  background-color: #646464;
}
.download-button:active{
  background-color: #5e5c5c;
}
.download-button>img{
  margin-right: 8px;
  width: 20px;
}
.download-button>p{
  color: white;
}
.product-show{
  position: relative;
  height: 100%;
  min-height: 750px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}
.featured-products{
  min-height: 750px;
  height: 100%;
  width: calc(30% - 16px);
  display: flex;
  flex-direction: column;
}
.products-intro{
  min-height: 750px;
  height: 100%;
  width: calc(70% - 16px);
  background-color:#f3f3f3 ;
}
.related-products{
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}
.related-products-button{
  white-space: nowrap;
  padding: 3px 18px;
  background-color: #000304;
  color: white;
}
.related-products-line{
  width: 90%;
  height: 1px;
  background-color: #000304;
}
.related-product-container{
  padding-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
  background-color: #fff;
}
.related-item{
  cursor: pointer;
  margin-right: 21px;
  width: calc(25% - 16px);
  min-height: 240px;

}
.related-item-img{
  width: 100%;
  height: calc(100% - 40px);
}
.related-item>p{
  padding: 0 8px;
  font-size: 12px;
  color: #000;
}

.products-menu-container{
  width: 100%;
  margin-bottom: 32px;
  background-color:#f3f3f3 ;
}
.directory-title-banner{
  width: 100%;
  padding: 10px 10px;
  min-height: 50px;
/*  background-color: #191919;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.directory-title-banner>p{
  font-size: 24px;
  font-weight: 700;
  color: #2585E0;
}

.directory-menu-container{
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.featured{
  background-color:#f3f3f3 ;
}

.featured-product-item{
  padding: 5px;
  cursor: pointer;
  margin-bottom: 16px;
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}


.img-scale-container{
  margin-right: 16px;
  max-width: calc(50% - 8px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.img-scale-container>img{
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-product-intro-container{
  height: 100%;
  max-width: calc(50% - 8px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

}
.featured-product-intro-container>p{
  color: #000;
}


.detail-button{
  transition: all 0.3s ease;
  margin-top: 8px;
  padding: 6px 20px;
  background-color: #444444;
}



.hover-item .img-scale-container>img{
  transform: scale(1.1);
}
.hover-item .featured-product-intro-container>p{
  color: #2585E0;
}
.hover-item .detail-button{
  background-color: #2585E0;
  transform: translateY(5px);
}
.product-media-intro-container{
  padding: 0 10px;
  padding-bottom: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.product-media-intro-container>p{
  font-size: 14px;
  padding: 0;
  color: #000;
  margin: 0;
  line-height: 14px;
}


.warrenty-terms{
  font-size: 14px;
  padding: 0;
  color: #000;
  margin: 0;
  line-height: 18px;
}
.product-tag-container{
  background-color: #fff;
  padding: 16px 0 16px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
}

.tag-item{
  font-weight: 100;
  cursor: pointer;
  margin-bottom: 8px;
  font-size: 14px;
  margin-right: 6px;
  padding: 4px 8px;
  color: #000;
  opacity: 0.75;
}
.tag-item:first-child{
  opacity: 1;
}

.input-email-windows-container{
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
.close-bg{
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
}
.input-email-windows{
  border-radius: 10px;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/background/seng-email-bg1.png");
  background-size: cover;
  z-index: 2;
  width:50%;
  min-width: 960px;
  height: 550px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
.send-email-container{
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
}
.send-email-container>h1{
  font-size: 30px;
  color: rgba(0,0,0,0.75);
}
.is-seng-email-info-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.is-seng-email-info-container>p{
  color: #000;
}
.send-email-bg{
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/background/send-email-bg.png");
  background-size: cover;
}
.email-info-item-container{
  padding: 2px;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 2px;
  border-radius: 5px;
  overflow: hidden;
}
.email-info-item-container>p{
  color: #000;
  font-size: 16px;
}

.email-info-item-container>input{
  border-radius: 5px;
  color: #000;
  background-color: #fff;
  padding: 0 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  border: none;
  outline: none;
  height: 46px;
  width: 100%;
}
.email-info-item-container>textarea{
  border-radius: 5px;
  color: #000;
  background-color: #fff;
  padding: 2px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  border: none;
  outline: none;
  height: 106px;
  width: 100%;
}

.email-info-item-container>input:focus{

  background-color: #fff;
  border: none;
  outline: none;
}

.email-info-item-container>textarea:focus{
  background-color: #fff;
  border: none;
  outline: none;
}

.submit-email-detail-button{
  margin-left: 2px;
  cursor: pointer;
  border-radius: 5px;
  padding: 6px 0;
  width: 80%;
  background-color: #0d7ae1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.submit-email-detail-button>p{
  color: #fff;
}

.submit-email-detail-button:hover{
  background-color: #0581f6;
}

.submit-success-container{
  border-radius: 2000px;
  height: 45px;
  width: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.submit-success-container>p{
  color: #000;

}
.submit-success-container>img{
  width: 100%;
  object-fit: cover;
}
@media screen and (max-width: 1550px){
  .products-desc{
    padding: 0 16px;
  }
  .products-desc>h1{
    font-size: 24px;
  }
  .products-desc>p{
    font-size: 14px;
  }
}

@media screen and (max-width: 1024px){



}

@media screen and (max-width: 961px){
  .input-email-windows{
    width:50%;
    min-width: 94%;
    max-width: 94%;
    margin: 0 16px;
    height: 550px;
  }

}

@media screen and (max-width: 767px){
  .display-wrap{
    position: relative;
    height: 100%;
    padding: 48px 0;
    min-height: 650px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .send-email-container{
    padding: 20px;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .send-email-bg{
    display: none;
  }

  .product-media-container{
    width: 100%;
    height: 640px;
  }
  .product-desc-container{
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .product-show{
    position: relative;
    height: 100%;
    min-height: 750px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .featured-products{
    width: 100%;
  }
  .products-intro{
    width: 100%;
  }
  .related-product-container{
    flex-wrap: wrap;
  }
  .related-item{
    width: 100%;
  }
}

@media screen and (max-width: 700px){
  .product-media-container{
    width: 100%;
    height: 600px;
  }
}

@media screen and (max-width: 680px){
  .product-media-container{
    width: 100%;
    height: 580px;
  }
}


@media screen and (max-width: 640px){
  .product-media-container{
    width: 100%;
    height: 540px;
  }
}
@media screen and (max-width: 600px){
  .product-media-container{
    width: 100%;
    height: 500px;
  }
}
@media screen and (max-width: 550px){
  .product-media-container{
    width: 100%;
    height: 460px;
  }
}

@media screen and (max-width: 500px){
  .product-media-container{
    width: 100%;
    height: 420px;
  }
}

@media screen and (max-width: 480px){
  .product-media-container{
    width: 100%;
    height: 380px;
  }
  .send-email-container{
    padding: 10px;
  }
}

@media screen and (max-width: 460px){
  .product-media-container{
    width: 100%;
    height: 370px;
  }
}

@media screen and (max-width: 450px){
  .product-media-container{
    width: 100%;
    height: 350px;
  }
}

@media screen and (max-width: 420px){
  .product-media-container{
    width: 100%;
    height: 340px;
  }
}
</style>
