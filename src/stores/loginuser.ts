import { defineStore } from "pinia";

interface State {
    loginFlag: boolean;
}

export const useLoginUserStore = defineStore({
    id: 'loginuser',
    state: (): State => {
        return {
            loginFlag: false
        };
    },
    actions: {
        loginSuccess(): void {
            this.loginFlag = true;
            console.log("ログイン関数実行", this.loginFlag);
        }
    },
});