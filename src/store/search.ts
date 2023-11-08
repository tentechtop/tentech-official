import { defineStore } from 'pinia';

export const searchInfoStore = defineStore({
    id: 'searchInfo',
    state: () => ({
        currentSearchResultList:[],
        currentPage:1,
        startPage:0,
        endPage:20,
    }),
    actions: {
        addCurrentSearchResultList(currentSearchResultList){
            if (this.currentSearchResultList !== null && this.currentSearchResultList.length>0){

            }else {
                this.currentSearchResultList = currentSearchResultList
            }
        },
        updateCurrentSearchResultList(currentSearchResultList) {
            this.currentSearchResultList=currentSearchResultList;
        },
        updatePageData(currentPage,startPage,endPage){
            this.currentPage = currentPage
            this.startPage = startPage
            this.endPage = endPage
        },
    },
});
