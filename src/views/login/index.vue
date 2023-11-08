<template>
  <div class="container">
    <div v-if="isWechatLogin" class="wechat-type-login-container" @click="openOrCloseDialog()">
      <div class="wechat-qrcode-container">
        <h1>微信登录</h1>
        <img src="https://com2024.oss-cn-shenzhen.aliyuncs.com/image/remote-experience-qr.png">
        <p>使用微信扫一扫登录全德视讯</p>
      </div>
    </div>
    <div class="login-center-container">
      <div class="info-container">
        <div class="header"></div>
        <div class="login-view-container">
          <div class="login-card">
            <div class="login-card-header">
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
            <div v-if="currentLoginType===1" class="input-container">
              <div v-if="!SendVerificationCode" class="if-input-container">
                <p ref="pleaseEnterPhone" :class="{showPhoneIsEmpty:showPhoneEmpty}">请输入手机号</p>
                <div class="phone-number-input" >
                  <div class="region">
                    <p>+{{currentRegionNumber}}</p>
                  </div>
                  <input type="text" ref="phoneNumberInput"  v-model="formData1.phoneNumBer"
                         @click="removeTips"
                         @blur="validatePhoneNumber(formData1.phoneNumBer)"/>
                </div>
                <p v-if="showPhoneFormatError" class="format-error">{{ showPhoneMessage }}</p>
                <test-human  @time-out="handleTimeOutEvent" @success-event="handleSuccessEvent" ref="childComponentRef"></test-human>
                <p v-if="showTestTip" class="no-test-tip" :class="{testYourIsHuman:showTestTip}" >请按提示完成验证!</p>
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
                  <div class="resend-button" :class="{'resend-code':resend}"
                       @click="reSendCode">
                    {{countdown===0? '':countdown}}重新发送
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
                <div class="login-button" @click="gotoLoginType1">
                  <p>登录</p>
                </div>
              </div>
              <div class="registered">
                <p>新用户？</p><router-link to="/sign-up">注册全德视讯账号</router-link>
              </div>
              <div class="other-login-type">
                <div class="other-line"></div>
                <p>或</p>
                <div class="other-line"></div>
              </div>
              <div class="wechat-login-container" @click="openOrCloseDialog()">
                <img src="https://com2024.oss-cn-shenzhen.aliyuncs.com/image/wechat-icon-login.svg">
                <p>微信登录</p>
              </div>
              <div class="agree-container">
                <p>若继续，则表示同意</p>
                <a href="/">隐私政策</a>
                <p>和</p>
                <a href="/">使用条款</a>
              </div>
              <div class="split-line2"></div>
              <div class="contact">
                <p>登录遇到问题?</p>
                <a href="/">常见问题</a>
                <a href="/">联系客服</a>
              </div>
            </div>
            <div v-if="currentLoginType===2" class="input-container">
              <p class="loginName" :class="{'login-name-error':loginNameError}">邮箱/手机号</p>
              <input class="phone-or-email" type="text" v-model="formData2.loginName"
                     @click="removeTips"
                     @blur="validatePhoneNumberOrEmail(formData2.loginName)"/>
              <p v-if="loginNameError" class="loginNameErrorMessage">{{loginNameErrorMessage}}</p>
              <p :class="{'password-error':passwordError}">密码</p>
              <div class="input-password">
                <input class="password-input" @click="passwordError=false" :type="passwordVisible ? 'text' : 'password'" v-model="formData2.passWord" @blur="validatePassword(formData2.passWord)"/>
                <img :src="passwordVisible? 'https://com2024.oss-cn-shenzhen.aliyuncs.com/image/passwordVisible.svg':'https://com2024.oss-cn-shenzhen.aliyuncs.com/image/passwordNoVisible.svg'"
                     @click="passwordVisible=!passwordVisible">
              </div>
              <p v-if="passwordError" class="passwordErrorMessage">{{passwordErrorMessage}}</p>
              <router-link to="/reset-password">忘记密码?</router-link>
              <div class="captcha pt-6">
              </div>
              <div class="login-button"  @click="gotoLoginType2">
                <p>登录</p>
              </div>
              <div class="registered">
                <p>新用户？</p><router-link to="/sign-up">注册全德视讯账号</router-link>
              </div>
              <div class="other-login-type">
                <div class="other-line"></div>
                <p>或</p>
                <div class="other-line"></div>
              </div>
              <div class="wechat-login-container" @click="openOrCloseDialog()">
                <img src="https://com2024.oss-cn-shenzhen.aliyuncs.com/image/wechat-icon-login.svg">
                <p>微信登录</p>
              </div>
              <div class="agree-container">
                <p>若继续，则表示同意</p>
                <a href="/">隐私政策</a>
                <p>和</p>
                <a href="/">使用条款</a>
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
import { useInfoStore } from '../../store/user';
const userStore = useInfoStore();
import {onBeforeUnmount, onMounted, ref,nextTick,getCurrentInstance ,onBeforeMount} from "vue";
import { useRoute, useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter()
const route = useRoute()
import user from "../../assets/user/user";
import {useOrderStore} from "../../store/order";
const showPhoneEmpty = ref(false)
const showPhoneFormatError = ref(false)
const showPhoneMessage = ref("")
const showTestTip = ref(false)
const countdown = ref(60)
const isWechatLogin = ref(false)
const agreePolicy = ref(false)
const remainingSeconds = ref(0)
const resend = ref(false)
const validateCode = ref(false)
const isHuman = ref(false)
const SendVerificationCode = ref(false)
const passwordVisible = ref(false)
const isDragging = ref(false)
const callbackUrl = ref("")
const startX = ref(0)
const offsetX = ref(0)
const formData1 = ref({
  phoneNumBer:"",
})
const code = ref([
  "",
  "",
  "",
  "",
])

const formData2 = ref({
  loginName:"",
  passWord:"",
})


const pageSEOInfo = ref({
  title: '登录全德视讯',
  description: '深圳市全德视讯有限公司成立于2015年，是一家创新型专注于生产LED 显示屏的公司，拥有自己的实力工厂，我司通过提供可靠的LED显示屏产品及LED显示屏配件，24小时咨询热线: 0755 27192472',
  keywords: 'led显示屏 ,led显示屏箱体，led显示屏工厂、显示屏生产厂家、led拼接屏，led户外显示屏，led室内屏，led显示屏租赁、led全彩显示屏、led显示屏压铸箱体，led模组、租赁led显示屏'
});

onBeforeMount(() => {
  // 在组件加载后动态设置页面标题
  document.title = pageSEOInfo.value.title;
  // 在组件加载后动态设置<meta>标签中的描述信息
  const descriptionMetaTag = document.querySelector('meta[name="description"]');
  if (descriptionMetaTag) {
    descriptionMetaTag.setAttribute('content', pageSEOInfo.value.description);
  }
  // 在组件加载后动态设置<meta>标签中的关键词信息
  const keywordsMetaTag = document.querySelector('meta[name="keywords"]');
  if (keywordsMetaTag) {
    keywordsMetaTag.setAttribute('content', pageSEOInfo.value.keywords);
  }
});

const loginNameError= ref(false)

const loginNameErrorMessage= ref("")

const passwordError= ref(false)
const passwordErrorMessage= ref("")
const phoneNumberError= ref("")
const currentRegionNumber= ref(86)
const currentLoginType= ref(2)
const switchButtonList= ref([
  {
    type:2,
    buttonTitle:"密码登录",
    isSelected:true,
  },
  {
    type:1,
    buttonTitle:"短信登录",
    isSelected:false,
  },

])
const rules= ref({
  phoneNumber:[
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { required: true, message: "手机格式不正确", trigger: "blur" }
  ],
  loginName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
})

const userList = [
  {
    userId:1,
    typeNum:1,
    userType:"user",
    userTypeName:"用户",
    userNickName:"全德视讯用户",
    userName:"12345678900",
    password:"12345678900",
    avatar:"https://com2024.oss-cn-shenzhen.aliyuncs.com/image/cust2.png",
    path:"/",
  },
  {
    userId:2,
    typeNum:2,
    userType:"service",
    userTypeName:"陪护",
    userNickName:"全德视讯护理员",
    userName:"12345678911",
    password:"12345678911",
    avatar:"https://com2024.oss-cn-shenzhen.aliyuncs.com/image/cust2.png",
    path:"/",
  },
  {
    userId:3,
    typeNum:"3",
    userType:"admin",
    userTypeName:"管理员",
    userNickName:"全德视讯数据管理员",
    userName:"12345678922",
    password:"12345678922",
    avatar:"https://com2024.oss-cn-shenzhen.aliyuncs.com/image/cust2.png",
    path:"/",
  },
]


function gotoLoginType2(){
  loginNameError.value=!validatePhoneNumberOrEmail(formData2.value.loginName)
  passwordError.value=!validatePassword(formData2.value.passWord)
  if (!loginNameError.value && !passwordError.value){
    console.log("账户和密码合法,现在开始跳转")
    const loginName = formData2.value.loginName
    const password  = formData2.value.passWord
    const user = userList.find(user => user.userName === loginName);



    if (user) {
      if (user.password === password) {
        console.log("Login successful");
        router.push({path:user.path})
        userStore.addCurrentUser(user)
      } else {
        loginNameErrorMessage.value="密码错误"
        console.log("Password incorrect");
        // Handle incorrect password
      }
    } else {

      loginNameErrorMessage.value="用户不存在"
      console.log("User not found");
      // Handle user not found
    }
  }
}


function selectLoginType(type){
  currentLoginType.value=type.type
  switchButtonList.value.forEach((item)=>{
    item.isSelected=false
  })
  type.isSelected=true
}

function reSendCode(){
  //执行重新发送的异步请求
  resend.value=false
  countdown.value=60
  startCountdown()
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

function openOrCloseDialog(){
  isWechatLogin.value=!isWechatLogin.value
  if (isWechatLogin.value) {
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
  }else {
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = '0';
  }
}

function  getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
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

function deleteKeyPressedLogic(index) {
  console.log(`Delete key pressed in input at index ${index}.`);
  if (code.value[index] !== ""){
    code.value[index] = ""
  }else {
    if (index-1>=0){
      proxy.$refs[`codeInput${index -1}`][0].focus();
    }
  }
}

function arrowKeyPressedLogic(index, arrowKey) {
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

function   gotoLoginType1(){
  if (validatePhoneNumberOrEmail(formData2.value.loginName)){

    console.log("密码有效现在开始跳转1")
  }else {
    console.log("密码无效现在开始跳转1")
  }
}

function     validatePhoneNumber(phoneNumber){
  // 校验手机号格式
  const validPhoneRegex = /^[0-9]{11}$/; // 匹配11位数字
  const isValidPhoneNumber = validPhoneRegex.test(phoneNumber);
  // 如果当前地区号是86，则手机号只能有11位
  const isValidLength = currentRegionNumber.value === 86 ? isValidPhoneNumber : true;
  if (isValidPhoneNumber && isValidLength) {
    console.log("有效的手机号")
    return true
  } else {
    console.log("无效的手机号")
    showPhoneMessage.value=formData1.value.phoneNumBer===''?'手机号码为空':'手机号码格式不正确'
    proxy.$refs.pleaseEnterPhone.style.color=formData1.value.phoneNumBer===''?'#F00':'#000'
    if (showPhoneMessage.value==='手机号码格式不正确'){
      showPhoneFormatError.value=true
    }
    return false
  }
}
function   validatePhoneNumberOrEmail(loginName) {
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
      loginNameErrorMessage.value="邮箱或手机号为空"
    }else{
      loginNameErrorMessage.value="请输入正确的手机号或邮箱"
    }
    console.log("Invalid account:", input);
    return false
  }
}

function validatePassword(password){
  /*      const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&@+=.])(?=\S+$).{6,20}$/;*/
  const passwordPattern = /^.{6,}$/;
  console.log("Password:", formData2.value.passWord);
  console.log("Pattern test result:", passwordPattern.test(formData2.value.passWord));
  if (passwordPattern.test(password)) {
    console.log("密码合法");

    return true
  } else {
    if (formData2.value.passWord===''){
      passwordErrorMessage.value="密码为空"
    }else {
      passwordErrorMessage.value="密码不合法"
    }
    console.log("密码不合法");
    // 执行密码不合法时的操作
    return false
  }
}

function   gotoSendVerificationCode(){
  if(validatePhoneNumber(formData1.value.phoneNumBer) && isHuman.value) {
    isHuman.value=true
    SendVerificationCode.value=true
    startCountdown()

  }else {
    if (formData1.value.phoneNumBer || formData1.value.phoneNumBer===''){
      showPhoneEmpty.value=true
    }
    if (isHuman.value){
      showTestTip.value=true
    }
  }
}

function removeTips(){
  showPhoneEmpty.value=false
  showPhoneFormatError.value=false
  loginNameError.value=false
}


const codeInput0 = ref(null)
const codeInput1 = ref(null)
const codeInput2 = ref(null)
const codeInput3 = ref(null)
const codeInput4 = ref(null)
const codeInput5 = ref(null)

let codeInputArray = []
codeInputArray.push(codeInput0)
codeInputArray.push(codeInput1)
codeInputArray.push(codeInput2)
codeInputArray.push(codeInput3)
codeInputArray.push(codeInput4)
codeInputArray.push(codeInput5)

function handleInput(index, value) {
  console.log("当前的codeInputRefs")
  if (value.length > 1) {
    for (let i = 0; i < value.length; i++) {
      console.log('zii',code.value.length)
      if(index+i < code.value.length){
        code.value[index+i] = value[i];
        proxy.$refs[`codeInput${index + i}`][0].focus();
      }
    }
  } else {
    this.code[index] = value;
  }
}

function    validateVerificationCode() {
  if (code.value.every(item => item.length === 1 && !isNaN(item.length))) {
    console.log("验证码有效");
    validateCode.value=true
  } else {
    console.log("验证码无效");
    // 执行无效时的操作
  }
}

function  handleSuccessEvent(payload) {
  // 接收子组件传递的消息
  console.log('Received message from child component:', payload.message);
  isHuman.value=true
  showTestTip.value=false
  // 在这里可以根据消息进行相应操作
}

function handleTimeOutEvent(payload){
  console.log('Received message from child component:', payload.message);
  isHuman.value=true
}



function  formatDate(date) {
  const year = date.getFullYear();
  return `${year}`;
}

onMounted(()=>{
  const callbackUr = route.query.callback;

  if (typeof callbackUr === "string") {
    const cleanedCallbackUrl = callbackUr.replace('vue', '');
    console.log(`Callback URL: ${cleanedCallbackUrl}`);
    callbackUrl.value = cleanedCallbackUrl;

    console.log(`Callback URL: `,callbackUrl.value);
  }



})

onBeforeUnmount(()=>{

})

</script>

<style scoped>
.container{
  max-width: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("https://com2024.oss-cn-shenzhen.aliyuncs.com/image/login.webp");
  background-size: cover;
}
.login-center-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.login-view-container{
  transition: all 0.3s ease;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}

.login-card{
  padding: 30px;
  transition: all 0.3s ease;
  width: 464px;
  min-height: 702px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.header{
  width: 100%;
  height: 0px;
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
.info-container{
  width: 100%;
  min-height: 115vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}


.login-card-header{
  width: 100%;
  margin-top: 48px;
}
.login-card-header>a>img{
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
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,0.15);
  margin-bottom: 10px;
}

.input-container{
  width: 100%;
}
.if-input-container>p{
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 15px;
}
.showPhoneIsEmpty{
  color: red;
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
  border-right: none;
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

  outline: none;
}
.phone-number-input> input:focus{
  border-radius: 0 5px 5px 0; /* 左上角和左下角有5px的圆角 */
  outline: none;
  border: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 6px rgba(42, 42, 201, 0.5); /* 添加蓝色光晕效果 */
}

.next-setup{
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
  background-color: #464646;
}
.next-setup:active {
  background-color: #151515;
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
.other-login-type{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.other-line{
  width: 45%;
  height: 1px;
  background-color: rgba(0,0,0,0.1);
}
.other-login-type>p{
  font-size: 14px;
  color: rgba(0,0,0,0.55);
}
.wechat-login-container{
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  height: 44px;
  background-color: white;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,0.15);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.wechat-login-container:hover{
  background-color: rgba(230, 230, 230, 0.25);
}
.wechat-login-container >img{
  width: 20px;
  margin-right: 3px;
}
.wechat-login-container >p{
  color: rgba(0,0,0,0.65);
}
.agree-container{
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.agree-container>p{
  font-size: 13px;
  color: rgba(0,0,0,0.45);
}
.agree-container>a{
  font-size: 13px;
  margin: 0 4px;
  color: rgba(0,0,0,0.75);
  text-decoration: none;
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

.input-password:hover {
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

.wechat-type-login-container{
  top: 0;
  z-index: 99999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wechat-qrcode-container{
  border-radius: 5px;
  padding: 24px 48px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wechat-qrcode-container>h1{
  font-size: 24px;
  opacity: 0.55;
}
.wechat-qrcode-container>img{
  width: 200px;
}
.wechat-qrcode-container>p{
  opacity: 0.55;
  font-size: 13px;
  width: 200px;
}
input::-ms-clear{display:none;}
input::-ms-reveal{display:none;}
.no-test-tip{
  font-size: 10px;
  color: red;
  font-weight: lighter;
}
.format-error{
  font-size: 10px;
  color: red;
  font-weight: lighter;
}

.testYourIsHuman{
  color: red;
}
.login-name-error{
  color: red;
}
.loginNameErrorMessage{
  color: red;
  font-size: 14px;
}
.passwordErrorMessage{
  font-size: 14px;
  color: red;
}
.password-error{
  color: red;
}




@media screen and (max-width: 1432px){
  .login-card{
    margin-right: 16px;
  }

}

@media screen and (max-width: 767px){
  .login-card{
    margin-right: 0;
  }
  .login-view-container{
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
  .login-card{
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
