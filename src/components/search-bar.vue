<template>
    <!-- <div class="kw-search-bar"> -->
    <div class="search-container" :style="searchStyle">
        <!-- <img src="https://file.kwunphi.com/kwunphi4/images/commons/fangdaj1.svg"> -->
        <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/logo/sousuotubiao.svg">
        <input v-model="text" type="text" :placeholder="placeholder" :maxlength="maxlength">
        <div class="search-button" @click="onsearch">{{ btn }}</div>
    </div>
    <!-- </div> -->
</template>

<script lang="ts">
export default {
    props: {
        modelValue: {
            type: String,
        },
        placeholder: {
            type: String,
            default: ''
        },
        maxlength: {
            type: [String, Number],
        },
        btn: {
            type: String,
            default: '查询'
        },
        height: {
            type: [String, Number],
            default: ''
        },
        fontSize: {
            type: [String, Number],
            default: ''
        }
    },
    emits: ['search', 'update:modelValue'],
    data() {
        return {
            searchStyle: {},
            text: ''
        }
    },
    watch: {
        text(newText, oldText) {
            this.$emit('update:modelValue', newText)
        }
    },
    created() {
        this.text = this.modelValue
        let style:any = {}
        if (this.height) {
            if (typeof this.height === 'string' && ('auto' === this.height || this.height.endsWith('px'))) {
                style.height = this.height
            } else {
                style.height = this.height + 'px'
            }
        }
        if(this.fontSize){
            style.fontSize = this.fontSize
        }
        this.searchStyle = style
    },
    methods: {
        onsearch() {
            this.$emit('search', this.text)
        }
    }
}
</script>

<style scoped>
.search-container {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    max-width: 540px;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: box-shadow 0.2s ease;
}

.search-container>img {
    cursor: pointer;
    width: 22px;
    margin: 0 10px;
    opacity: 0.4;
}

.search-container>input {
    border: none;
    outline: none;
    font-size: 1em;
    width: 100%;
    height: 100%;
    margin-right: 10px;
    flex: 1;
}

.search-button {
    background-color: rgba(2, 140, 255);
    border-radius: 0px 5px 5px 0px;
    color: white;
    cursor: pointer;
    font-size: calc(1em + 2px);
    min-width: 90px;
    height: calc(100% + 2px);
    margin-right: -1px;
    padding: 5px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
}

.search-button:hover {
    background-color: rgba(2, 100, 255);
    box-shadow: 0px 0px 5px rgba(2, 100, 255, 0.9);
}
@media screen and (max-width: 480px) {
    .search-button {
        min-width: auto;
    }
}
</style>
