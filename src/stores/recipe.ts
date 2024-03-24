import {defineStore} from "pinia";
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import axios from "axios"
import type {ingredient} from '@/stores/ingredient'

//現状リロードでストアが吹っ飛ぶので、そのうちセッションストレージに保存するようにする
//https://qiita.com/tsuchinoko0102/items/7a8d4ad633291ac128e2

interface State {
    recipeList: Array<recipe>;
}

export interface recipe{
    id_recipe: number,
    name_recipe: string,
    serving_size: number,
    method: string
    ingredients: ingredient[]
};

type request = {
    "table":string,
    "columns": string[]
}

export const useRecipeStore = defineStore({
    id:'recipes',
    state: (): State=> ({recipeList: new Array<recipe>()}),

        
    actions: {
        initList(): void {
            console.log("レシピテーブル取得")
            //request作成
            const columns: string[] = ["id_recipe", "name_recipe", "serving_size", "method"];
            const table: string = 'recipe_table'
            const request:request = {
                "table":table,
                "columns":columns
            }

            axios.post("http://localhost:3334//select/data",
                JSON.stringify(request),
                {headers:{'Content-Type': 'application/json'}})
                    .then((res: AxiosResponse) => {
                        console.log("select/data_成功");
                        this.recipeList.splice(0)//配列のなかみを空に(再取得時のため)
                        console.log("res data", res.data)
                        res.data.data.forEach((resData:recipe) => {
                            const data: recipe = {
                                id_recipe: resData["id_recipe"],
                                name_recipe: resData["name_recipe"],
                                serving_size: resData["serving_size"],
                                ingredients: [],
                                method: resData["method"]
                            };
                            this.recipeList.push(data);
                        });
                        console.log("recipeList store");
                        console.log(this.recipeList);
                    })
                    .catch((e: AxiosError<{error: string}>) => {
                        alert("レシピテーブル取得失敗");
                        return 
                    })

        }
    }
})
