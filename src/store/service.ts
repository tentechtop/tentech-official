import { defineStore } from 'pinia';

export const servicePageStore = defineStore({
    id: 'servicePageInfo',
    state: () => ({
        currentDisplay:null,
    }),
    actions: {
        addCurrentDisplay(currentDisplay){
            if (this.currentDisplay!==null){

            }else {
                this.currentDisplay = currentDisplay
            }
        },
        updateCurrentDisplay(currentDisplay){
            this.currentDisplay = currentDisplay
        }
    },
});
