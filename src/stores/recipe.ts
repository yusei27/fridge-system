import {defineStore} from "pinia";
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import axios from "axios"
import type {ingredient} from '@/stores/ingredient'

//現状リロードでストアが吹っ飛ぶので、そのうちセッションストレージに保存するようにする
//https://qiita.com/tsuchinoko0102/items/7a8d4ad633291ac128e2


//連想配列のキーはnumberを使うとvalueもnumberにしないといけない
//https://9cubed.info/article/typescript/0013

interface State {
    recipeListMap: Map<string, recipe>;
    recipeList: recipe[];
    isLoading:boolean;

}

export interface recipe{
    id_recipe: number,
    name_recipe: string,
    serving_size: number,
    method: string
    ingredients: ingredient_recipe[]
};

interface ingredient_recipe{
    id_ingredient: number,
    name_ingredient: string,
    amount: number,
    id_unit: number,
    fk_id_unit?: number,
    name_unit: string,
    id_genre: number,
    fk_id_genre?: number,
    name_genre: string,
};

type request = {
    "table":string,
    "columns": string[]
}

type request_2 = {
    [key:string]:any
}

export const useRecipeStore = defineStore({
    id:'recipes',
    state: (): State=> {
        return{               
            recipeListMap: new Map<string, recipe>(),
            recipeList: new Array,
            isLoading:false
        }
    },

    getters: {
        getById: (state) => {
            return (id:string): recipe => {
                const recipe = state.recipeListMap.get(id) as recipe;
                return recipe;
            }
        }
    },    
    actions: {
        initList(): void {
            console.log("レシピテーブル取得")
            this.isLoading = true;
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
                        this.recipeList.splice(0)//レシピリストの初期化、再取得用
                        res.data.data.forEach((resData:recipe) => {
                            const data: recipe = {
                                id_recipe: resData["id_recipe"],
                                name_recipe: resData["name_recipe"],
                                serving_size: resData["serving_size"],
                                ingredients: [],
                                method: resData["method"]
                            };
                            this.recipeListMap.set(String(resData["id_recipe"]), data);
                            this.recipeList.push(data);
                        });
                        this.isLoading = false;
                    })
                    .catch((e: AxiosError<{error: string}>) => {
                        alert("レシピテーブル取得失敗3" + e);
                        return 
                    })

        },
        async getIngredientsFromRecipe(id_recipe: number):Promise<Array<ingredient_recipe>> {
            //１レシピに紐づく材料を全量取得する
            console.log('レシピストア、レシピに紐づく材料を取得　レシピId = ', id_recipe);
            const table: string = 'ingredient_table';
            const columns: string[] = ["id_ingredient", "name_ingredient", "fk_id_unit", "fk_id_genre"];
            const request:request_2 = {"id_recipe":id_recipe}

            return  await axios.post("http://localhost:3334//get/ingredients/from/recipe",
                JSON.stringify(request),
                {headers:{'Content-Type': 'application/json'}})
                .then((res: AxiosResponse) => {
                    const recipe = this.recipeListMap.get(String(id_recipe));
                    const ingredients = res.data.data
                    return Promise.resolve(ingredients)
                })
                .catch((e: AxiosError<{error: string}>) => {
                    console.log("error", e)
                    return Promise.reject("9999")
                })
        }
    }
})
