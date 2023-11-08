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
            <div v-if="!SendVerificationCode" class="switch-button-container">
              <div class="switch-button"  v-for="(type , index) in switchButtonList" :key="index" @click="selectLoginType(type)"
                   :class="{'item-selected':type.isSelected}">
                <p>{{ type.buttonTitle }}</p>
                <div class="line">
                  <div class="line-swiper"></div>
                </div>
              </div>
            </div>
            <div v-if="!SendVerificationCode" class="split-line"></div>
            <div v-if="currentSignUpType===1" class="input-container">
              <div v-if="!SendVerificationCode" class="if-input-container">
                <p>请输入手机号</p>
                <div class="phone-number-input">
                  <div class="region">
                    <p>+{{currentRegionNumber}}</p>
                  </div>
                  <input type="text" v-model="formData1.phoneNumBer" @blur="validatePhoneNumber(formData1.phoneNumBer)"/>
                </div>
                <test-human  @time-out="isHuman=false" @success-event="isHuman=true" ref="childComponentRef"></test-human>
                <div class="next-setup"
                     @click="gotoSendVerificationCode">
                  <p>下一步</p>
                </div>
              </div>
              <div v-if="SendVerificationCode" class="if-input-container">
                <div class="verification-code-container">
                  <p>验证码已发送到{{formData1.phoneNumBer}}</p>
                  <div class="verification-code">
                    <div class="code-item" v-for="(CItem,CIndex) in code" :key="CIndex">
                      <input type="text" class="code-input" :ref="`codeInput${CIndex}`"  v-model="code[CIndex]"
                             @input="handleInput(CIndex, $event.target.value)"
                             @keydown="handleKeyDown(CIndex, $event)"
                             @blur="validateVerificationCode"/>
                    </div>
                  </div>
                  <div class="resend-button" :class="{'resend-code':resend}">
                    {{countdown}}重新发送
                  </div>
                </div>
                <div class="agree-policy">
                  <div class="select-button" @click="agreePolicy=!agreePolicy" :class="{'agree-button':agreePolicy}">
                  </div>
                  <div class="policy-container">
                    <p>同意并遵守全德视讯<a href="/">隐私政策</a>和
                      <a href="/">使用条款</a>
                      未注册的手机号验证成功后将自动创建全德账号</p>
                  </div>
                </div>
                <div class="login-button">
                  <p>登录</p>
                </div>
              </div>
              <div class="registered">
                <p>已有账号？</p><router-link to="/login">立即登录</router-link>
              </div>
              <div class="split-line2"></div>
              <div class="contact">
                <p>登录遇到问题?</p>
                <a href="/">常见问题</a>
                <a href="/">联系客服</a>
              </div>
            </div>
            <div v-if="currentSignUpType===2" class="input-container">
              <p :style="{color:phoneNumberOrEmailError?'#f00':'#000'}">邮箱/手机号</p>
              <input class="phone-or-email" type="text" v-model="formData2.loginName"
                     @click="phoneNumberOrEmailError=false"
                     @blur="validatePhoneNumberOrEmail(formData2.loginName)"/>
              <p v-if="phoneNumberOrEmailError" class="phoneNumberOrEmailError">{{phoneNumberOrEmailErrorMessage}}</p>
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

              <div class="agree-policy"
                   @click="agreePolicyShow=!agreePolicy"
              >
                <div class="select-button" @click="agreePolicy=!agreePolicy" :class="{'agree-button':agreePolicy}">
                </div>
                <div class="policy-container">
                  <p>同意并遵守全德视讯<a href="/">隐私政策</a>和
                    <a href="/">使用条款</a>
                    未注册的手机号验证成功后将自动创建全德账号</p>
                </div>
              </div>
              <p v-if="agreePolicyShow" class="passwordError">请先仔细阅读并同意隐私政策和使用条款</p>
              <div class="submit-button" :class="{'is-human-submit':isHuman}" @click="gotoSignUp">
                <p>提交</p>
              </div>

              <div class="registered">
                <p>已有账号？</p><router-link to="/login">立即登录</router-link>
              </div>
              <div class="split-line2"></div>
              <div class="contact">
                <p>登录遇到问题?</p>
                <a href="/">常见问题</a>
                <a href="/">联系客服</a>
              </div>

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


const phoneNumberOrEmailError = ref(false)
const phoneNumberOrEmailErrorMessage = ref("")
const passwordError = ref(false)
const passwordErrorMessage = ref("")

const confirmpasswordError = ref(false)
const confirmpasswordErrorMessage = ref("")
const countdown = ref(60)
const isHuman = ref(false)


const resend = ref(false)
const passwordVisible = ref(false)
const confirmpasswordVisible = ref(false)
const currentSignUpType = ref(2)


const currentRegionNumber = ref(86)
const SendVerificationCode = ref(false)
const agreePolicy = ref(false)
const agreePolicyShow = ref(false)


const remainingSeconds = ref(0)

const validateCode = ref(false)
const formData1 = ref({
  phoneNumBer:"",
})
const code = ref([
  "",
  "",
  "",
  "",
  "",
  "",
])
const codeMap = ref(new Map())


const formData2 = ref({
  loginName:"",
  password:"",
  confirmpassword:"",
})
const switchButtonList = ref([
          {
            type: 1,
            buttonTitle: "手机注册",
            isSelected: false,
          },
  {
    type: 2,
    buttonTitle: "邮箱注册",
    isSelected: true,
  },
])



function   selectLoginType(type){
  currentSignUpType.value=type.type
  switchButtonList.value.forEach((item)=>{
    item.isSelected=false
  })
  type.isSelected=true
}

function     validatePhoneNumber(phoneNumber){
  // 校验手机号格式
  const validPhoneRegex = /^[0-9]{11}$/; // 匹配11位数字
  const isValidPhoneNumber = validPhoneRegex.test(phoneNumber);
  const isValidLength = currentRegionNumber.value === 86 ? isValidPhoneNumber : true;
  if (isValidPhoneNumber && isValidLength) {
    return true
  } else {
    return false
  }
}

function     gotoSendVerificationCode(){
  if(validatePhoneNumber(formData1.value.phoneNumBer)) {
    isHuman.value=true
    SendVerificationCode.value=true
    startCountdown()

  }else {
    console.log("sss")
  }
}

function    validatepassword(password){
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=.])(?=\S+$).{6,20}$/;
  console.log("password:", formData2.value.password);
  console.log("Pattern test result:", passwordPattern.test(formData2.value.password));

  if (passwordPattern.test(password)) {
    console.log("密码合法");
    // 执行密码合法时的操作
    return true
  } else {
    if (formData2.value.password===''){
      passwordErrorMessage.value="密码为空"
    }else {
      passwordErrorMessage.value="密码不合法"
    }
    console.log("密码不合法");
    // 执行密码不合法时的操作
    return false
  }
}

function     handleInput(index, value) {
  if (value.length > 1) {
    for (let i = 0; i < value.length; i++) {
      console.log('zii',code.value.length)
      if(index+i < code.value.length){
        code.value[index+i] = value[i];
        codeMap.value.set(index+i,value[i])
        proxy.$refs[`codeInput${index + i}`][0].focus();
      }
    }
  } else {
    code.value[index] = value;
    codeMap.value.set(index,value)
  }
}

function     validateVerificationCode() {
  if (code.value.every(item => item.length === 1 && !isNaN(item.length))) {
    console.log("验证码有效",code.value);
    validateCode.value=true
  } else {
    console.log("验证码无效");
    // 执行无效时的操作
  }
}

function     validatePhoneNumberOrEmail(loginName) {
  const input = loginName // Assuming "phoneNumBer" is the input field name
  const phoneRegex = /^[0-9]{11}$/; // 11-digit number pattern
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Email pattern

  const isValidPhone = phoneRegex.test(input);
  const isValidEmail = emailRegex.test(input);
  if (isValidPhone) {
    console.log("Valid phone number:", input);
    return true
  } else if (isValidEmail) {
    console.log("Valid email:", input);
    return true
  } else {
    if (formData2.value.loginName===''){
      phoneNumberOrEmailErrorMessage.value='邮箱或者手机号为空'
    }else {
      phoneNumberOrEmailErrorMessage.value='邮箱或者手机号无效'
    }
    console.log("Invalid account:", input);
    return false
  }
}
function     handleKeyDown(index, event) {
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

function     arrowKeyPressedLogic(index, arrowKey) {
  // Your logic for handling left or right arrow key pressed
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

function     formatDate(date) {
  const year = date.getFullYear();
  return `${year}`;
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


function     gotoSignUp(){
  phoneNumberOrEmailError.value=!validatePhoneNumberOrEmail(formData2.value.loginName)
  passwordError.value=!validatepassword(formData2.value.password)
  confirmpasswordError.value=!validatepassword(formData2.value.confirmpassword)
  //不一致
  const unanimous = formData2.value.password!==formData2.value.confirmpassword


  agreePolicyShow.value=!agreePolicy.value

  if (unanimous){
    confirmpasswordErrorMessage.value="两次输入密码不一致"
    confirmpasswordError.value=true
  }else {
    confirmpasswordErrorMessage.value=""
  }

  if (!unanimous && agreePolicy.value && !phoneNumberOrEmailError.value && !passwordError.value &&!confirmpasswordError.value) {


  }




}

</script>

<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("https://com2024.oss-cn-shenzhen.aliyuncs.com/image/login-bg-02.webp");
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
.switch-button-container{
  padding: 8px 0;
  margin-top: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.switch-button{
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.switch-button>p{
  opacity: 0.65;
  font-size: 16px;
  font-weight: 400;
}
.item-selected>p{
  opacity: 1;
}
.line{
  transform: translateY(8px);
  transition: all 0.3s ease;
  opacity: 0;
  width: 100%;
  height: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item-selected .line{
  opacity: 1;
}
.line-swiper{

  transition: all 0.3s ease;
  width: 0px;
  height: 100%;
  background-color: black;
}
.item-selected .line .line-swiper{
  width: 100%;
}
.split-line{
  margin-bottom: 10px;
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,0.15);
}

.input-container{
  width: 100%;
}
.if-input-container>p{
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 15px;
}
.input-container>p{
  font-weight: 700;
  font-size: 15px;
}
.phone-number-input{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.region{
  border: 1px solid rgba(0,0,0,0.15);
  height: 40px;
  width: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px 0 0 5px; /* 左上角和左下角有5px的圆角 */
  background-color: rgba(178, 175, 175, 0.15);
}
.phone-number-input>input{
  /*  letter-spacing: 0.5px; !* 增加字体间距 *!*/
  padding-left: 10px;
  font-size: 16px;
  border-radius: 0 5px 5px 0; /* 左上角和左下角有5px的圆角 */
  width: 85%;
  height: 100%;
  border: 1px solid rgba(0,0,0,0.15);
  border-left: none;
  outline: none;
}
.phone-number-input> input:focus{
  border-radius: 0 5px 5px 0; /* 左上角和左下角有5px的圆角 */
  outline: none;
  border: 1px solid rgba(0,0,0,0.15);
  border-left: none;
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
.registered{
  margin:10px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.registered>a{
  color: rgba(2,90,240);
  text-decoration: none; /* 这里设置为 none */
}
.split-line2{
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,0.1);
  margin: 10px 0;
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
  width: 100%;
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
.resend-code{
  opacity: 1;
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

input[type="password"]::-webkit-contacts-auto-fill-button {
  display: none;
}


.login-button{
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
  width: 100%;
  height: 44px;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.login-button:hover{
  background-color: #232323;
}
.login-button>p{
  color: white;
}
.phone-or-email{
  margin: 8px 0;
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
input::-ms-clear{display:none;}
input::-ms-reveal{display:none;}
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
.is-human-submit{
  border: 1px solid rgba(0,0,0);
  background-color: #000;
}
.is-human-submit >p{
  color: white;
  opacity: 1;
}
.phoneNumberOrEmailError{
  font-size: 14px;
  color: red;
}
.passwordError{
  font-size: 14px;
  color: red;
}


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
