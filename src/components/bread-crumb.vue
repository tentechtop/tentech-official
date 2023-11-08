<template>
  <div class="container">
    <div v-for="(BC,BCIndex) in props.breadCrumbList" class="bread-crumb-item" @click="gotoTargetPage(BC)">
      <img v-if="BC.imgUrl!==''" :src="BC.imgUrl">
      <p>{{BC.name}}</p>
      <p v-if="BCIndex!==props.breadCrumbList.length-1">></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()

function gotoTargetPage(BC){
  router.push({path:BC.router})
}

const props = defineProps({
  breadCrumbList:{
    type:Array,
    required:true
  }
})
onMounted(()=>{
/*  console.log("breadCrumbList",props.breadCrumbList)*/
})
</script>

<style scoped>
.container{
  padding: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px  solid rgba(0,0,0,0.15);
}
.bread-crumb-item{
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.bread-crumb-item>img{
  width: 18px;
}
.bread-crumb-item>p{
  font-size: 13px;
  padding: 0 2px;
  color: #999999;
}
.bread-crumb-item>p:hover{
  color: #2585E0;
}

</style>