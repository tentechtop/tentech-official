<template>
  <div class="root">
    <div class="series-directory"
         :style="{height:(productList.length*72)+120+100+'px'}"
    >
      <div class="desc-space">
        <h1>产品直通车</h1>
        <p>PRODUCT</p>
      </div>
      <div class="series-menu-space"
           :style="{height:(productList.length*72)+'px'}"
      >
        <div v-for="(series ,index) in productList" class="directory-item"
          @click="goToSelected(series,index)"
        >
          <div class="dot-space">
            <div :class="series.isSelected? 'radio-selected':'radio'"></div>
          </div>
          <div class="series-title">
            <p>{{series.seriesTitle}}</p>
          </div>
        </div>
      </div>
      <div class="contact-space">
        <div class="phone">
          <img src="../../assets/images/24gf-phoneLoudspeaker.svg">
          <p>全国服务热线</p>
        </div>
        <div class="phone-number">
          <p>0755-27192472</p>
        </div>


      </div>
    </div>

    <div class="product-content">
      <div class="product-space"
      :style="{height:productList[activeIndex].subProductList.length<=6? 'max-height:470px':'720px'}"
      >
        <div v-for="(product,pIndex) in productList[activeIndex].subProductList"  class="product-item"
        @mouseover="product.isHover=true"
        @mouseleave="product.isHover=false"
        >
          <div class="img-space">
            <img
                :style="{height:product.isHover?'142.8px':'136px',width:product.isHover?'262.5px':'250px'}"
                :src="product.productImgUrl">
          </div>
          <p>{{product.productTitle}}</p>

          <div class="learn-more">
             <div class="more-button"
             style="
             cursor: pointer;
             width: 80px;
             margin-top: 5px;
             padding-bottom: 1px;
             padding-left: 5px;
             margin-left: 20px;
             background-color: #DC0A13"
             >
               <p style="color: white">more >></p>
             </div>
          </div>
        </div>
      </div>


    </div>



  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUpdated, ref, watch} from "vue";

const  activeIndex = ref(0)
function goToSelected(series,index){
 this.productList.forEach((item)=>{
   item.isSelected=false
 })
  series.isSelected=true
  activeIndex.value=index
}


const productList=ref(
    [
  {
    seriesTitle:"室内LED 显示屏",
    seriesId:1,
    isHover:true,
    isSelected:true,
    subProductList:[
      {
        productId:1,
        productName:"室内高清租赁屏",
        productTitle:"室内高清租赁屏",
        isHover:true,
        isSelected:true,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/indoor-led-display/product01/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:2,
        productName:"曲线led P3.91MM",
        productTitle:"曲线led显示屏P3.91MM",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/indoor-led-display/product02/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:3,
        productName:"室内P4.81",
        productTitle:"室内p4.81 演唱会LED 显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/indoor-led-display/product03/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
    ]
  },
  {
    seriesTitle:"室外LED 显示屏",
    seriesId:2,
    isHover:false,
    isSelected:false,
    subProductList:[
      {
        productId:4,
        productName:"P6户外广场广告宣传led 显示屏",
        productTitle:"P6户外广场广告宣传led 显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/outdoor-led-display/product01/01.png",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:5,
        productName:"室外p10mm 曲屏广告屏",
        productTitle:"室外p10mm 曲屏广告屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/outdoor-led-display/product02/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:6,
        productName:"简易铁箱户外p10led显示屏",
        productTitle:"简易铁箱户外p10led显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/outdoor-led-display/product03/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:7,
        productName:"室外广告牌P8 防水led 显示屏",
        productTitle:"室外广告牌P8 防水led 显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/outdoor-led-display/product04/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:8,
        productName:"防水室外p5 LED 显示屏",
        productTitle:"防水室外p5 LED 显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/outdoor-led-display/product05/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:9,
        productName:"商场室外P10 LED显示屏",
        productTitle:"商场室外P10 LED显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/outdoor-led-display/product06/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
    ]
  },
  {
    seriesTitle:"租赁LED 显示屏",
    seriesId:3,
    isHover:false,
    isSelected:false,
    subProductList:[
      {
        productId:10,
        productName:"舞台租赁小间距P 3 led显示屏",
        productTitle:"舞台租赁小间距P 3 led显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/rental-display/product01/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:11,
        productName:"室内p6 音乐会显示屏",
        productTitle:"室内p6 音乐会显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/rental-display/product02/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
    ]
  },
  {
    seriesTitle:"固定安装LED 显示屏",
    seriesId:4,
    isHover:false,
    isSelected:false,
    subProductList:[
      {
        productId:12,
        productName:"酒店固定安装p4 led 显示屏",
        productTitle:"酒店固定安装p4 led 显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/fixed-install-led-display/product01/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:13,
        productName:"室内固定安装p4 led 显示屏",
        productTitle:"室内固定安装p4 led 显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/fixed-install-led-display/product02/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:14,
        productName:"公司会议室P2.5mm 小间距显示屏",
        productTitle:"公司会议室P2.5mm 小间距显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/fixed-install-led-display/product03/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
    ]
  },
  {
    seriesTitle:"压铸铝箱体",
    seriesId:5,
    isHover:false,
    isSelected:false,
    subProductList:[
      {
        productId:15,
        productName:"新款576*576 箱体",
        productTitle:"新款576*576 箱体",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/diecast-aluminum-box/product01/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:16,
        productName:"新款租赁500*500mm 箱体",
        productTitle:"新款租赁500*500mm 箱体",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/diecast-aluminum-box/product02/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:17,
        productName:"576*576mm 显示屏压铸铝箱",
        productTitle:"576*576mm 显示屏压铸铝箱",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/diecast-aluminum-box/product03/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:18,
        productName:"直角斜边方形显示屏",
        productTitle:"直角斜边方形显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/diecast-aluminum-box/product04/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:19,
        productName:"前维护480*480mm压铸铝箱",
        productTitle:"前维护480*480mm压铸铝箱",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/diecast-aluminum-box/product05/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:20,
        productName:"压铸铝简易箱",
        productTitle:"压铸铝简易箱",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/diecast-aluminum-box/product06/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:21,
        productName:"压铸铝箱",
        productTitle:"压铸铝箱",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/diecast-aluminum-box/product07/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:22,
        productName:"压铸铝箱500*1000mm",
        productTitle:"压铸铝箱500*1000mm",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/diecast-aluminum-box/product08/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
    ]
  },
  {
    seriesTitle:"显示屏广告机",
    seriesId:6,
    isHover:false,
    isSelected:false,
    subProductList:[
      {
        productId:23,
        productName:"小间距智能海报屏",
        productTitle:"小间距智能海报屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/advertising-player-display/product01/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:24,
        productName:"P2.5MM LED广告机",
        productTitle:"P2.5MM LED广告机",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/advertising-player-display/product02/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
      {
        productId:25,
        productName:"海报广告机显示屏室内P3mm",
        productTitle:"海报广告机显示屏室内P3mm",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/advertising-player-display/product03/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
    ]
  },
  {
    seriesTitle:"透明显示屏",
    seriesId:7,
    isHover:false,
    isSelected:false,
    subProductList:[
      {
        productId:12,
        productName:"透明显示屏",
        productTitle:"透明显示屏",
        isHover:false,
        isSelected:false,
        productImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/product/transparent-led-display/product01/01.jpg",
        desc:"LED显示屏应用领域的研究与探索,从方案设计,生产,安装到调试的一站式服务，公司本着“我就是用户”的服务理念！",
        router:"/product",
      },
    ]
  },
]
)


</script>

<style scoped>
.root{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.series-directory{
  width: 260px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f3f3;
}
.directory-item{
  cursor: pointer;
  height: 72px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.directory-item :hover{

}
.series-title{
  height: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 180px;
}
.series-menu-space{
  width: 100%;
}
.desc-space{
  position: relative;
  width: 100%;
  height: 120px;
  background: linear-gradient(to right, #FF0000, #FF7F00, #FFFF00);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.desc-space>h1{
 color: rgba(250,250,250);
}
.desc-space>p{
  color: rgba(250,250,250);
}
.contact-space{
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, rgba(0,0,0,0.5),rgba(0,0,0,0.35),rgba(0,0,0,0.25));
}
.product-content{
  width: 900px;
  height: 720px;
  display: flex;
  background-color: #f9f9f9;
}
.radio{
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.5);
  background-color: white;
}

.radio-selected{
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 5px solid rgba(0,0,0,0.75);
  background-color: white;
}
.dot-space{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30px;
  margin-left: 30px;
}
.phone{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.phone>img{
  width: 32px;
}
.phone>p{
  font-size: 20px;
  color: white;
  font-weight: bold;
}
.phone-number{
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.phone-number>p{
  color: white;
  font-size: 22px;
  font-weight: bold;
}
.product-item{
  cursor: pointer;
  margin: 10px 5px; /* 顺序为：上 右 下 左 */
  width: 32%;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.25);
}
.more-button>{
  height: 20px;
  width: 40px;
  background-color: #212121;
}
.learn-more{
  width: 100%;
  height: auto;
}
.product-item>p{
  margin-top: 10px;
  color: rgba(0,0,0,0.8);
}
.product-space{
  max-height: 470px;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}
.img-space{
  cursor: pointer;
  width: 250px;
  height: 136px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.img-space>img{
  transition: width 0.3s ease,height 0.3s ease;
  width: 250px;
  height: 136px;
}
</style>