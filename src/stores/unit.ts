import {defineStore} from "pinia";
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import axios from "axios"

interface unit{
    [id: number]:string
};

export const useUnitStore = defineStore({
    id:'units',
    state: (): unit[] => {
        axios.post("http://localhost:3334//get/units", {headers:{'Content-Type': 'application/json'}})
            .then((res: AxiosResponse) => {
                console.log(res);
            })
            .catch((e: AxiosError<{error: string}>) => {
                alert("単位テーブル取得失敗");
            })
        return [{1: "大さじ"}];
    },
})
