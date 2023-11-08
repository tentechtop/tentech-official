import { defineStore } from 'pinia';

export const aboutPageStore = defineStore({
    id: 'aboutPageInfo',
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
