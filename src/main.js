import './assets/main.css'
import { createApp,watch ,ref} from 'vue'
import { createPinia } from 'pinia'

import router from './router/index.js'
import i18n from './locales/index.ts';




import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n);



// 创建一个 ref 或 reactive 对象来保存你的 API 和工具函数




// 导航守卫，用于检测语言切换


/*watch(i18n.global.locale,(newVal)=>{
    redirectToLanguageDomain(newVal);
})
function redirectToLanguageDomain(lang) {
    localStorage.setItem('language', lang);
    const currentDomain = window.location.hostname;
    const targetDomain = `192.168.3.123:3000/${lang}`; // 替换为你的域名
    if (currentDomain !== targetDomain) {
        window.location.href = `https://${targetDomain}${window.location.pathname}`;
    }
}*/


app.mount('#app')
