<template>
  <div class="container">
    <div class="adaptive-container">
      <div class="info-container">
        <div class="header"></div>

        <div class="view-container">
          <div class="card">

            <div class="card-header">
              <router-link to="/">
                <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/logo/tentech-text-logo.png">
              </router-link>
            </div>

            <div v-if="!resetpassword">
              <div v-if="!SendVerificationCode" class="input-container">
                <p :style="{color:loginNameError?'#f00':'#000'}">请输入已经注册的手机号/邮箱</p>
                <input class="phone-or-email" type="text" v-model="formData2.loginName"
                       @click="loginNameError=false"
                       @blur="validatePhoneNumberOrEmail(formData2.loginName)"/>
                <p v-if="!loginNameError" class="loginNameError">{{loginNameErrorMessage}}</p>


                <test-human   @time-out="isHuman=false" @success-event="isHuman=true;testHumanShow=false" ref="childComponentRef"></test-human>

                <p v-if="testHumanShow" class="loginNameError">请按提示完成验证</p>
                <div class="next-setup"
                     @click="gotoSendVerificationCode">
                  <p>下一步</p>
                </div>
              </div>
              <div v-if="SendVerificationCode" class="if-input-container">
                <div class="verification-code-container">
                  <p>验证码已发送到{{formData2.loginName}}</p>
                  <div class="verification-code">
                    <div class="code-item" v-for="(CItem,CIndex) in code" :key="CIndex">
                      <input type="text" class="code-input" :ref="`codeInput${CIndex}`"  v-model="code[CIndex]"
                             @click="codeError=false"
                             @input="handleInput(CIndex, $event.target.value)"
                             @keydown="handleKeyDown(CIndex, $event)"
                             @blur="validateVerificationCode"/>
                    </div>
                  </div>
                  <div v-if="!resend" class="resend-button" :class="{'resend-code':resend}">
                    {{countdown===0? '':countdown}}重新发送
                  </div>
                  <div v-if="resend" class="resend-button" :class="{'resend-code':resend}"
                       @click="reSendCode">
                    {{countdown===0? '':countdown}}重新发送
                  </div>
                </div>
                <p v-if="codeError" class="code-error">{{codeErrorMessage}}</p>
                <div class="next-setup" @click="gotoResetPassword">
                  <p>下一步</p>
                </div>
              </div>
            </div>
            <div v-if="resetpassword">
              <div class="input-container">
                <p :style="{color:passwordError?'#f00':'#000'}">密码</p>
                <div class="input-password">
                  <input class="password-input no-eye-icon" :type="passwordVisible ? 'text' : 'password'" v-model="formData2.password"
                         @click="passwordError=false;confirmpasswordError=false"
                         @blur="validatepassword(formData2.password)"/>
                  <img :src="passwordVisible? 'https://com2024.oss-cn-shenzhen.aliyuncs.com/image/passwordVisible.svg':'https://com2024.oss-cn-shenzhen.aliyuncs.com/image/passwordNoVisible.svg'"
                       @click="passwordVisible=!passwordVisible;passwordError=false">
                </div>
                <p v-if="passwordError" class="passwordError">{{passwordErrorMessage}}</p>
                <p :style="{color:confirmpasswordError?'#f00':'#000'}">再次输入确认密码</p>
                <div class="input-password">
                  <input class="password-input no-eye-icon" :type="confirmpasswordVisible ? 'text' : 'password'" v-model="formData2.confirmpassword"
                         @click="confirmpasswordError=false"
                         @blur="validatepassword(formData2.confirmpassword)"/>
                  <img :src="confirmpasswordVisible? 'https://com2024.oss-cn-shenzhen.aliyuncs.com/image/passwordVisible.svg':'https://com2024.oss-cn-shenzhen.aliyuncs.com/image/passwordNoVisible.svg'"
                       @click="confirmpasswordVisible=!confirmpasswordVisible">
                </div>
                <p v-if="confirmpasswordError" class="passwordError">{{confirmpasswordErrorMessage}}</p>

                <div class="submit-button" :class="{'is-human-submit':isHuman}" @click="resetSubmit">
                  <p>提交</p>
                </div>
              </div>
            </div>




            <div class="split-line2"></div>
            <div class="contact">
              <p>登录遇到问题?</p>
              <a href="/">常见问题</a>
              <a href="/">联系客服</a>
            </div>

          </div>
        </div>

        <div class="copy-right bottom-info">
          <p>Copyright © 2018-{{ formatDate(new Date()) }} Lucky fortune 全德视讯 版权所有
            <a href="/">隐私政策</a>
            <a href="/">使用条款</a>
          </p>
          <p>
            <a class="icp" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">粤ICP备2021034388号</a>
            <a class="beian" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702004694" target="_blank">
              <img src="https://com2024.oss-cn-shenzhen.aliyuncs.com/image/beian.png">粤公网安备 44030702004694号</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import testHuman from "../../components/test-human.vue";
import {onBeforeUnmount, onMounted, ref,getCurrentInstance} from "vue";
import { useRoute, useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter()
const route = useRoute()


const passwordError = ref(false)
const passwordErrorMessage = ref("")
const confirmpasswordError = ref(false)
const confirmpasswordErrorMessage = ref("")


const codeError = ref(false)
const codeErrorMessage = ref("")
const loginType = ref("")
const loginNameError = ref(false)

const loginNameErrorMessage = ref("")
const currentRegionNumber = ref(86)
const passwordVisible = ref(false)
const confirmpasswordVisible = ref(false)

const resend = ref(false)
const countdown = ref(60)
const isHuman = ref(false)
const testHumanShow = ref(false)
const SendVerificationCode = ref(false)
const resetpassword = ref(false)
const code = ref([
  "",
  "",
  "",
  "",
])

const codesn = ref("")
const codeStr = ref("")
const CodeEncrypt = ref("")
const formData2 = ref({
  loginName:"",
  password:"",
  confirmpassword:"",
})
const validateCode = ref(false)

function   validatePhoneNumberOrEmail(loginName) {
  const input = loginName // Assuming "phoneNumBer" is the input field name
  const phoneRegex = /^[0-9]{11}$/; // 11-digit number pattern
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Email pattern
  const isValidPhone = phoneRegex.test(input);
  const isValidEmail = emailRegex.test(input);
  if (isValidPhone) {
   loginType.value='phone'
    code.value=[
      "",
      "",
      "",
      "",
    ]
    console.log("Valid phone number:", input);
    return true
  } else if (isValidEmail) {
    loginType.value='email'
    code.value=[
      "",
      "",
      "",
      "",
      "",
      "",
    ]
    console.log("Valid email:", input);
    return true
  } else {
    console.log("Invalid account:", input);
    if (formData2.value.loginName===''){
      loginNameErrorMessage.value='不能为空'
    }else {
      loginNameErrorMessage.value='无效的邮箱或手机号'
    }
    return false
  }
}


function handleInput(index, value) {
  if (value.length > 1) {
    for (let i = 0; i < value.length; i++) {
      console.log('zii',code.value.length)
      if(index+i < code.value.length){
        code.value[index+i] = value[i];
        proxy.$refs[`codeInput${index + i}`][0].focus();
      }
    }
  } else {
    code.value[index] = value;
  }
}

function validateVerificationCode() {
  if (code.value.every(item => item.length === 1 && !isNaN(item.length))) {
    console.log("验证码有效");
    validateCode.value=true
    return true
  } else {
    codeErrorMessage.value="验证码无效"
    console.log("验证码无效");
    // 执行无效时的操作
    return false
  }
}

function handleKeyDown(index, event) {
  const keyPressed = event.key; // Get the key that was pressed
  if (keyPressed === 'Delete' || keyPressed === 'Backspace') {
    // Delete (Backspace) key pressed
    deleteKeyPressedLogic(index);
  } else if (keyPressed === 'ArrowLeft' || keyPressed === 'ArrowRight') {
    // Left or Right arrow key pressed
    arrowKeyPressedLogic(index, keyPressed);
  }
}


function     deleteKeyPressedLogic(index) {
  // Your logic for handling delete key pressed
  console.log(`Delete key pressed in input at index ${index}.`);
  if (code.value[index] !== ""){
    code.value[index] = ""
  }else {
    if (index-1>=0){
      proxy.$refs[`codeInput${index -1}`][0].focus();
    }
  }
}
function    arrowKeyPressedLogic(index, arrowKey) {
  console.log(`${arrowKey} arrow key pressed in input at index ${index}.`);
  if (arrowKey==='ArrowRight'){
    if(index+1 < code.value.length){
      proxy.$refs[`codeInput${index + 1}`][0].focus();
    }
  }else {
    if (index-1>=0){
      proxy.$refs[`codeInput${index -1}`][0].focus();
    }
  }
}


function   resetSubmit(){
  passwordError.value=!validatepassword(formData2.value.password)
  confirmpasswordError.value=!validatepassword(formData2.value.confirmpassword)
  //不一致
  const unanimous = formData2.value.password!==formData2.value.confirmpassword
  if (unanimous){
    confirmpasswordErrorMessage.value="两次输入密码不一致"
    confirmpasswordError.value=true
  }else {
    confirmpasswordErrorMessage.value=""
  }
  if (!unanimous  && !passwordError.value &&!confirmpasswordError.value){



  }
}

function     validatepassword(password){
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=.])(?=\S+$).{6,20}$/;
  if (passwordPattern.test(password)) {
    console.log("密码合法");
    return true
  } else {
    if (formData2.value.password===''){
      passwordErrorMessage.value="密码为空"
    }else {
      passwordErrorMessage.value="密码不合法"
    }
    return false
  }
}


function     gotoSendVerificationCode(){
  testHumanShow.value=!isHuman.value
  loginNameError.value=!validatePhoneNumberOrEmail(formData2.value.loginName)

  if (isHuman.value && !loginNameError.value){
    SendVerificationCode.value=true
    startCountdown()
    console.log('成功');

  }
}

function startCountdown() {
  let timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      resend.value=true
      clearInterval(timer);
      // 倒计时完成后的操作，比如触发事件或显示消息
    }
  }, 1000);
}

function     formatDate(date) {
  const year = date.getFullYear();
  return `${year}`;
}

function     gotoResetPassword(){
  if (validateVerificationCode()){
    const codeString = code.value.join('');
    this.codeStr = codeString

    console.log("验证码正确")
    resetpassword.value=true
    codeError.value=false

/*      this.codeErrorMessage="验证码错误"
      console.log("验证码错误")
      this.codeError=true*/

  }else {
    codeError.value=true
  }
}

function     reSendCode(){

  resend.value=false
  countdown.value=60





}

</script>

<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("https://com2024.oss-cn-shenzhen.aliyuncs.com/image/reset-bg-01.jpg");
  background-size: cover;
}

.adaptive-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.info-container{
  width: 100%;
  min-height: 115vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.header{
  width: 100%;
  height: 0px;
}
.view-container{
  transition: all 0.3s ease;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}
.card{
  padding: 30px;
  transition: all 0.3s ease;
  width: 464px;
  min-height: 702px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.bottom-info{
  width: 100%;
  min-height: 70px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bottom-info>p{
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  padding: 0;
  margin: 0;
  color: white;
}
.bottom-info >p >a{
  margin-right: 8px;
  text-decoration: none;
  font-size: 16px;
  color: white;
}
.bottom-info >p >a >img{
  width: 16px;
}

.card-header{
  width: 100%;
  margin-top: 48px;
}
.card-header>a>img{
  width: 200px;
}
.input-container{
  margin: 8px 0;
}
.input-container>p{
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 15px;
}
.phone-or-email{
  font-size: 16px;
  border-radius: 5px;
  width: 99%;
  height: 38px;
  border: 1px solid rgba(0,0,0,0.15);
  outline: none;
}
.phone-or-email:focus{
  border: 1px solid rgba(0,0,0,0.15);
  outline: none;
  box-shadow: 0 0 6px rgba(42, 42, 201, 0.5); /* 添加蓝色光晕效果 */
}
.next-setup{
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 24px;
  border-radius: 5px;
  width: 100%;
  height: 44px;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.next-setup:hover{
  background-color: #232323;
}
.next-setup>p{
  color: white;
}

.split-line2{
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,0.1);
  margin: 24px 0 8px 0px;
}
.contact{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.contact>p{
  margin-right: 8px;
  font-size: 14px;
  color: rgba(0,0,0,0.75);
}
.contact>a{
  text-decoration: none;
  margin: 0 8px;
  font-size: 14px;
  color: rgba(2,90,255);
}
.if-input-container>p{
  font-weight: 700;
  font-size: 15px;
}
.verification-code-container{
  margin-top: 16px;
  width: auto;
  height: 200px;
  background-color: #f3eeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.verification-code-container>p{
  margin-bottom: 6px;
}
.verification-code{
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.code-item{
  cursor: text;
  width: calc((100% / 6) - 8px);
  height: 50px;
  background-color: white;
  border: 1px solid rgba(0,0,0,0.15);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.code-item>input{
  padding: 10px;
  border: none;
  outline: none;
  font-size: 24px;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.code-item>input:focus{
  border: none;
  outline: none;
}
.code-input::-webkit-inner-spin-button,
.code-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
.resend-button{
  opacity: 0.5;
  cursor: pointer;
  color: rgba(0,0,0,0.55);
  margin-top: 16px;
  padding: 6px 24px;
  font-size: 13px;
  border: 1px solid rgba(0,0,0,0.15);
}
.submit-button{
  border-radius: 5px;
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.15);
  background-color: #F5F5F5;
}
.submit-button>p{
  color: black;
  opacity: 0.55;
}
.agree-policy{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.select-button{
  cursor: pointer;
  margin-right: 5px;
  width: 13px;
  height: 13px;
  border: 1px solid rgba(0,0,0,0.15);
}
.agree-button {
  width: 13px;
  height: 13px;
  background-color: #0abd0a; /* 设置背景颜色为绿色 */
  border: 1px solid rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.agree-button::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 10px;
  height: 8px;
  border: 2px solid white;
  border-top: none;
  border-right: none;
  transform: rotate(300deg); /* 将勾号翻转，旋转角度为135度 */
}
.policy-container{
  margin: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.policy-container>p{
  color: #676464;
  font-size: 14px;
}
.policy-container >p >a{
  font-size: 14px;
  color: black;
  text-decoration: none;
}
.loginNameError{
  color: red;
  font-size: 14px;
}
.resend-code{
  opacity: 1;
  color: rgba(0,0,0,0.55);
  border: 1px solid rgba(0,0,0,0.35);
}
.resend-code:hover{
  opacity: 0.7;
  color: rgba(0,0,0,0.75);
  border: 1px solid rgba(0,0,0,0.55);
  background-color: rgba(0,0,0,0.15);
}
.resend-code:active{
  opacity: 1;
}
.code-error{
  font-size: 14px;
  color: red;
}

.input-password{
  margin-bottom: 8px;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(0,0,0,0.15);
}
.input-password:hover{
  box-shadow: 0 0 6px rgba(42, 42, 201, 0.5); /* 添加蓝色光晕效果 */
}
.input-password>img{
  z-index: 2;
  margin-right: 8px;
  cursor: pointer;
  opacity: 0.65;
  width: 22px;
}
.password-input{
  border-radius: 5px;
  font-size: 16px;
  height: 38px;
  width: 100%;
  border: none;
  outline: none;
}
.password-input:focus{
  border: none;
  outline: none;
}
.input-container>a{
  text-decoration: none;
  font-size: 14px;
  color: rgba(2,90,255);
}
.passwordError{
  font-size: 14px;
  color: red;
}

input::-ms-clear{display:none;}
input::-ms-reveal{display:none;}
@media screen and (max-width: 1432px){
  .card{
    margin-right: 16px;
  }

}

@media screen and (max-width: 767px){
  .card{
    margin-right: 0;
  }
  .view-container{
    width: 100%;
    max-width: 1400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

}

@media screen and (max-width: 512px){
  .info-container{
    min-height: 100vh;
  }
  .card{
    min-height: 80vh;
    width: calc(100% - 32px);
  }
  .bottom-info>p{
    padding: 0 16px;
    font-size: 14px;
  }
  .bottom-info >p >a{
    font-size: 14px;
  }
}
</style>