import { createI18n } from 'vue-i18n';

// @ts-ignore
const messages = import.meta.globEager('../locales/*');

function getLocaleAll(): any {
    let message: any = {};
    for (const path in messages) {
        const locale = path.substr(path.lastIndexOf('/') + 1, 2);
        message[locale] = messages[path].default;
    }
    return message;
}

let i18n = createI18n({
    legacy: false,
    locale: 'zh',
    messages: getLocaleAll(),
});




export default i18n;
