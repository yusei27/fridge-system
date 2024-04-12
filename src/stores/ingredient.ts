import {defineStore} from "pinia";
import type {AxiosResponse, AxiosError} from "axios";
import axios from "axios"

//現状リロードでストアが吹っ飛ぶので、そのうちセッションストレージに保存するようにする
//https://qiita.com/tsuchinoko0102/items/7a8d4ad633291ac128e2

interface State {
    ingredientList: Array<ingredient>;
}

export interface ingredient{
    id_ingredient: number,
    name_ingredient: string,
    fk_id_unit: number,
    fk_id_genre: number
};

type request = {
    "table":string,
    "columns": string[]
}

export const useIngredientStore = defineStore({
    id:'ingredients',
    state: (): State=> ({ingredientList: new Array<ingredient>()}),

        
    actions: {
        initList(): void {
            console.log("材料テーブル取得")
            //request作成
            const columns: string[] = ["id_ingredient", "name_ingredient", "fk_id_unit", "fk_id_genre"];
            const table: string = 'ingredient_table'
            const request:request = {
                "table":table,
                "columns":columns
            }

            axios.post("http://localhost:3334//select/data",
                JSON.stringify(request),
                {headers:{'Content-Type': 'application/json'}})
                    .then((res: AxiosResponse) => {
                        console.log("select/data_成功", res.data);
                        this.ingredientList.splice(0)//配列のなかみを空に(再取得時のため)
                        res.data.data.forEach((resData:ingredient) => {
                            const data: ingredient = {
                                id_ingredient: resData["id_ingredient"],
                                name_ingredient: resData["name_ingredient"],
                                fk_id_unit: resData["fk_id_unit"],
                                fk_id_genre: resData["fk_id_genre"]
                            };
                            this.ingredientList.push(data);
                        });
                    })
                    .catch((e: AxiosError<{error: string}>) => {
                        alert("材料テーブル取得失敗");
                        return 
                    })

        }
    }
})
