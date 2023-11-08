import { defineStore } from 'pinia';

export const casePageStore = defineStore({
    id: 'casePageInfo',
    state: () => ({
        currentDisplay:null,
        caseItemList:[],
        currentCaseList:[],
    }),
    actions: {
        addCaseItemList(caseItemList){
            if (this.caseItemList){

            }else {
                this.caseItemList = caseItemList
            }
        },
        updateCaseItemList(caseItemList){
            this.caseItemList = caseItemList
        },
        addCurrentCaseList(currentCaseList){
            if (this.currentCaseList){

            }else {
                this.currentCaseList = currentCaseList
            }
        },
        updateCurrentCaseList(currentCaseList) {
            this.currentCaseList=currentCaseList;
        },
        addCurrentDisplay(currentDisplay){
            if (this.currentDisplay!==null){

            }else {
                this.currentDisplay = currentDisplay
            }
        },
        updateCurrentDisplay(currentDisplay){
            this.currentDisplay = currentDisplay
        },
    },
});
