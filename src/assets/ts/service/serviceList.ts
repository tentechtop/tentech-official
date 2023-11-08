import {ref} from "vue";

const serviceGuideList = [
    {
        title:"menu.serviceGuide1.title",
        content:"menu.serviceGuide1.content",
    },
    {
        title:"menu.serviceGuide2.title",
        content:"menu.serviceGuide2.content",
    },
    {
        title:"menu.serviceGuide3.title",
        content:"menu.serviceGuide3.content",
    },
    {
        title:"menu.serviceGuide4.title",
        content:"menu.serviceGuide4.content",
    },

]


const downloadList = [
    {
        helpId: 1,
        title: 'downloadList.item1.title',
        desc: 'downloadList.item1.desc',
        downloadUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/products/creative-display/customized-shape-screen/customized-shape-screen.pdf",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
]


const faqList = [
    {
        faqId: 1,
        faqTitle: "faqList.item1.faqTitle",
        faqQuestion: "faqList.item1.faqQuestion",
        faqAnswer: "faqList.item1.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 2,
        faqTitle: "faqList.item2.faqTitle",
        faqQuestion: "faqList.item2.faqQuestion",
        faqAnswer: "faqList.item2.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 3,
        faqTitle: "faqList.item3.faqTitle",
        faqQuestion: "faqList.item3.faqQuestion",
        faqAnswer: "faqList.item3.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 4,
        faqTitle: "faqList.item4.faqTitle",
        faqQuestion: "faqList.item4.faqQuestion",
        faqAnswer: "faqList.item4.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 5,
        faqTitle: "faqList.item5.faqTitle",
        faqQuestion: "faqList.item5.faqQuestion",
        faqAnswer: "faqList.item5.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 6,
        faqTitle: "faqList.item6.faqTitle",
        faqQuestion: "faqList.item6.faqQuestion",
        faqAnswer: "faqList.item6.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 7,
        faqTitle: "faqList.item7.faqTitle",
        faqQuestion: "faqList.item7.faqQuestion",
        faqAnswer: "faqList.item7.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 8,
        faqTitle: "faqList.item8.faqTitle",
        faqQuestion: "faqList.item8.faqQuestion",
        faqAnswer: "faqList.item8.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 9,
        faqTitle: "faqList.item9.faqTitle",
        faqQuestion: "faqList.item9.faqQuestion",
        faqAnswer: "faqList.item9.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    },
    {
        faqId: 10,
        faqTitle: "faqList.item10.faqTitle",
        faqQuestion: "faqList.item10.faqQuestion",
        faqAnswer: "faqList.item10.faqAnswer",
        isSelected: false,
        date: "2023-07-07",
        likeNumber: 236
    }
]


const teamServiceList = [
    {
        id:1,
        isHover:false,
        isSelected:true,
        path:"/",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/001.jpg",
        title:"Teamwork",
        descText:"",
        htmlText:"What make a company go further ? That is the teamwork  .we have a stong sales team ,QC team ,production team .and aftersales team .\n" +
            "\n" +
            "\n" +
            "\n" +
            "If you got any questions, we can solve it when u need our service .or we can do remote control for support .",
        itemColor:"#00A0D0",
    },
    {
        id:2,
        isHover:false,
        isSelected:false,
        path:"/",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/002.jpg",
        title:"Tentech Custom Service",
        descText:"",
        htmlText:"1. Quick responds: Your inquiry will be replied in 24hours.\n" +
            "2. Skilled workers: Well-trained and experienced staffs to answer all your enquiries in fluent English.\n" +
            "3. OEM&ODM: We have strong skill on and rich experience of developing products and packing for customers.\n" +
            "4. Fast and flexible delivery method: We accept Express, Freight and Container shipping. Easy handle shipping products with battery.\n" +
            "5. None Disclosure Policy: Our customer design we will not show to other customers.\n" +
            "6. Strict quality control: We have product final inspection and pre shipment inspection. 100% shipments will be checked before going out. We also welcome third party inspection arrange",
        itemColor: "#008DCA"
    },
    {
        id:3,
        isHover:false,
        isSelected:false,
        path:"/",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/003.jpg",
        title:"6000 Sqm Per Year Export",
        descText:"",
        htmlText:"Every month will shipping 2-3 40ft container to oversea.\n" +
            "\n" +
            "And hoping can shipping out more  each month and year.\n" +
            "\n" +
            "Appreciated by customer support ,so that we can sell more.\n" +
            "\n" +
            "Also becaus of our quality and serice ,price.\n" +
            "\n" +
            "We are looking for long term cooperation." +
            "<img src='https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/04.jpg'>" +
            "",
        itemColor: "#0077C2"
    },
    {
        id:4,
        isHover:false,
        isSelected:false,
        path:"/",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/004.jpg",
        title:"24 Hours Customer Service",
        descText:"",
        htmlText:"1. Pre-sale Service：\n" +
            "\n" +
            "1. Inquiries will be replied within 24 hours.\n" +
            "2. Market research and forecast for customer.\n" +
            "3. Provide unique and professional solutions based on customer's requirement.\n" +
            "4. Data sheet and samples offered.\n" +
            "5. Other requireed services such as special packing design, factory visiting and so on.\n" +
            "\n" +
            "\n" +
            "\n" +
            "2. In- sale Service:\n" +
            "\n" +
            "1. Tracking producing procedures all the time.\n" +
            "2. Provide photos and videos as per customer's requirement during production.\n" +
            "3. Free spare parts provided.\n" +
            "\n" +
            "\n" +
            "\n" +
            "3. After-sale Service:\n" +
            "\n" +
            "1. Complaint respond period not exceed 24 hours; maintenance guidance and problem solution supplied in 48 hours.\n" +
            "2. Warranty: 3-5 years\n" +
            "3. Free technician training.\n" +
            "4. Full set of documents free of charge, which including installation guidance, software operation manual, easy maintenance manual and control system software CD and so on.",
        itemColor: "#0061BA"
    },
]


const deliveryList = [
    {
        id:1,
        isHover:false,
        isSelected:true,
        path:"/",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/005.jpg",
        title:"Short Delivery Time",
        descText:"",
        htmlText:"1. For the delivery time ,normally after got the deposit ,need 3-5days  \n" +
            "\n" +
            "2. and for the payment term ,30% deposit ,balance  before shipment.\n" +
            "\n" +
            "3. and for the shipping ,we have some very goods logistic partener ,which can help you shipping the goods if you dont have one.",
        itemColor:"#00A0D0",
    },
    {
        id:2,
        isHover:false,
        isSelected:false,
        path:"/",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/006.jpg",
        title:"Packing and Shipping",
        descText:"",
        htmlText:"" +
            "or the packing ,if for rental screen ,we will using flight case." +
            "<img src='https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/008.jpg'>" +
            "2.for the fixed screen ,we will using wooden case." +
            "<img src='https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/009.png'>" +
            "for other accessories ,we will use the carton to pack. \n" +
            "\n" +
            "And if shipping cabinet ,then using the export pallet." +
            "",
        itemColor: "#008DCA"
    },
    {
        id:3,
        isHover:false,
        isSelected:false,
        path:"/",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/24hours-service/007.jpg",
        title:"Flight Case",
        descText:"",
        htmlText:"" +
            "1. For the delivery time ,normally after got the deposit ,need 3-5days  \n" +
            "\n" +
            "2. and for the payment term ,30% deposit ,balance  before shipment.\n" +
            "\n" +
            "3. and for the shipping ,we have some very goods logistic partener ,which can help you shipping the goods if you dont have one." +
            "" +
            "",
        itemColor: "#0077C2"
    },
]


export default {
    serviceGuideList,downloadList,faqList,teamServiceList,deliveryList
}