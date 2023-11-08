const homeBannerList = [
    {
        productId: 1,
        seriesId:1,
        imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/home-banner-01.jpg",
    },
    {
        productId: 2,
        seriesId:2,
        imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/home-banner-02.jpg",
    },
    {
        productId: 3,
        seriesId:3,
        imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/home-banner-03.jpg",
    },
    {
        productId: 4,
        seriesId:4,
        imgUrl: "https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/home-banner-04.jpg",
    },
]
const hotProductList = [
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-product/hot-product-img-01.jpg",
        productName:"home.fixedInstallLedDisplay",
        path:"/products",
        series:"fixed-install-led-display",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-product/hot-product-img-02.jpg",
        productName:"home.smallPixelLedDisplay",
        path:"/products",
        series:"fines-mall-pixel-led-display",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-product/hot-product-img-03.jpg",
        productName:"home.creativeDisplay",
        path:"/products",
        series:"creative-display",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-product/hot-product-img-04.jpg",
        productName:"home.ledCubeScreen",
        path:"/products",
        series:"creative-display",
    },
]
const featuredProductList = [
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-01.jpg",
        productName:"home.ledIposterForShoppingMall",
        path:"/product/led-iposter-for-shoppping-mall",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-02.jpg",
        productName:"home.smallPixelFixedInstallationIndoorScreen",
        path: "/product/125-small-pixel-fixed-installation-indoor-screen"
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-03.jpg",
        productName:"home.showWindowLedTransparentDisplayScreen",
        path:"/product/show-window-led-transprent-display-screen",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-04.jpg",
        productName:"home.customizedShapeScreen",
        path:"/product/customized-shape-screen",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-05.jpg",
        productName:"home.waterproofOutdoorLedScreen",
        path:"/product/391-481-waterproof-outdoor-led-screen",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/featured-product/featured-product-06.jpg",
        productName:"home.indoorRentalScreenPrivateModel",
        path:"/product/indoor-2976-rental-screen-private-model",
    },
]
const hotSellProductList = [
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-sell-product-01.jpg",
        productName:"Led Display Control Stysterm Nova",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-sell-product-02.jpg",
        productName:"Led Standee In Stock",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-sell-product-03.jpg",
        productName:"P8 Outdoor Module Directly From Factory",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-sell-product-04.jpg",
        productName:"Rental Transprent Led Display",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-sell-product-05.jpg",
        productName:"Small Pixel Led Screen High Definition For Meeting Room",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-sell-product-06.jpg",
        productName:"Indoor P3.91 P4.81 led display screen rental led displays curved",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-sell-product-07.jpg",
        productName:"Indoor and outdoor Lightweight LED display",
    },
    {
        isHover:false,
        isSelected:false,
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/home/hot-sell-product-08.jpg",
        productName:"P6 P8 P10 Dooh Digital Billboard Panel Sign And Outdoor Video Wall Mount Front Advertising Screen Display",
    },
]
const quickLinks = [
    {
        name:"Rental LED Display",
        router:""
    },
    {
        name:"Fixed Install Led Display",
        router:""
    },
    {
        name:"Fine/small Pixel Led Display",
        router:""
    },
    {
        name:"Transparent LED Display",
        router:""
    },
    {
        name:"Iposter",
        router:""
    },
    {
        name:"Creative Display",
        router:""
    },
    {
        name:"LED Module",
        router:""
    },
    {
        name:"LED Display Accessories",
        router:""
    },
]
const caseList = [
    {
        isHover:false,
        isSelected:true,
        icon:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/oct-led.svg",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-01.jpg",
        title:"home.octShowRoom1.538FixedInstall",
        desc:"home.limitedWasRanked",
        path:"/casedetail/27",
    },
    {
        isHover:false,
        isSelected:false,
        icon:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/oct-led.svg",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-02.jpg",
        title:"home.customShapeScreen",
        desc:"home.indoorFixedInstallation",
        path:"/casedetail/28",
    },
    {
        isHover:false,
        isSelected:false,
        icon:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/oct-led.svg",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-03.jpg",
        title:"home.customerVisiting",
        desc:"home.shenzhenTentechVisualTechnology",
        path:"/casedetail/26",
    },
    {
        isHover:false,
        isSelected:false,
        icon:"https://tentech.oss-cn-shenzhen.aliyuncs.com/icon/oct-led.svg",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/case/case-04.jpg",
        title:"home.perfectEffectiveIndoorFixedProject",
        desc:"home.indoorInstallationProjectGuangdong",
        path:"/casedetail/29",
    },
]
const newsList = [
    {
        isHover:false,
        isSelected:false,
        YearAndMonth:"2023-07-20",
        dateDay:"11",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/news/news05.png",
        title:"isle shenzhen LED world 2023",
        intro:"home.news1",
        path:"/newsitem/5",
    },
    {
        isHover:false,
        isSelected:false,
        YearAndMonth:"2022-07-11",
        dateDay:"07",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/news/news-item04.jpg",
        title:"knowledge about LED display",
        intro:"home.news2",
        path:"/newsitem/6",
    },
    {
        isHover:false,
        isSelected:false,
        YearAndMonth:"11-2021",
        dateDay:"01",
        imgUrl:"https://tentech.oss-cn-shenzhen.aliyuncs.com/images/news/news1016.jpg",
        title:"The Shanghai exhibition in November 2021 is about to start",
        intro:"home.news3",
        path:"/newsitem/7",
    },
]

export default {
    homeBannerList,
    hotProductList,
    featuredProductList,
    hotSellProductList,
    quickLinks,
    caseList,
    newsList,
}