<template>
  <div class="container">
    <div class="map">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="500px"
          height="500px"
          viewBox="0 0 1000 1000"
          class="svg"
      >
        <g
            v-for="(item, index) in svgData"
            :key="index"
            @click="gClick(index,item)"
            @mouseover="gMouseenter(index)"
            @mouseleave="gMouseleave(index)"
        >
          <path
              class="st0"
              :d="item.d"
              :class="{
              st0Active:
                (gTextIFag && textIndex == index) || (gIFag && gIndex == index),
            }"
          ></path>
        </g>
        <text
            :x="item.textX"
            :y="item.textY"
            class="text01"
            :class="{
            text01Active:
              (gTextIFag && textIndex == index) || (gIFag && gIndex == index),
          }"
            v-for="(item, index) in svgData"
            :key="item.name"
        >{{item.name}}</text>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import svg from "../assets/json/ChinaMap.json";
import {defineProps, ref,defineEmits } from "vue";

const  svgData = ref(svg.svgArr)
const gTextIFag = ref(false)
const gIFag = ref(false)
const gIndex = ref(-1)
const textIndex = ref(-1)


const emits = defineEmits(['addressEvent']); // 声明要触发的事件

function gClick(index,item) {
  gIFag.value = true;
  gIndex.value = index;
  // 触发名为 'myEvent' 的事件，并传递参数
  emits('addressEvent',item.name);
}

function gMouseenter(index) {
  gTextIFag.value = true;
  textIndex.value = index;
}

function gMouseleave(index) {
  gTextIFag.value = false;
  textIndex.value = index;
}

const props = defineProps({
  address: {
    type: String,
    required: true,
  }
});
</script>
<style scoped>
.container{
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.map {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.map >svg{
  width: 1200px;
  height: 1200px;
}
.st0 {
  fill: #eff1f9;
  stroke: #FFF;
  stroke-width: 1px;
  transition: all linear 0.3s;
  cursor: pointer;
}
.st0Active {
  fill: #005CB9;
  transition: all linear 0.3s;
}
.st0:hover {
  fill: #005CB9;
  transition: all linear 0.3s;
}
.text01 {
  display: block;
  width: 12px;
  height: 12px;
  background-color: #333;
  fill: #333;
  font-size: 12px;
  transition: all linear 0.3s;
  cursor: pointer;
}
.text01Active {
  display: block;
  transition: all linear 0.3s;
}
</style>
