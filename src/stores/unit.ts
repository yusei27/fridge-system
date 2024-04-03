import {defineStore} from "pinia";
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import axios from "axios"
import { stringify, parse } from 'zipson';

//現状リロードでストアが吹っ飛ぶので、そのうちセッションストレージに保存するようにする
//https://qiita.com/tsuchinoko0102/items/7a8d4ad633291ac128e2

interface State {
    unitListMap: Map<string, unit>;
    unitList: Array<unit>;
}

export interface unit{
    id_unit: number,
    name_unit: string
};

export const useUnitStore = defineStore({
    id:'units',
    state: (): State=> {
        return {
            unitListMap: new Map<string, unit>(),
            unitList: new Array<unit>(),
        }
    },

        
    actions: {
        initList(): void {
            axios.post("http://localhost:3334//get/units")
                .then((res: AxiosResponse) => {
                    console.log("get_units_api_成功", res.data);
                    this.unitList.splice(0);//配列のなかみを空に(再取得時のため)
                    //this.unitListMap.clear();
                    //sessionStorage.removeItem("units")//セッションストレージ初期化
                    
                    res.data.units.forEach((resData:unit) => {
                        const data: unit = {
                            id_unit: resData["id_unit"],
                            name_unit: resData["name_unit"]
                        };
                        this.unitListMap.set(String(data["id_unit"]), data);
                        this.unitList.push(data);
                        
                    });
                    console.log(this.unitListMap);
                    console.log(JSON.stringify(this.unitListMap));
                })
                .catch((e: AxiosError<{error: string}>) => {
                    alert("単位テーブル取得失敗"  + e);
                    return 
                })

        }
    },
    
    // persist: {
    //     storage: sessionStorage,
    //     paths:["unitList"]
    //     // serializer: {
    //     //     deserialize: parse,
    //     //     serialize: stringify
    //     //   }
    // }

    

})
