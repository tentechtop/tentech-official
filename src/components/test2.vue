<template>
  <div class="container">
    <div class="preview-button t-button" :class="{'no-click':currentPage===total}"
         @click="gotoPreViewPage"
    >
      上一页
    </div>

    <div class="target-page-item" v-for="(item,index) in total">
      {{index+1}}
    </div>

    <div class="next-button t-button"
         @click="gotoNextPage"
    >
      下一页
    </div>
  </div>
</template>

<script lang="ts" setup>

function gotoPreViewPage(){
  if (props.total>=2){
    props.currentPage--;
  }
}

function gotoNextPage(){
  if (props.currentPage<props.total){
    props.currentPage++;
  }
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
  }
});
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: row;

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
  margin: 0 8px;
  padding: 8px 16px;
  background-color: #FFF;
  border: 1px solid rgba(0,0,0,0.25);
  color: #000;
}
.no-click{
  background-color: #f3f3f3;
  color: #2e7be5;

}
.no-click:hover{
  border: 1px solid rgba(0,0,0,0.25);
  background-color: #f3f3f3;
  color: #2e7be5;
}
</style>