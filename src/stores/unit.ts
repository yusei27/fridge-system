import {defineStore, type StateTree} from "pinia";
import type {AxiosResponse, AxiosError} from "axios";
import axios from "axios"
import { axiosClient } from "@/network/axiosclient";
import { stringify, parse } from 'zipson';

//現状リロードでストアが吹っ飛ぶので、そのうちセッションストレージに保存するようにする
//https://qiita.com/tsuchinoko0102/items/7a8d4ad633291ac128e2

interface State {
    unitListMap: Map<string, unit>;
    unitList: Array<unit>;
    afterinitListFalg:boolean;//初期値メソっドが起動したか管理するフラグ
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
            afterinitListFalg:false
        }
    },

        
    actions: {
        initList(): void {
            if(this.afterinitListFalg === true){
                console.log("unitデータ取得済み")
                return
            }
            axiosClient.post("http://localhost/get_data/get/units")
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
                    console.log("unitListmap 初期値",this.unitListMap);
                    this.afterinitListFalg = true
                })
                .catch((e: AxiosError<{error: string}>) => {
                    alert("単位テーブル取得失敗"  + e);
                    return 
                })

        }
    },
    
    // persist: [
    //     // {
    //     //     storage: sessionStorage,
    //     //     paths:["unitList"],
    //     //     key:"unitList",
    //     // },
    //     {
    //         storage: sessionStorage,
    //         paths:["unitListMap"],
    //         key:"unitListMap",
    //         serializer: {
    //             deserialize: (str) => {
    //                 // parse
    //                 console.log("deserialize str ", str);
    //                 console.log("deserialize map ", JSON.parse(str));
    //                 const entries = new Map<string, unit>(Object.entries(JSON.parse(str)));
    //                 console.log("deserialize entries", entries);
    //                 //const tmp_map : Map<string, unit> = Object.entries(JSON.parse(str))
    //                 //console.log("deserialize tmp_map", tmp_map);
    //                 return new Map<string, unit>(Object.entries(JSON.parse(str)))
    //             },
    //             serialize: (map_obj):string => {
    //                 try {
    //                 console.log("map_obj", map_obj.unitListMap);
    //                 console.log("serizlize", JSON.stringify(Object.fromEntries(map_obj.unitListMap)))
    //                 return JSON.stringify(Object.fromEntries(map_obj.unitListMap))
    //                 }
    //                 catch (e){
    //                     console.log("serialize失敗", e);
    //                     return "失敗"
    //                 }
    //             },

    //         }
    //     },
    // ],

    

})
