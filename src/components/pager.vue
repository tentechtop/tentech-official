<template>
  <div class="containers">
    <div class="preview-button t-button" :class="{'no-click':currentPage===1}"
         @click="gotoPreViewPage"
    >
      上一页
    </div>
    <div class="target-page-item" v-for="(item,index) in total"
         :class="{'current-item':currentPage===index+1}"
    @click="gotoTarget(index+1)"
    >
      {{index+1}}
    </div>
    <div class="next-button t-button" :class="{'no-click':currentPage===total}"
         @click="gotoNextPage"
    >
      下一页
    </div>
    <div class="next-button t-button product-count" >
      总数:{{ productCount }}
    </div>
  </div>
</template>

<script lang="ts" setup>

import {defineEmits, defineProps, onUpdated, ref} from "vue";

const emit = defineEmits(['changeCurrentPage']);

const currentPage = ref(props.currentPage)
const total = ref(props.total)

function gotoTarget(index){
  currentPage.value=index
  emit('changeCurrentPage', currentPage.value);
  scrollToTop()
}

function gotoPreViewPage(){
  if (currentPage.value>1){
    currentPage.value--;
    emit('changeCurrentPage', currentPage.value);
  }
  scrollToTop()

}

function gotoNextPage(){
  if (currentPage.value<props.total){
    currentPage.value++;
    emit('changeCurrentPage', currentPage.value);
  }

  scrollToTop()

}


const props = defineProps({
  total: {
    type: Number,
    required: true,
    default: 1
  },
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  productCount: {
    type: Number,
    required: true,
    default: 0
  }
});


const scrollToTop = () => {
  const duration = 400; // 滚动持续时间（毫秒）
  const startPosition = window.scrollY;
  const targetPosition = 440; // 目标Y轴位置
  const startTime = performance.now();
  const animateScroll = (timestamp: number) => {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
    const newPosition = startPosition + (targetPosition - startPosition) * easeProgress;
    window.scrollTo(0, newPosition);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  requestAnimationFrame(animateScroll);
};


onUpdated(()=>{
  currentPage.value = props.currentPage
      total.value = props.total
})
</script>

<style scoped>
.containers{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}
.t-button{
  border: 1px solid rgba(0,0,0,0.25);
  cursor: pointer;
  padding: 8px 16px;
  background-color: #fff;
  color: #2e7be5;
}

.t-button:hover{
  border: 1px solid rgba(0,0,0,0);
  cursor: pointer;
  padding: 8px 16px;
  background-color: #2e7be5;
  color: #fff;
}


.target-page-item{
  cursor: pointer;
  margin: 0 8px;
  padding: 8px 16px;
  background-color: #FFF;
  border: 1px solid rgba(0,0,0,0.25);
  color: #000;
}
.no-click{
  cursor: none;
  background-color: #f3f3f3;
  color: #2e7be5;

}
.no-click:hover{
  border: 1px solid rgba(0,0,0,0.25);
  background-color: #f3f3f3;
  color: #2e7be5;
}
.product-count{
  position: absolute;
  right: 0;
  margin-left: 8px;
}
.current-item{
  background-color: #2e7be5;
}

@media screen and (max-width: 767px){
  .t-button{
    padding: 4px 12px;
  }

  .t-button:hover{
    padding: 4px 12px;
  }
  .target-page-item{
    margin: 0 4px;
    padding: 4px 12px;
  }
}

@media screen and (max-width: 500px){
  .product-count{
    display: none;
  }
}
</style>