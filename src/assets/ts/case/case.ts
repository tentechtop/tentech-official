const caseItem = [
    {
        caseId:1,
        title:"OCT Show room 1.538 fixed install",
        desc:"OCT Limited was ranked 1,164th in 2016 Forbes Global 2000 List. OCT Limited is a constituent of SZSE 100 Index (blue chip index) and pan-China index CSI 300 Index...",
        imgUrl:"",
        htmlText:"",
    },
]




function generateUniqueID() {
    const timestamp = new Date().getTime(); // 获取当前时间戳
    const randomPart = Math.floor(Math.random() * 1000); // 生成一个随机数，可以根据需要调整位数
    // 将时间戳和随机数拼接在一起，组成唯一的ID
    return Number(`${timestamp}${randomPart}`);
}


const allCaseItem = [
    {
        caseType:2,//行业案例还是经典案例 1行业，2经典
        caseTypeName:"经典案例",
        name:"安防监控",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/08.jpg",
        caseCategory:1,//安防监控
        desc:[
            {
                title:"安防监控系统组成",
                value:[
                    {title:"",content:"典型的监控系统主要由前端监视设备、传输设备、后端存储、控制及大屏幕显示设备这五大部分组成，其中后端设备可进一步分为中心控制设备和分控制设备。前、后端设备有多种构成方式，它们之间的联系可通过电缆、光纤等多种方式来实现。",imgUrl:[]},
                ],
            },
            {
                title:"安防监控系统应用",
                value:[
                    {title:"",content:"监控系统现在一般应用在，商场监控、小区监控、医院监控、煤矿监控、监狱监控、银行监控、学校监控。。。。。超锐丽安装监控系统的原则：",imgUrl:[]},
                    {title:"",content:"1、实时性：监控系统实时性，这点尤为重要。也正是由于监控系统的实时性才显得监控系统是那么的必要。 ",imgUrl:[]},
                    {title:"",content:"2、安全性：监控系统具有安全防范和保密措施，防止非法侵入系统及非法操作。",imgUrl:[]},
                    {title:"",content:"2、安全性：监控系统具有安全防范和保密措施，防止非法侵入系统及非法操作。",imgUrl:[]},
                    {title:"",content:"3、可扩展性：监控系统设备采用模块化结构，系统能够在监控规模、监控对象、或监控要求等发生变更时方便灵活的在硬件和软件上进行扩展，即不需要改变网络的结构和主要的软硬件设备。",imgUrl:[]},
                    {title:"",content:"4、开放性：监控系统遵循开放性原则，系统提供符合国际标准的软件、硬件、通信、网络、操作系统和数据库管理系统等诸方面的接口与工具，使系统具备良好的灵活性、兼容性、扩展性和可移植性。整个网络是一个开放系统，能兼容多家监控厂家的产品，并能支持二次开发。5、标准性：监控系统所采用的设备及技术符合国际通用标准。这点能够给您一个安心的保证。",imgUrl:[]},
                    {title:"",content:"5、灵活性：监控系统组网方式灵活，系统功能配置灵活，能够充分利用现有视频监控子系统网络资源。系统将其他子系统都融入其中，能满足不同监控单元的业务需求，软件功能全面，配置方便。",imgUrl:[]},
                    {title:"",content:"7、先进性：监控系统是在满足可靠性和实用性的前提下尽可能先进的系统。将成为一个先进、适应未来发展、可靠性高、保密性好、网络扩展简便、连接数据处理能力强、系统运行操纵简便的安防系统。",imgUrl:[]},
                    {title:"",content:"8、实用性：视频监控系统具备完成工程中所要求功能的能力和水准。系统符合本工程实际需要的国内外有关规范的要求，并且实现容易、操作方便。从用户角度出发，充分利用现有资源，尽量降低系统成本，使系统具有较高的性能价格比。",imgUrl:[]},
                ],
            },
        ],
        caseList:[
            {
                title:"江苏无锡消防指挥中心(15平方 p2)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/08.jpg",
                caseType:2,
                caseId:1,
                caseCategory:1,//安防监控
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"襄阳监狱指挥中心20平方LED屏",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/09.jpg",
                caseType:2,
                caseId:2,
                caseCategory:1,//安防监控
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"鄂尔多斯政府报告厅16 平LED屏幕",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/10.jpg",
                caseType:2,
                caseId:3,
                caseCategory:1,//安防监控
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"山东齐鲁46平LED屏指挥中心",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/10.jpg",
                caseType:2,
                caseId:4,
                caseCategory:1,//安防监控
                htmlContent:"casePage.htmlDetail",
            },
        ]
    },
    {
        caseType:2,//行业案例还是经典案例 1行业，2经典
        caseTypeName:"经典案例",
        name:"会议应用",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/01.jpg",
        caseCategory:2,//安防监控
        desc:[
            {
                title:"大、中、小网络会议套装",
                value:[
                    {title:"",content:"随着信息时代的进步，会议的需求已经进入越来越高的逼格，你们是否跟得上时代的脚步，坐在宽敞明亮高大上的办公室中，开着各种各样的会议。为此超锐丽专门针对不同的会议，精心打造了不同的会议套装类型，譬如专门针对代表会议、子公司交流会、部门会议、商务接待、媒体采访、董事会、座谈会、研讨会而设立的中大型会议套装；还有商务谈判、部门例会、小组交流等小型会议套装。",imgUrl: [
                            {title:"",value:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/12.jpg"},
                            {title:"",value:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/13.jpg"},
                        ]},
                ],
            },
        ],
        caseList:[
            {
                title:"山东省青岛市某展厅(46平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/01.jpg",
                caseType:2,
                caseId:5,
                caseCategory:2,//会议应用
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"浙江大学某监控室(15平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/14.jpg",
                caseType:2,
                caseId:6,
                caseCategory:2,//会议应用
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"河南某水厂(45平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/15.jpg",
                caseType:2,
                caseId:7,
                caseCategory:2,//会议应用
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"北京某体育馆(46平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/16.jpg",
                caseType:2,
                caseId:8,
                caseCategory:2,//会议应用
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"无锡能达某电厂(55平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/17.jpg",
                caseType:2,
                caseId:9,
                caseCategory:2,//会议应用
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"CustomerVisiting",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-03.jpg",
                caseType:2,
                caseId:9,
                caseCategory:2,//会议应用
                htmlContent:"Shenzhen tentech visual technology co.,ltd company will attending the led screen expo yearly .\n" +
                    "\n" +
                    "Above is the picture customer come to visiting our factory after the expo time ,\n" +
                    "\n" +
                    "And we also will visiting customer abroad  ..\n" +
                    "\n" +
                    "We have factory in india ,and office in Russia .Morocco.And  also will  attending the oversea expo also.",
            },
            {
                title:"OCTShowRoomFixedInstall",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-01.jpg",
                caseType:2,
                caseId:9,
                caseCategory:2,//会议应用
                htmlContent:"1. small pixel screen high resolution.\n" +
                    "\n" +
                    "2. using die-casting  cabinet ,make screen more flat.\n" +
                    "\n" +
                    "3. High refreshing.\n" +
                    "\n" +
                    "4. It is big project for the OCT GROUP .\n" +
                    "\n" +
                    "5. Led  screen play the advertising and also markable activity.\n" +
                    "\n" +
                    "6. saving electrictiy.\n" +
                    "\n" +
                    "7. Shenzhen Overseas Chinese Town Company Limited known as OCT Limited (formerly OCT Holding) is a publicly traded company based in Shenzhen, China. It is a subsidiary of state-owned Overseas Chinese Town Enterprises (or OCT Group).\n" +
                    "\n" +
                    "8. OCT Limited was incorporated in 1997.\n" +
                    "\n" +
                    "9. OCT Limited was ranked 1,164th in 2016 Forbes Global 2000 List. OCT Limited is a constituent of SZSE 100 Index (blue chip index) and pan-China index CSI 300 Index.",
            },
            {
                title:"CustomShapeScreen",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-02.jpg",
                caseType:2,
                caseId:9,
                caseCategory:2,//会议应用
                htmlContent:"Shenzhen tentech visual technology co.,ltd company will attending the led screen expo yearly .\n" +
                    "\n" +
                    "Above is the picture customer come to visiting our factory after the expo time ,\n" +
                    "\n" +
                    "And we also will visiting customer abroad  ..\n" +
                    "\n" +
                    "We have factory in india ,and office in Russia .Morocco.And  also will  attending the oversea expo also.",
            },
            {
                title:"PerfectEffectiveIndoorFixedProject",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-04.jpg",
                caseType:2,
                caseId:9,
                caseCategory:2,//会议应用
                htmlContent:"Shenzhen tentech visual technology co.,ltd company will attending the led screen expo yearly .\n" +
                    "\n" +
                    "Above is the picture customer come to visiting our factory after the expo time ,\n" +
                    "\n" +
                    "And we also will visiting customer abroad  ..\n" +
                    "\n" +
                    "We have factory in india ,and office in Russia .Morocco.And  also will  attending the oversea expo also.",
            },
        ]
    },
    {
        caseType:2,//行业案例还是经典案例 1行业，2经典
        caseTypeName:"经典案例",
        name:"展览展示",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/18.jpg",
        caseCategory:3,//安防监控
        desc:[
            {
                title:"展览展示系统组成",
                value:[
                    {title:"",content:"展览展示系统组成，通常都是由几行几列拼接屏（大尺寸液晶显示器、DLP、液晶拼接屏）、图像处理器等等组成的大屏幕系统，在大屏幕液晶和触摸屏上灵活组合视频、音频、动画，图片信息和字幕，向客户有效传递企业的营销、宣传信息，发布公告，促进互动。",imgUrl: []},
                ],
            },
            {
                title:"展览展示系统应用",
                value:[
                    {title:"",content:"大型商场、电视演播厅、会展中心、餐厅展示、酒店展示、品牌专卖店、等等。",imgUrl: []},
                ],
            },
            {
                title:"超锐丽展览展示系统实现功能",
                value:[
                    {title:"",content:"1、系统灵活组合网页、视频、音频、动画，图片信息和字幕等信息。",imgUrl: []},
                    {title:"",content:"2、系统提供天气、时间、外汇、汇率等几十个节目元素组件，方便各类节目内容制作，并实现后台生产、业务系统数据库连接。  ",imgUrl: []},
                    {title:"",content:"3、屏幕区域可随意分割、实现各个区域显示的不同播放内容，所见所得。",imgUrl: []},
                    {title:"",content:"4、西戎自带大量模版可供客户选择、系统提供形象宣传、业务介绍、通知公告、安全提示、等几十余张模版。用户也可以自行设计生产新的模版。",imgUrl: []},
                    {title:"",content:"5、场景选项参数灵活设置、如随机播放、播放次数、每轮播放重复数，切换效果，播放时段、北京音乐等等。",imgUrl: []},
                ],
            },
        ],
        caseList:[
            {
                title:"南通市网鱼网咖电竞馆(15平LED显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/18.jpg",
                caseType:2,
                caseId:10,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"黄梅法院(46平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/19.jpg",
                caseType:2,
                caseId:11,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"复旦大学(30平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/20.jpg",
                caseType:2,
                caseId:12,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"易创视听科技展厅(46平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/21.jpg",
                caseType:2,
                caseId:13,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"余姚商会大厦(47平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/22.jpg",
                caseType:2,
                caseId:14,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"利星行奔驰4S店(55平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/23.jpg",
                caseType:2,
                caseId:15,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"雅江电视台(26平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/24.jpg",
                caseType:2,
                caseId:16,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"贵州茅台(25平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/25.jpg",
                caseType:2,
                caseId:17,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"湖北京山展厅(26平LED屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/26.jpg",
                caseType:2,
                caseId:18,
                caseCategory:3,//展览展示
                htmlContent:"casePage.htmlDetail",
            },

        ]
    },
    {
        caseType:2,//行业案例还是经典案例 1行业，2经典
        caseTypeName:"经典案例",
        name:"指挥调度",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/27.jpg",
        caseCategory:4,//安防监控
        desc:[
            {
                title:"指挥调度系统组成",
                value:[
                    {title:"",content:"视频指挥调度系统是一套整合音视频业务、数据业务、网络通信技术，并集可视化指挥调度、视频会议、网络视频监控、应急预案为一体的音视频实时交互平台。可助力公安、部队实现无限沟通。",imgUrl: []},
                ],
            },
            {
                title:"指挥调度系统应用",
                value:[
                    {title:"",content:"公安系统、交通系统、铁路系统、军事演习。",imgUrl: []},
                ],
            },
            {
                title:"超锐丽展览展示系统实现功能：",
                value:[
                    {title:"",content:"1、语音、数据、视频三网融合调度； 远程语音、视频应急指挥调度；",imgUrl: []},
                    {title:"",content:"2、跨区域/跨军种实现多级、协同应急调度； 作战指挥车现场调度，卫星回传；",imgUrl: []},
                    {title:"",content:"3、远程一键召开多部门紧急会议； 远程调度特殊场所视频监控系统；",imgUrl: []},
                    {title:"",content:"4、融合常规军队专用集群系统，实现无缝通信；",imgUrl: []},
                    {title:"",content:"5、对指挥调度终端的权限、指挥命令、信令通信进行管理，控制视频的传输路由，同时负责与其它设备兼容时的协议分析与转换，提供视频转发接入功能。通过对指挥调度终端、可视化会商终端的管理实现多媒体视频会议、可视化指挥调度、网络监控、应急预案等多项功能。",imgUrl: []},
                ],
            },
        ],
        caseList:[
            {
                title:"公安局总指挥中心(36平led显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/27.jpg",
                caseType:2,
                caseId:19,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"平度指挥中心(35平led显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/28.jpg",
                caseType:2,
                caseId:20,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"中卫市指挥室(28平led显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/29.jpg",
                caseType:2,
                caseId:21,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"苏州燃气集团指挥系统(45平led 显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/30.jpg",
                caseType:2,
                caseId:22,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"西安污水处理厂(26平led显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/31.jpg",
                caseType:2,
                caseId:23,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"郑州航空港区平台(35平led 显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/32.jpg",
                caseType:2,
                caseId:24,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"上海迪士尼指挥中心(35平led 显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/33.jpg",
                caseType:2,
                caseId:25,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"长春森林防火监控(15平led显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/34.jpg",
                caseType:2,
                caseId:26,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
            {
                title:"部队作战指挥中心(25平led显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/35.jpg",
                caseType:2,
                caseId:27,
                caseCategory:4,//展览展示
                htmlContent:"casePage.htmlDetail",
            },
        ]
    },
    {
        caseType:2,//行业案例还是经典案例 1行业，2经典
        caseTypeName:"经典案例",
        name:"教育培训",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/02.jpg",
        caseCategory:5,//安防监控
        desc:[
            {
                title:"教育培训系统组成",
                value:[
                    {title:"",content:"教育培训系统主要是由电子演讲台、大屏幕显示系统、功放音响、教学设备等等。大屏幕在各行业的应用不仅有效提升效率、促进行业发展，在教育行业当中，更是为教育事业注入动力，大屏幕系统无论是用作教学还是安全监控，都能有效促进教育事业的发展。展现于教室，能够提升课堂的互动性，使课堂变得容易，课堂气氛更加活跃，有效提升教学效果。还可以进行校园监控，考试监视等等。促进学校更细分、更全面的管理监控。",imgUrl:[]},
                ],
            },
            {
                title:"教育培训系统应用",
                value:[
                    {title:"",content:"学校多媒体、培训学校中心、酒店培训中心、校园安全监控大屏幕、电子考场监控、网络教学系统、互动教学系统、远程教学系统等等。",imgUrl:[]},
                ],
            },
            {
                title:"超锐丽系统实现功能：",
                value:[
                    {title:"",content:"1、大屏幕控制系统对大屏幕硬件提供了强大的资源管理功能，不但支持本地控制还支持远程控制。所有控制均可在一台电脑上完成，控制内容含盖了如开大屏幕，对亮度、对比度、信号切换、信号监控等功能。 ",imgUrl:[]},
                    {title:"",content:"2、具有在监控计算机虚拟屏上实时显示大屏幕窗口进程名称的反馈功能。具有此功能，可实现监控人员在任意位置对大屏幕显示系统的盲控操作。 ",imgUrl:[]},
                    {title:"",content:"3、教育培训系统提供互动教学可以利用题干或者触摸的形式提高课堂的趣味性。",imgUrl:[]},
                    {title:"",content:"4、提供权限设置功能，使不同用户拥有不同权限完成对大屏幕的不同层次的操作。 ",imgUrl:[]},
                    {title:"",content:"5、具有光源时间统计报警功能。可利用在大屏幕系统软件中读取统计数值。 ",imgUrl:[]},
                ],
            },
        ],
        caseList:[
            {
                title:"上海某实验学校(25平方led 显示屏)",
                coverImgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/02.jpg",
                caseType:2,
                caseId:28,
                caseCategory:5,//教育培训
                htmlContent:"casePage.htmlDetail",
            },
        ]
    },
]
allCaseItem.forEach((aCase,aIndex)=>{
    aCase.caseList.forEach((caseM,MIndex)=>{
        const stringId = Number(`${aIndex+1}${MIndex+1}`)
        caseM.caseId = stringId
    })
} )


let caseSeriesList  = []
let seriesItemMap = new Map()


let caseDetailList = []
let caseDetailMap = new Map()

allCaseItem.forEach((cs,cIndex)=>{
    cs.caseCategory=cIndex+1
    seriesItemMap.set(cs.caseCategory,cs)
    cs.caseList.forEach((cItem,cIndex)=>{
        caseDetailList.push(cItem)
        caseDetailMap.set(cItem.caseId,cItem)
    })

})

caseSeriesList = allCaseItem





export default {
    caseSeriesList,seriesItemMap,caseDetailList,caseDetailMap
}