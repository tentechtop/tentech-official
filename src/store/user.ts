import { defineStore } from 'pinia';

export const useInfoStore = defineStore({
    id: 'userInfo',
    state: () => ({
        userInfo: {
            userId:0,
        },
    }),
    actions: {
        addCurrentUser(user) {
            this.userInfo=user;
        },
        removeCurrentUser() {
            this.userInfo= {};
        },
    },
});
