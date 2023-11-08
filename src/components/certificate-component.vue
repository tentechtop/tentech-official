<template>
  <div class="container">
    <div v-if="isOpenDialog" class="pic-dialog">
      <div class="close-bg" @click="isOpenDialog=false"></div>
      <div class="preview-container" @click="isOpenDialog=false">
        <img class="preview-img" :src="currentImg" >
      </div>
    </div>

    <div class="certificate">
      <h1>产品认证</h1>
      <div class="certificate-container">
        <div class="certificate-box">
          <div class="certificate-title">
            <span class="ce-tag" :class="{ 'ce-tag-current': !showCeId }" @click="showCertificate('all')">全部</span>
            <span v-for="(item, index) in certificateList" :key="index" class="ce-tag" :class="{ 'ce-tag-current': showCeId === item.id }" @click="showCertificate(item.id)">
						{{ item.label }}
					</span>
          </div>
          <div class="certificate-wrapper" :class="{'item-center': showCeId}">
            <div v-for="(item, index) in certificateList" :key="index" class="ce-pic-wrapper" :class="{ 'hidden': showCeId && showCeId !== item.id }">
              <div class="ce-pic-title">- {{ item.label }} -</div>


              <a class="ce-pic" :title="item.label" @click="getImg(item)">
                <img :src="item.thumb" :alt="item.label" />
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const isOpenDialog = ref(false);
const currentImg = ref("")

function getImg(img){
  currentImg.value = img.thumb
  isOpenDialog.value=true
}

const fileUrl = 'https://file.kwunphi.com/kwunphi/images/certificate/'
const thumbUrl = 'https://file.kwunphi.com/kwunphi/images/certificate/thumb/'

const showCeId = ref('')

const certificateList = ref([{
  id: 'ce-FCC',
  label: "CE , FCC .UL Certification",
  thumb: 'https://tentech.oss-cn-shenzhen.aliyuncs.com/images/about-us/certificate1.jpg',
  pic: 'https://tentech.oss-cn-shenzhen.aliyuncs.com/images/about-us/certificate1.jpg'
}, {
  // RED\LVD是安规认证，不适合放官网
  id: 'ce-RED',
  label: "产品认证",
  thumb: 'https://tentech.oss-cn-shenzhen.aliyuncs.com/images/about-us/certificate7.jpg',
  pic: 'https://tentech.oss-cn-shenzhen.aliyuncs.com/images/about-us/certificate7.jpg'
}])

function showCertificate(ceId) {
  if (!ceId || ceId === 'all') {
    showCeId.value = ''
  } else {
    showCeId.value = ceId
  }
}


</script>

<style scoped>
.container{
  width: 100%;
}
.certificate{
  padding: 48px 0 96px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.certificate>h1{
  font-weight: 700;
}
.certificate-container{
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pic-dialog{
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* 使用视窗宽度作为宽度 */
  height: 100vh; /* 使用视窗高度作为高度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}
.close-bg{
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
}
.preview-img{
  width: 60%;
  object-fit: cover;
}

.preview-container{
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  padding: 40px;
  overflow: hidden;
  z-index: 2;
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

@media screen and (max-width: 1232px){
  .certificate-container{
    padding: 0 16px;
  }

}


.certificate-box {
  width: 100%;
  /* max-width: 1300px; */
  margin: 66px auto 0;
}

.certificate-title {
  margin-bottom: 36px;
}

.ce-tag {
  display: inline-block;
  cursor: pointer;
  color: #193284;
  font-size: 16px;
  line-height: 28px;
  padding:0 14px;
}

.ce-tag-current {
  background-color:#2585E0;
  border-radius: 14px;
  color: #fff;
}

div.hidden {
  display: none;
}

.certificate-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0 -9px;
}

.certificate-wrapper.item-center {
  justify-content: center;
}

.ce-pic-wrapper {
  width: calc(25% - 18px);
  height: 0;
  padding-bottom: calc((25% - 18px) * 1.41 + 22px);
  margin: 0 9px 18px;
  position: relative;
}

@media screen and (max-width: 719px) {
  .ce-pic-wrapper {
    width: calc(33% - 18px);
    height: 0;
    padding-bottom: calc((33% - 18px) * 1.41 + 22px);
  }
}

@media screen and (max-width: 500px) {
  .ce-pic-wrapper {
    width: calc(50% - 18px);
    height: 0;
    padding-bottom: calc((50% - 18px) * 1.41 + 22px);
  }

  .preview-container{
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
    padding: 40px;
    overflow: hidden;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .preview-img{
    width: 100%;
    object-fit: cover;
  }




}

.ce-pic-title {
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  text-align: center;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 2;
}

@media screen and (max-width: 350px) {
  .ce-pic-title {
    font-size: 12px;
  }
}

.ce-pic {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: calc(100% - 22px);
  overflow: hidden;
  transition: all 0.5s;
  z-index: 1;
}

.ce-pic img {
  width: 100%;
}

.ce-pic-wrapper:hover .ce-pic {
  top: -18px;
}
</style>
