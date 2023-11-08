<template>
  <div class="container">
    <div class="banner">
      <div class="products-desc">
        <h1>联系我们</h1>
        <div class="white-line"></div>
        <p>Contact US {{locale}}</p>
      </div>
    </div>
    <adaptive-container>
      <bread-crumb class="my-bread"  :bread-crumb-list="breadCrumbList"></bread-crumb>


      <div class="contact-container">
        <div class="company-address">
          <h1>联系方式</h1>
          <p>持续不断的改进服务水平与质量，最大程度为客户提供优质的服务</p>
          <div class="contact-card">
            <div class="switch-container">
              <div class="switch-button" :class="{buttonSelected:con.isSelected}" v-for="(con,index) in switchList" @click="gotoSelectButton(con)">
                {{con.title}}
              </div>
            </div>
            <div v-if="currentDisplay===1" class="contact-info-detail contact-map-container">
              <div class="contact-type china-map-container">
                <china-map address="" @addressEvent="handleAddressEvent"></china-map>
              </div>
              <div class="contact-type">
                <h1>{{currentAddress}}</h1>
                <div class="manager-container">区域经理</div>
                <div class="manager-list-container">
                  <div class="manager-info">
                    <p>NAME:  <a style="color: black;font-weight: 700">Flame Hu</a></p>
                    <p>MOBILE PHONE:  <a href="tel:+86-15818643042">+86-15818643042</a></p>
                    <p>FAX: <a>+86-755 27197996</a></p>
                    <p>EMAIL: <a href="mailto:flamehu@tentech-leddisplay.com">flamehu@tentech-leddisplay.com</a></p>
                    <p>WHATSAPP: <a>8615818643042</a></p>
                    <p>WECHAT: <a>8615818643042</a></p>
                  </div>

                  <div class="manager-info">
                    <p>NAME:  <a style="color: black;font-weight: 700">Kevin Tang</a></p>
                    <p>MOBILE PHONE:  <a href="tel:+86-18926006291">+86-18926006291</a></p>
                    <p>FAX: <a>+86-755 27197996</a></p>
                    <p>WHATSAPP: <a>8618926006291</a></p>
                    <p>WECHAT: <a>8618926006291</a></p>
                  </div>

                  <div class="manager-info">
                    <p>NAME:  <a style="color: black;font-weight: 700">Nancy Li</a></p>
                    <p>MOBILE PHONE:  <a href="tel:+8617872233102">+8617872233102</a></p>
                    <p>FAX: <a>+86-755 27197996</a></p>
                    <p>EMAIL: <a href="mailto:sales01@tentech-leddisplay.com">sales01@tentech-leddisplay.com</a></p>
                    <p>WHATSAPP: <a>+8617872233102</a></p>
                    <p>WECHAT: <a>+8617872233102</a></p>
                  </div>

                  <div class="manager-info">
                    <p>NAME:  <a style="color: black;font-weight: 700">Nazarii</a></p>
                    <p>MOBILE PHONE:  <a href="tel:+8617872233102">+380508507627</a></p>
                    <p>TELEPHONE:  <a href="tel:++8618617026275">+8618617026275</a></p>
                    <p>FAX: <a>+86-755 27197996</a></p>
                    <p>WHATSAPP: <a>+8618617026275</a></p>
                    <p>WECHAT: <a>Mike_Root</a></p>
                  </div>
                </div>





              </div>
            </div>
            <div v-if="currentDisplay===2" class="contact-info-detail overseas">
              <div class="manager-info overseas-manager">
                <p>NAME:  <a style="color: black;font-weight: 700">Flame Hu</a></p>
                <p>MOBILE PHONE:  <a href="tel:+86-15818643042">+86-15818643042</a></p>
                <p>FAX: <a>+86-755 27197996</a></p>
                <p>EMAIL: <a href="mailto:flamehu@tentech-leddisplay.com">flamehu@tentech-leddisplay.com</a></p>
                <p>WHATSAPP: <a>8615818643042</a></p>
                <p>WECHAT: <a>8615818643042</a></p>
              </div>
              <div class="manager-info overseas-manager">
                <p>NAME:  <a style="color: black;font-weight: 700">Kevin Tang</a></p>
                <p>MOBILE PHONE:  <a href="tel:+86-18926006291">+86-18926006291</a></p>
                <p>FAX: <a>+86-755 27197996</a></p>
                <p>WHATSAPP: <a>8618926006291</a></p>
                <p>WECHAT: <a>8618926006291</a></p>
              </div>
              <div class="manager-info overseas-manager">
                <p>NAME:  <a style="color: black;font-weight: 700">Nancy Li</a></p>
                <p>MOBILE PHONE:  <a href="tel:+8617872233102">+8617872233102</a></p>
                <p>FAX: <a>+86-755 27197996</a></p>
                <p>EMAIL: <a href="mailto:sales01@tentech-leddisplay.com">sales01@tentech-leddisplay.com</a></p>
                <p>WHATSAPP: <a>+8617872233102</a></p>
                <p>WECHAT: <a>+8617872233102</a></p>
              </div>
              <div class="manager-info overseas-manager">
                <p>NAME:  <a style="color: black;font-weight: 700">Nazarii</a></p>
                <p>MOBILE PHONE:  <a href="tel:+8617872233102">+380508507627</a></p>
                <p>TELEPHONE:  <a href="tel:++8618617026275">+8618617026275</a></p>
                <p>FAX: <a>+86-755 27197996</a></p>
                <p>WHATSAPP: <a>+8618617026275</a></p>
                <p>WECHAT: <a>Mike_Root</a></p>
              </div>
            </div>
            <div v-if="currentDisplay===3" class="contact-info-detail overseas">
              <div class="manager-info overseas-manager">
                <p>NAME:  <a style="color: black;font-weight: 700">Flame Hu</a></p>
                <p>MOBILE PHONE:  <a href="tel:+86-15818643042">+86-15818643042</a></p>
                <p>FAX: <a>+86-755 27197996</a></p>
                <p>EMAIL: <a href="mailto:flamehu@tentech-leddisplay.com">flamehu@tentech-leddisplay.com</a></p>
                <p>WHATSAPP: <a>8615818643042</a></p>
                <p>WECHAT: <a>8615818643042</a></p>
              </div>
              <div class="manager-info overseas-manager">
                <p>NAME:  <a style="color: black;font-weight: 700">Kevin Tang</a></p>
                <p>MOBILE PHONE:  <a href="tel:+86-18926006291">+86-18926006291</a></p>
                <p>FAX: <a>+86-755 27197996</a></p>
                <p>WHATSAPP: <a>8618926006291</a></p>
                <p>WECHAT: <a>8618926006291</a></p>
              </div>
              <div class="manager-info overseas-manager">
                <p>NAME:  <a style="color: black;font-weight: 700">Nancy Li</a></p>
                <p>MOBILE PHONE:  <a href="tel:+8617872233102">+8617872233102</a></p>
                <p>FAX: <a>+86-755 27197996</a></p>
                <p>EMAIL: <a href="mailto:sales01@tentech-leddisplay.com">sales01@tentech-leddisplay.com</a></p>
                <p>WHATSAPP: <a>+8617872233102</a></p>
                <p>WECHAT: <a>+8617872233102</a></p>
              </div>
              <div class="manager-info overseas-manager">
                <p>NAME:  <a style="color: black;font-weight: 700">Nazarii</a></p>
                <p>MOBILE PHONE:  <a href="tel:+8617872233102">+380508507627</a></p>
                <p>TELEPHONE:  <a href="tel:++8618617026275">+8618617026275</a></p>
                <p>FAX: <a>+86-755 27197996</a></p>
                <p>WHATSAPP: <a>+8618617026275</a></p>
                <p>WECHAT: <a>Mike_Root</a></p>
              </div>
            </div>
          </div>
        </div>


<!--        <div class="company-address" style="margin-top: 96px">
          <h1>在线留言</h1>
          <email-contact></email-contact>
        </div>-->


        <div class="company-address">
          <h1>公司地址</h1>
          <p>持续不断的改进服务水平与质量，最大程度为客户提供优质的服务</p>
          <div class="map-space">
            <div style="display: flex;flex-direction: row;margin-left: -795px;margin-bottom: 10px;margin-top: 10px">
            </div>
            <div class="map">
              <div class="map-content">
                <map-container :props-position="currentMap" :search="searchInput"></map-container>  <!--线下商城的百度地图因为有问题，暂时先隐藏了-->
              </div>
              <div class="serach-content">
                <div class="search-input" >
                  <img width="22px" style="margin-left: 5px;color: #555555" src="../../assets/images/sousuotubiao.svg">
                  <input type="text" placeholder="搜索地点" v-model="searchInput">
                  <div class="search-button">查询</div>
                </div>
                <div style="display: flex;flex-direction: row;margin-bottom: 8px">
                  <div v-for="(item,index) in searchStoreList" :class="item.selected? 'tag-selected':'tag'" @click="changSelected(index)">
                    <h4>{{ item.label }}</h4>
                  </div>
                </div>
                <div class="store-content">
                  <div v-for="(item,index) in storeList" :class="!item.selected? 'store-card':'store-card-selected'" @click="changSelected1(item,index)">
                    <h1>{{item.name}}</h1>
                    <div style="display: flex;flex-direction: row;margin-top: 10px">
                      <div v-for="(tag ,index) in item.tag" class="tag-item">
                        <h2>{{ tag.label}}</h2>
                      </div>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;justify-content: center">
                      <img style="width: 20px" src="../../assets/images/dizhi1.svg">
                      <h3 style="color: rgba(0,0,0,0.65);font-size: 15px;margin-top: 10px">{{item.address}}</h3>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;">
                      <img style="width: 18px;margin-top: -20px" src="../../assets/images/time1.svg">

                      <div>
                        <h3 style="color: rgba(0,0,0,0.65);font-size: 15px;margin-top: 10px">{{item.businessHours1}}</h3>
                        <h3 style="color: rgba(0,0,0,0.65);font-size: 15px;margin-top: 10px">{{item.businessHours2}}</h3>
                      </div>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;">
                      <img style="width: 20px;margin-top: 7px" src="../../assets/images/dianhua12.svg">

                      <h3 style="color: rgba(0,0,0,0.65);font-size: 15px;margin-top: 10px">: {{item.phoneNum}}</h3>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </adaptive-container>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, ref} from 'vue'
import AdaptiveContainer from "../../components/adaptive-container.vue";
import BreadCrumb from "../../components/bread-crumb.vue";
import MapContainer from "../../components/MapContainer.vue";
import ChinaMap from "../../components/china-map.vue";
import Diqiu from "../../components/diqiu.vue";
import {useI18n} from "vue-i18n";
import EmailContact from "../../components/email-contact.vue";
const { t,locale } = useI18n();
const currentDisplay = ref(1)

const currentAddress = ref("中国大陆")

const pageInfo = ref({
  title: '联系全德视讯',
  description: '联系全德视讯'
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

function handleAddressEvent(address){
  currentAddress.value=address
}

function gotoSelectButton(con){
  switchList.value.forEach((sw)=>{
    sw.isSelected=false
  })
  con.isSelected=true
  currentDisplay.value=con.value
}

const switchList = ref([
  {
    isSelected:true,
    title:"中国大陆",
    value:1,
  },
  {
    isSelected:false,
    title:"海外",
    value:2,
  },
  {
    isSelected:false,
    title:"技术支持",
    value:3,
  }
])

const searchInput = ref("")
const FilterCriteria = ref([1,2])
const currentMap = ref({})
const searchStoreList = ref([
  { label: '所有门店',
    selected:true,
    value: 1 },
  { label: '支持试机',
    selected:false,
    value: 2 },
  { label: '支持保修',
    selected:false,
    value: 3 },
]);
const storeList = ref([
  { name: '深圳市全德视讯有限公司',
    tag:[
      {label:"支持试机",value: 1},
      {label:"支持保修",value: 2}
    ],
    tags:[1,2],//方便筛选以后可以添加经销商坐标
    address:"广东省深圳市龙岗区坂田街道深澳文化产业园22栋",
    businessHours1:"周一~周五:9:00~21:00",
    businessHours2:"周六~周日:10:00~20:00",
    phoneNum:"4008786861",
    selected:true,
    storeId: 1,
    MapCoordinate:{
      Name: '深圳市全德视讯有限公司',
      address: '地址：广东省深圳市龙岗区坂田街道深澳文化产业园22栋',
      phoneNumber: '+86-15818643042',
      bdLNG: 114.055459,
      bdLAT: 22.633065,
    }
  },
/*  { name: '合肥全德视讯有限公司',
    tag:[
      {label:"支持试机",value: 1},
      {label:"支持保修",value: 2}
    ],
    tags:[1,2],//方便筛选
    address:"安徽省合肥市经济技术开发区宿松路南艳湖创新中心1栋422室",
    businessHours1:"周一~周五:9:00~21:00",
    businessHours2:"周六~周日:10:00~20:00",
    phoneNum:"4008786861",
    selected:false,
    storeId: 2,
    MapCoordinate:{
      Name: '合肥全德视讯有限公司',
      address: '安徽省合肥市经济技术开发区宿松路南艳湖创新中心1栋422室',
      phoneNumber: '4008786861',
      bdLNG: 117.275319,
      bdLAT: 31.772930,
    }
  },*/
]);
const styleList = ref({
  width:200,
  placeholder:"请输入"
});
function changSelected(index){
  console.log("index",index)
  const temp = this.searchStoreList[index].selected
  // 设置当前选中项的样式
  this.searchStoreList[index].selected = !temp;

  if (index===0){
    this.searchStoreList.forEach(item => {
      item.selected = false;
    });
    this.searchStoreList[0].selected = true;
  }else {
    this.searchStoreList[0].selected = false;
  }
}
function changSelected1(item,index){
  console.log("index",index)
  const temp = this.storeList[index].selected
  this.storeList.forEach(item => {
    item.selected = false;
  });
  // 设置当前选中项的样式
  this.storeList[index].selected = true;
  currentMap.value=item.MapCoordinate
  console.log("当前地图",currentMap.value)
}
onMounted(()=>{
  currentMap.value=storeList.value[0].MapCoordinate
})

const breadCrumbList = ref([
  {
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/home-icon.svg",
    name:"home",
    router:"/",
  },
  {
    imgUrl:"",
    name:"contact us",
    router:"/contact",
  },
])

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
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/contact-bj.jpg");
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
.my-bread{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.contact-container{
  padding: 36px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.company-address{

  margin-bottom: 72px;
}
.company-address>h1{
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 16px;
}
.company-address>p{
  color: black;
  font-size: 18px;
  font-weight: 300;
}
.contact-card{
  height: auto;
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;

}
.switch-button{
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  margin-right: 16px;
  padding: 10px 38px;
  background-color: #f3f3f3;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 100px;
}
.buttonSelected{
  background-color: rgba(0,0,0,0.85);
  color: #fff;
}
.switch-container{
  margin-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.contact-type{
  width: 45%;
  min-height: 400px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
}
.manager-container{
  margin: 10px 0;
  width: 100%;
  padding: 12px 5px;
  background-color: #2e7be5;
  color: #fff;
  font-size: 18px;
}
.manager-info{
  margin-bottom: 16px;
  padding: 10px;
  background-color: #f3f3f3;
  width: 100%;
  display: flex;
  flex-direction: column;

}
.manager-info>p{
  font-size: 16px;
  color: black;
}
.manager-info >p >a{
  font-size: 16px;
  color: #2e7be5;
}
.overseas-manager{
  margin-right: 16px;
  width: calc(33% - 16px);
}
.china-map-container{
  width: 55%;
}
.contact-info-detail{
  margin-top: 48px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.overseas{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.manager-list-container{
  max-height: 460px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.map-space{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.map{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.map-content{
  height: 620px;
  width: 1016px;
}
.serach-content{
  margin-left: 20px;
  height: 520px;
  width: 384px;
  display: flex;
  flex-direction: column;
}
.search-input{
  padding-left: 5px;
  border-radius: 5px;
  height: 37px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0,0,0,0.3);
}

.search-input >input{
  margin-left: 10px;
  width: 300px;
  height: 37px;
  font-size: 17px;
  color: rgba(0,0,0,0.75);
}
.search-input >input[type="text"] {
  border: none;
  border-top: 1px solid rgba(0,0,0,0.3);
  border-bottom: 1px solid rgba(0,0,0,0.3);
  outline: none;
}

.search-input >input[type="text"]:focus {
  /* 设置选中状态下的样式 */
  border: none;
  border-top: 1px solid rgba(0,0,0,0.3);
  border-bottom: 1px solid rgba(0,0,0,0.3);
  outline: none;
}
.search-button{
  color: white;
  cursor: pointer;
  height: 37px;width: 67px;
  background-color: rgba(2,70,255);
  display: flex;flex-direction: column;
  border-radius: 0px 5px 5px 0px;
  justify-content: center;
  align-items: center;
}


.search-button:hover{
  color: white;
  cursor: pointer;
  height: 37px;width: 67px;
  background-color: rgba(2,100,255);
  display: flex;flex-direction: column;
  border-radius: 0px 5px 5px 0px;
  justify-content: center;
  align-items: center;
}
.tag{
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 5px;
  margin-right: 10px;
  width: 120px;
  height: 35px;
  background-color: #F5F5F5;
}

.tag-selected{
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 5px;
  margin-right: 10px;
  width: 120px;
  height: 35px;
  background-color: rgba(0,0,0,0.85);
}

.tag-selected >h4{
  font-size: 15px;
  color: rgba(255,255,255,0.95);
}

.tag >h4{
  font-size: 15px;
  color: rgba(0,0,0,0.65);
}
.store-content{
  height: 500px;
  overflow: auto; /* 显示滚动条 */
  display: flex;
  flex-direction: column;
}
.store-card{
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.store-card-selected{
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
.store-card-selected >h1{
  font-size: 18px;
  font-weight: bold;
  color: rgba(0,0,0,0.75);
}
.store-card >h1{
  font-size: 18px;
  font-weight: bold;
  color: rgba(0,0,0,0.75);
}
.tag-item{
  margin-right: 20px;
  width: 80px;
  height: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 5px;
}
.tag-item >h2{
  font-size: 14px;
  color: rgba(0,0,0,0.58);
}
.company-address{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.leave-message-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item-line-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.message-item-container{
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.submit-button{
  cursor: pointer;
  width: 300px;
  height: 52px;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.submit-button>p{
  font-size: 18px;
  color: #fff;
}
.submit-button:hover{
  background-color: rgba(0,0,0,0.95);
}
.message-title{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.message-title>p{
  font-size: 18px;
  color: #000;
}
.message-input{
  padding: 2px 0;
  border: 1px solid rgba(0,0,0,0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.message-input>input{
  height: 50px;
  width: 460px;
  padding: 0 5px;
  font-size: 18px;
  outline: none;
  border: none;
}
.message-input>input:focus{
  outline: none;
  border: none;
}
.message-input>textarea{
  padding: 5px;
  height: 150px;
  width: 940px;
  font-size: 18px;
  outline: none;
  border: none;
}
.message-input>textarea:focus{
  outline: none;
  border: none;
}



.message-input:hover{
  box-shadow: 0 0 5px 2px rgba(2, 70, 255, 0.2);
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

  .contact-map-container{
    margin-top: 48px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .contact-type{
    width: 100%;
    min-height: 400px;
    max-height: 600px;
    display: flex;
    flex-direction: column;
  }

  .overseas-manager{
    margin-right: 0px;
    width: calc(50% - 16px);
  }

}

@media screen and (max-width: 828px){
  .china-map-container{
    display: none;
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

  .switch-button{
    padding: 10px 18px;
  }

  .overseas-manager{
    margin-right: 0px;
    width: 100%;
  }


}






@media screen and (max-width: 767px){

  .map{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }


  .map-space{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .map-content{
    height: 520px;
    width: 100%;
  }

  .serach-content{
    display: none;

  }
  .header{
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .offline-mall{
    margin-top: 50px;
    width: 100%;
    height: 790px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }



  .offline-mall{
    margin-top: 0px;
    width: 100%;
    min-height: 790px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

}
</style>