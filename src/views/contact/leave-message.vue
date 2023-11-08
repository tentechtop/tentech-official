<template>
  <div class="container">
    <div class="banner">
      <div class="products-desc">
        <h1>在线留言</h1>
        <div class="white-line"></div>
        <p>Contact US</p>
      </div>
    </div>
    <adaptive-container >
      <bread-crumb class="my-bread" :bread-crumb-list="breadCrumbList"></bread-crumb>

      <div  class="title-container">
        <h1>在线留言</h1>
      </div>
      <div v-if="!isSendSuccess" class="vertical">
        <div class="leave-message-container">

          <div class="message-item-container">
            <div class="message-title">
              <p>姓名</p><p style="color: red">*</p>
            </div>
            <div class="message-input">
              <input v-model="leaveMessage.name" placeholder="输入姓名">
            </div>
          </div>

          <div class="message-item-container">
            <div class="message-title">
              <p>公司地址</p><p style="color: red"></p>
            </div>
            <div class="message-input">
              <input v-model="leaveMessage.company" placeholder="输入姓名">
            </div>
          </div>

          <div class="message-item-container">
            <div class="message-title">
              <p>邮箱</p><p style="color: red">*</p>
            </div>
            <div class="message-input">
              <input v-model="leaveMessage.email" placeholder="输入您的邮箱">
            </div>
          </div>
          <div class="message-item-container">
            <div class="message-title">
              <p>电话</p><p style="color: red"></p>
            </div>
            <div class="message-input">
              <input v-model="leaveMessage.phone" placeholder="输入您的电话">
            </div>
          </div>



          <div class="message-item-container" style="width: 100%">
            <div class="message-title">
              <p>咨询内容</p><p style="color: red">*</p>
            </div>
            <div class="message-input">
              <textarea v-model="leaveMessage.questions" placeholder="输入您的咨询内容"/>
            </div>
          </div>


          <div class="message-item-container" style="width: 100%">
            <div class="agree-policy">
              <div class="agree-button" :class="{'is-agree-button':isAgree}" @click="isAgree = !isAgree"></div>
              <p>{{ $t('contact.agreePolicy') }}</p>
            </div>
          </div>

          <div class="message-item-container" style="width: 100%;align-items: center">

            <div class="submit-button" :class="{'unable-button':!isAgree}"  @click="saveMessage">
              <p>{{ $t('contact.label.submit') }}</p>
            </div>

          </div>


        </div>
      </div>

      <div v-if="isSendSuccess" class="vertical">
        <img  src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/check.svg">
        <h1>提交成功</h1>
        <p>感谢您对全德视讯的关注与支持</p>
      </div>


    </adaptive-container>





  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n()
import AdaptiveContainer from "../../components/adaptive-container.vue";
import BreadCrumb from "../../components/bread-crumb.vue";
import kwValidate from "../../assets/js/t-validate.js";
import {ref} from "vue";
const isAgree = ref(false)
const isSaving = ref(false)
const leaveMessage = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  questions: ''
})
const isShowMessage = ref(false)
const isSendSuccess = ref(false)
const submitMessage = ref({
  message:"",
  bgColor:"",
  borderRadius:""
})
const rules = ref({
  name: {
    rules: [{
      required: true,
      errorMessage: t('rules.required')
    }],
    label: t('contact.label.name'),
    validateTrigger: 'submit'
  },
  company: {
    rules: [
    ],
    label: t('contact.label.company'),
    validateTrigger: 'submit'
  },
  email: {
    rules: [{
      required: !locale.value.startsWith('zh'),
      errorMessage: t('rules.required')
    },
      {
        format: "email",
        errorMessage: t('rules.email')
      }],
    label: t('contact.label.email'),
    validateTrigger: 'submit'
  },
  phone: {
    rules: [{
      required: locale.value.startsWith('zh'),
      errorMessage: t('rules.required')
    },
      {
        format: "telphone",
        errorMessage: t('rules.telphone')
      },
    ],
    label: t('contact.label.phone'),
    validateTrigger: 'submit'
  },
  questions: {
    rules: [{
      required: true,
      errorMessage: t('rules.required')
    }],
    label: t('contact.label.questions'),
    validateTrigger: 'submit'
  }
})

async function saveMessage() {

  if (isSaving.value || !isAgree.value) {
    console.log("请先同意")
    return
  }
  const data = {
    name: leaveMessage.value.name.trim(),
    company: leaveMessage.value.company.trim(),
    email: leaveMessage.value.email.trim(),
    phone: leaveMessage.value.phone.trim(),
    questions: leaveMessage.value.questions.trim()
  }

  const res = kwValidate.validate(data, rules.value)
  if (!res.isOk) {
    submitMessage.value.message = res.errorMessage
    submitMessage.value.bgColor = "#FF3366"
    submitMessage.value.borderRadius = "1px solid #CC3333"
    isShowMessage.value = true
    setTimeout(()=>{
      isShowMessage.value = false
    },3000)
    return
  }
  isSaving.value = true
  isShowMessage.value = false





  isSendSuccess.value=true
  isSaving.value = false
  leaveMessage.value.name = ""
  leaveMessage.value.company = ""
  leaveMessage.value.email = ""
  leaveMessage.value.phone = ""
  leaveMessage.value.questions = ""
  submitMessage.value.message = "Success"
  submitMessage.value.bgColor = "#FFF"
  submitMessage.value.borderRadius = "1px solid #99FF99"
  isShowMessage.value = true
  setTimeout(()=>{
    isShowMessage.value = false
    isSendSuccess.value=false
    isAgree.value=false
  },3000)


/*  const response = await axios.post('https://formspree.io/f/xknleoaj', {
    data,
  });*/






}


const breadCrumbList = ref([
  {
    imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/home-icon.svg",
    name:"home",
    router:"/",
  },
  {
    imgUrl:"",
    name:"leave message",
    router:"/leave-message",
  },
])
</script>

<style  scoped>
.container{
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.banner{
  margin-top: 75px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/images/bj/contact-bj.jpg");
  background-size: cover;
  background-position: center;
  min-height: 500px;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 500px;
  background-image: inherit; /* 继承父元素的背景图片 */
  background-size: cover;
  background-position: center;
  filter: brightness(0.7); /* 调整亮度值，0.7表示70%的亮度 */
  z-index: 2; /* 将伪元素放在父元素的底下 */
}
.banner:hover{

}
.products-desc{
  transition: all 0.5s ease;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1550px;

}
.products-desc>h1,p{
  margin: 8px 0;
  color: #fff;
}
.products-desc>p{
  font-style: italic; /* 将字体设置为斜体 */
}
.white-line{
  width: 60px;
  height: 3px;
  background: #fff;
}
.my-bread{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.title-container{
  padding: 24px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title-container>h1{
  font-size: 40px;
  font-weight: 500;
}
.leave-message-container{
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;


}

.message-item-container{
  width: calc(50% - 16px);
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.message-title{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.message-title>p{
  font-size: 18px;
  color: #000;
}
.message-input{
  padding: 2px 0;
  border: 1px solid rgba(0,0,0,0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.message-input>input{
  height: 50px;
  width: 460px;
  padding: 0 5px;
  font-size: 18px;
  outline: none;
  border: none;
}
.message-input>input:focus{
  outline: none;
  border: none;
}
.message-input>textarea{
  padding: 5px;
  height: 150px;
  width: 940px;
  font-size: 18px;
  outline: none;
  border: none;
}
.message-input>textarea:focus{
  outline: none;
  border: none;
}



.message-input:hover{
  box-shadow: 0 0 5px 2px rgba(2, 70, 255, 0.2);
}



.vertical{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vertical>img{
  width: 100px;
}
.vertical>h1{
  color: #000;
  font-size: 44px;
}
.vertical>p{
  color: #000;
  font-size: 24px;
}
.agree-policy{
  width: 758px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.agree-policy>p{
  color: #000;
}
.agree-button{
  cursor: pointer;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0,0,0,0.35);
}
.is-agree-button{
  border: 7px solid rgba(20,70,250);
}

.submit-button{
  cursor: pointer;
  padding: 5px 16px;
  min-width: 300px;
  min-height: 40px;
  background-color: #0d7ae1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.submit-button:hover{
  background-color: #0062be;
}
.submit-button>p{
  color: #fff;
}
.unable-button{
  background-color: rgba(0,0,0,0.55);
}
.unable-button:hover{
  background-color: rgba(0,0,0,0.55);
}
</style>

