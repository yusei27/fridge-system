import { defineStore } from "pinia";

export const useLoginUserStore = defineStore({
    id: 'loginuser',
    state: (): State => {
        return {
            loginFlag: false
        };
    },
    actions: {
        loginSuccess: (): void => {
            this.loginFlag = true;
            
        };
    },
})