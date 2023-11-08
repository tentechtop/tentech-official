<template>
  <div class="expand-button" @click="toggleContent">
    <div class="cross-line">
      <span :class="['line', { 'rotate-plus': isContentVisible }]"></span>
      <span class="line"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isContentVisible = ref(false);

function toggleContent() {
  isContentVisible.value = !isContentVisible.value;
}
</script>

<style>
.expand-button {
  height: 100%;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cross-line {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.line {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.rotate-plus {
  transform: rotate(90deg);
  opacity: 1;
  height: 2px;
}
</style>
