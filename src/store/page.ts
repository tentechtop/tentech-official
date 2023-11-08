import { defineStore } from 'pinia';

export const pageInfoStore = defineStore({
    id: 'pageInfo',
    state: () => ({
        currentProductList:[],
        currentPage:1,
        startPage:0,
        endPage:9,

    }),
    actions: {
        addCurrentProductList(productList){
            if (this.currentProductList !== null && this.currentProductList.length>0){

            }else {
                this.currentProductList = productList
            }
        },
        updateProductList(productList) {
            this.currentProductList=productList;
        },
        updatePageData(currentPage,startPage,endPage){
            this.currentPage = currentPage
            this.startPage = startPage
            this.endPage = endPage
        },
    },
});
