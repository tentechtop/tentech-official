<template>
  <div class="root-page">

    <div class="hamburger" :class="{ active: isHamburgerActive }" @click="toggleHamburger">
      <span v-for="(item,index) in 3" class="bar"
      :style="{'background-color':theme === 'nav-top' ?'#fff':'#000'}"
      ></span>

    </div>

  </div>

</template>

<script lang="ts" setup>
import {defineProps, ref} from 'vue'

const isHamburgerActive = ref(false)

const toggleHamburger = () => {
  isHamburgerActive.value = !isHamburgerActive.value
}

const props = defineProps({
  theme:{
    required:true
  }

})
</script>

<style scoped>
.root-page{
  width: 25px;
  height: 20.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hamburger {
  position: relative;
  width: 25px;
  height: 20.5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.bar {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #000;
  transition: transform 0.3s ease;
}

.bar:nth-child(1) {
  top: 0;
}

.bar:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.bar:nth-child(3) {
  bottom: 0;
}

.hamburger.active .bar:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}
</style>
