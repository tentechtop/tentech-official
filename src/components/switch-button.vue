<template>
  <div class="menu-toggle-container" @click="toggle">

    <div class="menu-toggle" :class="{active:active}">
      <span v-for="(item, index) in 3" class="toggle-line"></span>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
// 使用 defineProps 定义 props
const props = defineProps(['active']);
// 使用 defineEmits 定义 emit 事件
const emit = defineEmits(['change']);
// 使用 ref 定义响应式数据 active
const active = ref(props.active);
// 定义 toggle 方法
const toggle = () => {
  active.value = !active.value;
  emit('change', active.value);
};
// 定义 close 方法
const close = () => {
  active.value = false;
  emit('change', active.value);
};

</script>

<style scoped>
.menu-toggle-container {
  width: 100%;
  height: 100%;
  min-width: 25px;
  min-height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu-toggle {
  position: relative;
  width: 25px;
  height: 20px;
  cursor: pointer;
}

.toggle-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.toggle-line:nth-child(1) {
  top: 0;
}

.toggle-line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.toggle-line:nth-child(3) {
  bottom: 0;
}

.menu-toggle.active .toggle-line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.menu-toggle.active .toggle-line:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .toggle-line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.menu-toggle.theme-black .toggle-line {
  background-color: #000;
}

.menu-toggle.theme-black .toggle-line {
  background-color: #fff;
}
</style>
