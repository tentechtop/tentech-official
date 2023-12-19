<template>
  <div v-if="!whiteList.includes(route.path)">
    <div v-if="!isShowChatWindows" class="root-page"
         @mouseleave="isMouseOver=false"
         @mouseover="isMouseOver=true"
         @click="isShowChatWindows = true"
    >
      <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/human1.svg">
    </div>


    <div v-if="!isShowChatWindows" class="card-container" :class="{hoverCard:isMouseOver}"
         @mouseleave="isMouseOver=false"
         @mouseover="isMouseOver=true">
      <div class="card">
        <div class="card-item call-phone">
          <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/24gf-phoneLoudspeaker.svg">
          <div class="phone-number">
            <p>热线服务</p>
            <h1>4008786861</h1>
          </div>

        </div>
        <div class="card-line"></div>
        <div class="card-item contact">
          <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/message.svg">
          <p>在线沟通:</p>
          <a href="https://work.weixin.qq.com/kfid/kfc074a672e3be7ec8a" target="_blank" class="contact-button">
            立即联系
          </a>
        </div>
        <div class="card-line"></div>
        <div class="card-item more-contact"
             @click="gotoTargetPage"
        >
          <div>在线线留言咨询</div>
          <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/right-arrow.svg">
        </div>
      </div>

      <div class="noshow-card">

      </div>
    </div>




    <div  class="chat-windows" :class="{'show-chat-windows':isShowChatWindows}">
      <div class="windows-header">
        <div class="chat-logo-container">
          <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/20231019165013.png">
          <div class="welcome">
            <h1>Hi,您好</h1>
            <p>很高兴很为您服务，服务热线：4008786861</p>
          </div>


        </div>
        <div class="close-button" @click="isShowChatWindows=false;isMouseOver=false">
          <div class="close-line" ></div>
        </div>
      </div>
      <div class="chat-message-container" ref="chatListDom">
        <div class="message-item" v-for="item of messageList.filter((v) => v.role !== 'system')">
          <div class="user-message-content" v-if="item.role === 'user'" :class="item.role === 'user'? 'user-message':'service-message'">
            <div class="user-message-item"
                 v-if="item.content"
                 v-html="md.render(item.content)"></div>
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/cust2.png">
          </div>
          <div class="user-message-content" v-if="item.role !== 'user'" :class="item.role === 'user'? 'user-message':'service-message'">
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/ServiceLogo.png">
            <!--            v-html="md.render(item.content).replace(/<li>/g, `<li style='opacity: 1;margin:0 15px'> `)"-->
            <div class="no-user-message-item"
                 v-if="item.content"
                 v-html="getHtml(item.content)"
            ></div>
          </div>
        </div>
      </div>
      <div class="message-send-container">
        <div class="service-level-container">
          <div class="human-service">
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/human-service.svg">
            <a href="https://work.weixin.qq.com/kfid/kfc074a672e3be7ec8a" target="_blank" >转人工</a>
          </div>
        </div>

        <div class="message-container">
          <textarea class="message-input" placeholder="很高兴为您服务，请输入您的问题"
                    v-model="messageContent"
                    @keydown.enter="isTalking || sendOrSave()"
          ></textarea>
        </div>
        <div class="send-message-button-container">
          <div class="send-message-button"  :class="{available:getAvailableButton()}" @click="sendOrSave()">
            发送
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
import { ref, watch, nextTick, onMounted } from "vue";
import { chat } from "../assets/libs/gpt";
import type {ChatMessage} from "../assets/types";
import cryptoJS from "crypto-js";
import keywordsList from "../assets/keywordsChat/keywordsList";
import keywordsArray from "../assets/keywordsChat/keywordsArray";

function gotoTargetPage(){
  router.push({ path: '/leave-message' })
}

function isStringAllSpaces(inputString) {
  // 使用trim()方法去掉字符串两端的空格，然后检查结果是否为空字符串
  return inputString.trim() === '';
}

function getAvailableButton(){
  if (isStringAllSpaces(messageContent.value) ||messageContent.value.length===0 || isTalking===true ){
    messageContent.value ='';
    return false;
  }else {
    return true
  }
}



const whiteList = ref(["/login", "/reset-password","/sign-up"]); // 不需要渲染的名单


let apiKey = "sk-7eLfqi1P7HpkQswwrRqULae0Ocbjru8plvZGtiM";
let isConfig = ref(true);
let isTalking = ref(false);
const isMouseOver = ref(false)
let messageContent = ref("");

const isShowChatWindows = ref(false)
function getHtml(content){
  let html = md.render(content).replace(/<li>/g, `<li style='opacity: 1;margin-left:15px'> `)
  return html.replace(/<p>.*?<img.*?<\/p>/g, (match: string) => {
    return match.replace(/<img/g, '<img style="max-width: 200px; max-height: 200px"')
  });
}

const decoder = new TextDecoder("utf-8");
const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" };
import { md } from "../assets/libs/markdown";
let keywords = keywordsArray.keywordsArrayList; // 添加你的关键词
const messageList = ref<ChatMessage[]>([
  /*调教 将chatGPT带入角色*/
  {
    role: "system",
    content: "你是深圳市全德视讯科技有限公司的智能客服名字是全德英文名字是Tentech,你是公司的员工不要用'他们'这样的词，要用我们或者我们公司，" +
        "你职责是：" +
        "1.提供产品信息和支持：回答客户关于公司产品的问题，提供详细的产品信息和技术支持。包括产品功能、规格、价格、可用性等方面的咨询。" +
        "2.解决问题和投诉：协助客户解决产品使用中遇到的问题，处理客户的投诉和问题，确保客户满意。" +
        "3.提供培训和指导：为客户提供关于产品的培训和指导，以确保他们能够有效地使用产品。包括编写和维护用户手册、视频教程等。" +
        "4.技术支持：为客户提供技术支持，协助解决与产品相关的技术问题。包括与工程团队合作解决更复杂的技术问题。" +
        "公司的主营产品是:LED显示屏" +
        "公司地址:深圳市光明区玉塘街道田寮社区第五工业区14栋2楼A" +
        "公司邮箱: flamehu@tentech-leddisplay.com"+
        "公司电话:+86-15818643042"+
        "主营:：国内贸易、货物及技术进出口，许可经营项目是：电子产品、LED显示屏、发光二极管、大屏幕显示设备、航空箱及配件、木板材料、大屏幕控制器及相关硬件、LED显示屏五金配件、LED照明、激光灯应用、音响设备及器材的生产、加工销售与技术研发"+
        "成立日期:2019-01-25",
  },
  {
    role: "assistant",
    content: `您好，我是全德视讯科技有限公司的智能客服，我可以提供一些常用服务和信息。如果你有任何可以随时向我提问。`,
  },

]);

const chatListDom = ref(null);


const scrollToBottom = () => {
  if (!chatListDom.value) return;

  if (chatListDom.value) {
    chatListDom.value.scrollTop = chatListDom.value.scrollHeight;
  }
};

watch(messageList.value, () => nextTick(() => scrollToBottom()));

const openWebsite = () => {
  /*  const windowFeatures = 'width=1000,height=600,top=200,left=450,toolbar=no';
    // 使用 window.open() 打开指定网页，并设置窗口特性
    window.open('https://www.tentech.top', '_blank', windowFeatures);*/
};

onMounted(() => {
  if (getAPIKey()) {
    switchConfigStatus();
  }
});

const appendLastMessageContent = (content: string) =>
    (messageList.value[messageList.value.length - 1].content += content);
const sendChatMessage = async (content: string = messageContent.value) => {
  try {
    isTalking.value = true;
    if (messageList.value.length === 2) {
      messageList.value.pop();
    }
    messageList.value.push({ role: "user", content });
    clearMessageContent();
    messageList.value.push({ role: "assistant", content: "" });

    const { body, status } = await chat(messageList.value, getAPIKey());
    if (body) {
      const reader = body.getReader();
      await readStream(reader, status);
    }
  } catch (error: any) {
    appendLastMessageContent(error);
  } finally {
    isTalking.value = false;
  }
};
const readStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    status: number
) => {
  let partialLine = "";

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read();
    if (done) break;

    const decodedText = decoder.decode(value, { stream: true });

    if (status !== 200) {
      const json = JSON.parse(decodedText); // start with "data: "
      const content = json.error.message ?? decodedText;
      appendLastMessageContent(content);
      return;
    }

    const chunk = partialLine + decodedText;
    const newLines = chunk.split(/\r?\n/);

    partialLine = newLines.pop() ?? "";

    for (const line of newLines) {
      if (line.length === 0) continue; // ignore empty message
      if (line.startsWith(":")) continue; // ignore sse comment message
      if (line === "data: [DONE]") return; //

      const json = JSON.parse(line.substring(6)); // start with "data: "
      const content =
          status === 200
              ? json.choices[0].delta.content ?? ""
              : json.error.message;
      appendLastMessageContent(content);
    }
  }
};
const sendOrSave = () => {
  if (isStringAllSpaces(messageContent.value) ||messageContent.value.length===0 || isTalking===true ){
    messageContent.value ='';
    return;
  }
  if (isConfig.value) {
    if (saveAPIKey(messageContent.value.trim())) {
      switchConfigStatus();
    }
    clearMessageContent();
  } else {
    const content = messageContent.value.trim()
    let index = isKeywordHit(content, keywords)
    if (index !== -1) {
      // 如果包含关键词
      keywordsChat(index);
    } else {
      sendChatMessage();
    }
  }
};


//余弦相似度 处理英文
function cosineSimilarity(str1, str2) {
  // 将字符串转换为词语数组
  const tokenize = (str) => str.toLowerCase().match(/\w+/g) || [];

  const tokens1 = tokenize(str1);
  const tokens2 = tokenize(str2);

  // 创建词频向量
  const vector1 = {};
  const vector2 = {};

  tokens1.forEach((token) => {
    vector1[token] = (vector1[token] || 0) + 1;
  });

  tokens2.forEach((token) => {
    vector2[token] = (vector2[token] || 0) + 1;
  });

  // 计算余弦相似度
  const dotProduct = Object.keys(vector1).reduce((acc, token) => {
    return acc + (vector1[token] || 0) * (vector2[token] || 0);
  }, 0);

  const magnitude1 = Math.sqrt(Object.keys(vector1).reduce((acc, token) => {
    return acc + Math.pow(vector1[token] || 0, 2);
  }, 0));

  const magnitude2 = Math.sqrt(Object.keys(vector2).reduce((acc, token) => {
    return acc + Math.pow(vector2[token] || 0, 2);
  }, 0));

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;  // 处理零向量
  }

  return dotProduct / (magnitude1 * magnitude2);
}


//编辑距离相似度
function similarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  const editDistance = new Array(longerLength + 1);
  for (let i = 0; i <= longerLength; i++) {
    editDistance[i] = new Array(shorter.length + 1);
    editDistance[i][0] = i;
  }
  for (let j = 0; j <= shorter.length; j++) {
    editDistance[0][j] = j;
  }
  for (let i = 1; i <= longerLength; i++) {
    for (let j = 1; j <= shorter.length; j++) {
      const cost = longer[i - 1] === shorter[j - 1] ? 0 : 1;
      editDistance[i][j] = Math.min(
          editDistance[i - 1][j] + 1,
          editDistance[i][j - 1] + 1,
          editDistance[i - 1][j - 1] + cost
      );
    }
  }
  const maxLen = Math.max(str1.length, str2.length);
  const editDistanceValue = editDistance[longerLength][shorter.length];
  const similarity = (1.0 - editDistanceValue / maxLen);
  return similarity;
}
const similarThreshold = 0.75; // 设置相似度阈值
function isKeywordHit(content) {
  let keywordsArray = keywords
  const matchingIndices = [];
  for (let i = 0; i < keywordsArray.length; i++) {
    const keywords = keywordsArray[i];
    if (keywords.some(keyword => similarity(content, keyword) >= similarThreshold)) {
      matchingIndices.push(i);
    }
  }
  if (matchingIndices.length>0){
    return matchingIndices[0];
  }else {
    return -1;
  }
}

function keywordsChat(index){
  let content = ""
  content = messageContent.value
  isTalking.value = true;
  if (messageList.value.length === 2) {
    messageList.value.pop();
  }
  messageList.value.push({ role: "user", content });
  clearMessageContent();
  let message = ""
  if (keywordsArray.keywordsMap.get(index)){
    message = keywordsArray.keywordsMap.get(index).message
  }
  messageList.value.push({ role: "assistant", content: "" });

  const messageChunks = message.split(""); // 拆分消息成字符数组
  let currentIndex = 0;

  /*流式输出*/
  const addMessage = () => {
    if (currentIndex < messageChunks.length) {
      messageList.value[messageList.value.length-1].content += messageChunks[currentIndex];
      currentIndex++;
      if (currentIndex < messageChunks.length) {
        setTimeout(addMessage, 20); // 每隔1秒添加下一个字符
      } else {
        isTalking.value = false;
      }
    }
  };
  // 开始添加消息字符
  addMessage();
}

const saveAPIKey = (apiKey: string) => {
  if (apiKey.slice(0, 3) !== "sk-" || apiKey.length !== 51) {
    alert("API Key 错误，请检查后重新输入！");
    return false;
  }
  const aesAPIKey = cryptoJS.AES.encrypt(apiKey, getSecretKey()).toString();
  localStorage.setItem("apiKey", aesAPIKey);
  return true;
};
const getAPIKey = () => {
  if (apiKey) return apiKey;
  const aesAPIKey = localStorage.getItem("apiKey") ?? "";
  apiKey = cryptoJS.AES.decrypt(aesAPIKey, getSecretKey()).toString(
      cryptoJS.enc.Utf8
  );
  return apiKey;
};
const getSecretKey = () => "lianginx";
const switchConfigStatus = () => (isConfig.value = !isConfig.value);
const clearMessageContent = () => (messageContent.value = "");

</script>

<style scoped>
.root-page{
  outline: 2px solid rgba(255,255,255,0.55);
  padding: 8px 0;
  z-index: 9999;
  cursor: pointer;
  right: 7px;
  bottom: 65px;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  max-width: 50px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #0d7ae1;
  animation: breathing 1s ease 0s infinite alternate;
  overflow: hidden;
}

@keyframes breathing {
  0% {
    box-shadow: 0 0 5px 2px rgba(2, 70, 255, 0.2);
  }

  100% {
    box-shadow: 0 0 7px 3px rgba(2, 70, 255, 0.8);
  }
}

@keyframes breathing-deep {
  0% {
    box-shadow: 0 0 5px 2px rgba(2, 70, 255, 0.3);
  }

  100% {
    box-shadow: 0 0 10px 6px rgba(2, 70, 255, 0.8);
  }
}
.root-page>img{
  width: 25px;
  object-fit: cover;
}
.root-page>p{
  width: 30%;
  text-align: center;
  font-size: 11px;
  color: white;
}
.customer{
  width: 50px;
  height: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.customer>img{
  width: 42px;
  object-fit: cover;
  border-radius: 100px;
}
.card-container{
  overflow: hidden;
  z-index: 9999;
  cursor: pointer;
  height: 221px;
  width: 240px;
  transform: translateX(320px);
  opacity: 0;
  right: 15px;
  bottom: 35px;
  position: fixed;
  transition: height 0.2s ease,width 0.5s ease,transform 0s ease,opacity 0.6s ease;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-color: transparent;
  border-radius: 10px;
}
.hoverCard{
  transition: transform 0.5s ease;
  transform: translateX(-25px);
  opacity: 1;
}
.card{
  z-index: 9999;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px  5px 2px rgba(0, 0, 0, 0.2);
  height: 220px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.noshow-card{
  height: 100px;
  width: 10px;
  opacity: 0;
}
.card >h1{
  color: rgba(0,0,0,0.65);
  font-size: 13px;
}
.chat-windows{
  transition: all 0.3s ease;
  opacity: 0;
  height: 0;
  z-index: 9999;
  position: fixed;
  right: 45px;
  bottom: 20px;
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 8px 8px rgba(100, 100, 100, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.windows-header{
  background-image: url("https://tentech.oss-cn-shenzhen.aliyuncs.com/custom/20231019162909.png");
  background-size: cover;
  z-index: 3;
  top: 0;
  position: sticky;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}
.chat-logo-container{
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.chat-logo-container>img{
  width: 50px;
  object-fit: cover;
  border-radius: 1000px;
  margin-right: 6px;
}
.chat-logo-container>p{
  color: #fff;
}
.welcome{
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.welcome>h1{
  font-size: 16px;
  color: #fff;
}
.welcome>p{
  font-weight: 100;
  font-size: 12px;
  color: #fff;
}
.show-chat-windows{
  opacity: 1;
  height: 560px;
}

.close-line{

  width: 20px;
  height: 3px;
  background-color: #fff;
}
.close-button{
  margin-right: 20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.chat-message-container{
  z-index: 2;
  width: 100%;
  height: 60%;
  background-color: #f3f3f3;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.message-send-container{
  border-top: 1px solid rgba(0,0,0,0.15);
  width: 100%;
  height: calc(40% - 60px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.service-level-container{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.human-service{
  cursor: pointer;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.human-service>img{
  margin-right: 6px;
  width: 20px;
}
.human-service>a{
  font-size: 12px;
  color: #005ABC;
}
.message-container{
  width: 100%;
  min-height: 50px;
}
.message-input{
  padding: 0 10px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  white-space: pre-wrap;
  resize: none; /* 禁止用户手动调整大小 */
  color: black; /* 设置字体颜色为黑色 */
  font-style:normal;
}
.message-input:focus{
  border: none;
  outline: none;
}
.send-message-button-container{
  padding: 0px 20px ;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.send-message-button{
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid rgba(0,0,0,0.25);
  padding: 4px 18px;
  background-color: #fff;
  color: rgba(0,0,0,0.55);
}
.message-item{
  padding: 8px 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

}
.user-message-content{
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.user-message{
  justify-content: flex-end;
}
.user-message>img{
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 5000px;
}
.service-message{

  justify-content: flex-start;
}
.service-message>img{
  width: 30px;
  object-fit: cover;
  border-radius: 5000px;
}
.no-user-message-item{
  overflow: hidden;
  color: #000;
  font-size: 14px;
  border-radius: 5px;
  background-color: #fff;
  padding:  5px;
  margin-left: 5px;

}
.no-user-message-item >p >img{
  max-width: 200px;
  max-height: 200px;
}

.user-message-item{
  color: #fff;
  border-radius: 5px;
  background-color: #38A1DF;
  padding: 5px;
  margin-right: 5px;
  font-size: 14px;
}
.card-item{
  width: 100%;
  height: 32%;
}
.card-line{
  width: 90%;
  height: 2px;
  background-color: rgba(0,0,0,0.2);
}
.call-phone{
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.call-phone>img{
  width: 20px;
  margin-right: 8px;
}
.phone-number{
  display: flex;
  flex-direction: column;
}
.phone-number>p{
  color: black;
  font-size: 16px;
}
.phone-number>h1{
  color: #0d7ae1;
  font-size: 18px;
}
.contact{
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.contact>img{
  width: 20px;
  margin-right: 8px;
}
.contact>p{
  font-size: 16px;
  color: #000;
  margin-right: 8px;
}
.contact-button{
  padding: 6px 12px;
  background-color: #004e98;
  color: #fff;
  font-size: 14px;
}
.more-contact{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.more-contact>img{
  width: 14px;
}
.more-contact>p{
  margin-right: 8px;
  font-size: 16px;
}
.hot-question{
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hot-question-container{
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.available{
  background-color: #0060E7;
  color: #fff;
  border: 1px solid rgba(0,0,0,0);
}
@media screen and (max-width: 1023px){
  .chat-windows{
    right: 16px;

  }

}
@media screen  and (max-width: 480px){
  .customer>img{
    width: 40px;
  }
  .customer{
    width: 40px;
    height: 40px;
  }
  .root-page{
    width: 40px;
    height: 40px;
  }
  .hoverCard{
    height:52px;
    width:240px;
    transform: translateX(-40px);
    opacity: 1;
  }
  .card >h1{
    font-size: 12px;
  }
  .chat-windows{
    right: 0px;
    width: 100%;
    margin: 0 16px;
  }

}
</style>
