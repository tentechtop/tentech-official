<template>
    <header class="header" :class="[topLayerClass, fixedClass]"
        :style="{ 'height': fixed && fixedClass ? (headerHeight + 'px') : 'auto' }">
        <div ref="header" class="header-container">
            <div class="header-wrapper" :class="{ 'header-menu-mul': menus && (menus.length > 1) }">
                <span v-if="(typeof title === 'string' || !title)" class="header-title">{{ title }}</span>
                <router-link v-else="title.text" class="header-title" :to="title.url || 'javascript:void(0)'">购买渠道</router-link>
                <div v-if="menus && menus.length" class="header-right">
                    <router-link v-for="(menu, index) in menus" :key="index" :to="menu.url || 'javascript:void(0)'">
                        {{ menu.text }}
                    </router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import {PropType, ref,onMounted ,onBeforeUnmount } from 'vue'
interface IHeader {
    text: {
        type: String
    },
    url: {
        type: String
    }
}

const treeWidth = 768

let navHeight = 64

const props = defineProps({
    title: {
        type: [Object as PropType<IHeader>, String]
    },
    menus: {
        type: Array as unknown as PropType<[IHeader]>,
        default: () => []
    },
    fixed: {
        type: Boolean,
        default: false
    }
})

const fixedClass = ref("")
const topLayerClass = ref("")

const header = ref<any>(null)

const headerHeight = ref<number>(48)

const init = () => {
    initNavHeight()
    initFixedClass()

    initHeaderHeight()
    initTopLayerClass()
}

onMounted(() => {
    if (props.fixed) {

        initNavHeight()
        initHeaderHeight()

        window.addEventListener('scroll', initFixedClass)
        window.addEventListener('resize', init)
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', initFixedClass)
    window.removeEventListener('resize', init)
})

function initNavHeight() {
    navHeight = document.body.clientWidth > treeWidth ? 64 : 50
}

function initTopLayerClass() {
    if (document.body.clientWidth > treeWidth) {
        topLayerClass.value = props.fixed ? "header-top-layer" : ""
    } else {
        topLayerClass.value = ''
    }
}

function initFixedClass() {
    if (document.body.clientWidth > treeWidth) {
        fixedClass.value = document.documentElement.scrollTop >= navHeight ? 'header-fixed' : ''
    } else {
        fixedClass.value = ''
    }
}

function initHeaderHeight() {
    if (header.value) {
        let rect = header.value.getBoundingClientRect()
        if (rect) {
            headerHeight.value = rect.height
        }
    }
}
</script>

<style scoped>
.header {
    min-height: 48px;
    position: relative;
}

.header.header-top-layer {
    z-index: 1000;
}

.header.header-fixed .header-container {
    position: fixed;
    left: 0;
    top: 0;
}

.header-container {
    background-color: #232526;
    width: 100%;
    min-height: 48px;
    padding: 10px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.header-wrapper {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
    margin-right: 48px;
}

.header-right>a {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    line-height: 28px;
    margin-right: 24px;
}

.header-right>a:last-child {
    margin-right: 0;
}

@media screen and (max-width: 768px) {
    .header-wrapper {
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .header-title {
        margin-right: 24px;
    }
}

@media screen and (max-width: 480px) {
    .header-container {
        justify-content: flex-start;
    }

    .header-wrapper.header-menu-mul {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .header-menu-mul .header-title {
        margin-right: 0;
    }

    .header-menu-mul .header-right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 8px;
    }
}
</style>
