const language = [
    {language:"zh", enName:"Chinese Simplified", label:"简体中文", alias:"zh-cn", desc:"简体中文是中国大陆通用的汉字书写系统。",flag:"https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/zh.svg", region: "中国大陆", isHover:false,isSelected:false},
    {language:"en", enName:"English", label:"English", alias:"en-us", desc:"英语是全球最为广泛使用的国际语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/us.svg", region: "United States", isHover:false,isSelected:false},
//    {language:"es", enName:"Spanish", label:"Español", alias:"es-es", desc:"Español是西班牙语，是西班牙和拉丁美洲国家的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/es.svg", region: "España", isHover:false,isSelected:false},
//    {language:"fra", enName:"French", label:"Français", alias:"fr-fr", desc:"Français是法语，是法国及多个非洲和加勒比海地区国家的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/fr.svg", region: "France", isHover:false,isSelected:false},
//     {language:"de", enName:"German", label:"Deutsch", alias:"de-de", desc:"Deutsch是德语，是德国、奥地利、瑞士等国家的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/de.svg", region: "Deutschland", isHover:false,isSelected:false},
//    {language:"ja", enName:"Japanese", label:"日本語", alias:"ja-jp", desc:"日本語是日本的官方语言，使用日本的独特汉字和假名书写系统。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/ja.svg", region: "日本", isHover:false,isSelected:false},
//    {language:"kr", enName:"Korean", label:"한국어", alias:"ko-kr", desc:"한국어是韩国的官方语言，使用韩文（朝鲜文）书写。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/ko.svg", region: "대한민국", isHover:false,isSelected:false},
//     {language:"pt", enName:"Portuguese", label:"Português", alias:"pt-pt", desc:"Português是葡萄牙语，是葡萄牙、巴西等国家的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/pt.svg", region: "Portugal", isHover:false,isSelected:false},
//     {language:"it", enName:"Italian", label:"Italiano", alias:"it-it", desc:"Italiano是意大利语，是意大利及瑞士的一种官方语言。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/it.svg", region: "Italia", isHover:false,isSelected:false},
//     {language:"ru", enName:"Russian", label:"Русский", alias:"ru-ru", desc:"Русский是俄语，是俄罗斯和一些前苏联国家的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/ru.svg", region: "Россия", isHover:false,isSelected:false},
//     {language:"ar", enName:"Arabic", label:"العربية", alias:"ar-ar", desc:"العربية是阿拉伯语，是阿拉伯联盟的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/ar.svg", region: "العالم العربي", isHover:false,isSelected:false},
//     {language:"hi", enName:"Hindi", label:"हिन्दी", alias:"hi-in", desc:"हिन्दी是印地语，是印度的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/hi.svg", region: "भारत", isHover:false,isSelected:false},
//     {language:"vi", enName:"Vietnamese", label:"Tiếng Việt", alias:"vi-vn", desc:"Tiếng Việt是越南语，是越南的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/vi.svg", region: "Việt Nam", isHover:false,isSelected:false},
//     {language:"id", enName:"Indonesian", label:"Bahasa Indonesia", alias:"id-id", desc:"Bahasa Indonesia是印尼语，是印度尼西亚的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/id.svg", region: "Indonesia", isHover:false,isSelected:false},
//     {language:"th", enName:"Thai", label:"ไทย", alias:"th-th", desc:"ไทย是id，是泰国的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/th.svg", region: "ประเทศไทย", isHover:false,isSelected:false},
//     {language:"nl", enName:"Dutch", label:"Nederlands", alias:"nl-nl", desc:"Nederlands是荷兰语，是荷兰和比利时的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/nl.svg", region: "Nederland", isHover:false,isSelected:false},
//     {language:"sv", enName:"Swedish", label:"Svenska", alias:"sv-se", desc:"Svenska是瑞典语，是瑞典和芬兰的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/sv.svg", region: "Sverige", isHover:false,isSelected:false},
//     {language:"pl", enName:"Polish", label:"Polski", alias:"pl-pl", desc:"Polski是波兰语，是波兰的官方语言之一。",flag: "https://tentech.oss-cn-shenzhen.aliyuncs.com/flags/pl.svg", region: "Polska", isHover:false,isSelected:false},
];




//label对照
const LanguageComparison = new Map()


const LanguageMap = new Map()
language.forEach((lang)=>{
    LanguageComparison.set(lang.language,lang.label)
    LanguageMap.set(lang.language,lang)
})
export default {
    language,LanguageComparison,LanguageMap
}