
<template>
  <div class="map" id="map-container"></div>
</template>

<script lang="ts" setup>
import {ref,nextTick,onMounted,reactive,onUpdated} from 'vue'
let map = null
let geocoder = null;
let marker = null;
let position_NKYYGS = reactive({
  Name: '深圳全德视讯有限公司',
  address: '地址：广东省深圳市龙岗区坂田街道深澳文化产业园22栋',
  phoneNumber: '4008786861',
  bdLNG: 114.054625,
  bdLAT: 22.63247,
})


function createMap(){
  if ( window) {
    import('@amap/amap-jsapi-loader').then(AMapLoader => {
      nextTick(() => {
        // 延迟一点点时间后再加载。否则
        AMapLoader.load({
          key: 'XXXXXXXXXXXXXXXXXXXXX',//替换成你的key
          version: '2.0',
          plugins: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
        }).then((AMap) => {
          nextTick(() => {
            map = new AMap.Map("map-container", {  //设置地图容器id
              viewMode: "3D",    //是否为3D地图模式
              zoom: 15,           //初始化地图级别
              center: [position_NKYYGS.bdLNG, position_NKYYGS.bdLAT], //初始化地图中心点位置
            });


            let marker = new AMap.Marker({
              title: '全德视讯',
              position: [position_NKYYGS.bdLNG, position_NKYYGS.bdLAT], // 位置
              // icon: '//vdata.amap.com/icons/b18/1/2.png'
            })
            map.add(marker)
          })
        })
      })
    })
  }
}

onMounted(()=>{
  position_NKYYGS=props.propsPosition
  createMap()
})


/*npm i @amap/amap-jsapi-loader --save*/

const props = defineProps({
  propsPosition: {
    required: true,
  },
  search:{
    type:String
  }
});






onUpdated(()=>{
  position_NKYYGS=props.propsPosition
  createMap()


})
</script>
<style>
.map {
  width: 100%;
  height: 100%;
}


.baidumap>.BMap_cpyCtrl {
  display: none !important;
}

.baidumap>.anchorBL {
  display: none !important;
}
</style>
