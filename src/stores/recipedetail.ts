import {defineStore} from "pinia";
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import axios from "axios"
import type {ingredient} from '@/stores/ingredient'
//import { recipe } from "./recipe";

//現状リロードでストアが吹っ飛ぶので、そのうちセッションストレージに保存するようにする
//https://qiita.com/tsuchinoko0102/items/7a8d4ad633291ac128e2

//nullを許容する
//https://qiita.com/y_hokkey/items/bca7fbe45d1ed232586e

interface State {
    recipedetail:recipe_detail ;
    isLoading:boolean;

}

export interface recipe_detail{
    id_recipe: number | null,
    name_recipe: string | null,
    serving_size: number | null,
    method: string | null,
    ingredients: ingredient_recipe[]
};

interface ingredient_recipe {
    id_ingredient: number,
    name_ingredient: string,
    amount: number,
    id_unit: number,
    name_unit: string,
    id_genre: number,
    name_genre: string,
};


export const useRecipeDetailStore = defineStore({
    id:'recipedetail',
    state: (): State=> {
        return{               
            
            recipedetail: {id_recipe:null, name_recipe:null, serving_size:null, method:null, ingredients:[]},
            isLoading:false
            }
    },
})
