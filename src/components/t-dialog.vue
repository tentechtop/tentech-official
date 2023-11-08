<template>
  <div v-if="isOpenDialog"  class="dialog-overlay">
    <div class="dialog">

      <button @click="isOpenDialog=!isOpenDialog;">关闭</button>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue'







const props = defineProps({
  isOpenDialog:{
    required:true
  }
})
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.close-button {
  margin-top: 10px;
}
</style>
