<template>
  <div class="container">
    <div v-if="isShowBackTopButton" class="back-top-button" @click="scrollToTop">
      <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/back-top-icon.svg">
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const isShowBackTopButton = ref(false)


const scrollToTop = () => {
  const duration = 400; // 滚动持续时间（毫秒）
  const startPosition = window.scrollY;
  const startTime = performance.now();
  const animateScroll = (timestamp: number) => {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
    window.scrollTo(0, startPosition - easeProgress * startPosition);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  requestAnimationFrame(animateScroll);
};


function handleScroll() {
  isShowBackTopButton.value=scrollY >=1024
}

onMounted(()=>{
  window.addEventListener('scroll', handleScroll);
})
</script>

<style scoped>
.container{
  z-index: 999999;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.back-top-button{
  outline: 2px solid rgba(255,255,255);
  transition: all 0.3s ease;
  border-radius: 200px;
  right: 7px;
  bottom: 12px;
  position: fixed;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: #076bcf;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.back-top-button>img{
  width: 24px;
}

@media screen and (max-width: 1800px){
  .back-top-button{

  }
}
@media screen and (max-width: 1024px){
  .back-top-button{

  }
}
@media screen and (max-width: 767px){
  .back-top-button{

  }
}
</style>