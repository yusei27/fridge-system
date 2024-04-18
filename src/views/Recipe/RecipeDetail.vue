<template>
    <v-container>
        <v-row>
            <h2>レシピ詳細</h2>
        </v-row>
        <v-row>
            <v-col>
                <h3>{{ recipedetail.name_recipe }}</h3>
            </v-col>
            <v-col>
                <v-btn>編集</v-btn>
            </v-col>
        </v-row>
        <v-data-table
            :headers="headersRecipeIngredientTable"
            :items="recipedetail.ingredients"
        >
            <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>
        <h4>作り方</h4>
        <p>{{ recipedetail.method}}</p>
    </v-container>
</template>

<script setup lang="ts">
import type {VDataTable} from 'vuetify/components';
import {storeToRefs} from 'pinia'
//propsで表示するレシピIDを取得
interface Props{
    id_recipe: number;
}
const props = defineProps<Props>();
const id_recipe: number = Number(props.id_recipe);
const id_recipe_str: string = String(props.id_recipe);
console.log('propsのID', props.id_recipe);

//レシピストア
import { useRecipeStore} from '@/stores/recipe';
const recipeStore = useRecipeStore();


//レシピ詳細(レシピ一つ分)分のストア
import {useRecipeDetailStore } from '@/stores/recipedetail';
const recipedetailStore = useRecipeDetailStore();
const {recipedetail} = storeToRefs(recipedetailStore)

//単位テーブルのデータストア
import { useUnitStore, type unit } from '@/stores/unit';
const unitStore = useUnitStore();
const unitListMap: Map<string, unit> = unitStore.unitListMap;
console.log("recipedetail unitlistmap", unitListMap);

//ジャンルテーブルのデータストア
import {useGenreStore, type genre} from '@/stores/genre';
import type { ingredient } from '@/stores/ingredient';
const genreStore = useGenreStore();
genreStore.initList();
const genreListMap: Map<string, genre> = genreStore.genreListMap;

var {isLoading, recipeList, recipeListMap} = storeToRefs(recipeStore);

//レシピの材料を取得
recipeStore.getIngredientsFromRecipe(id_recipe)
                .then((ingredients) =>{
                    if (ingredients === undefined){
                        console.log("データはundefinedです。");
                        return
                    }
                    console.log("then", ingredients);
                    console.log("レシピ詳細に代入")
                    for (const ingredient of ingredients){
                        const unit = unitListMap.get(String(ingredient.fk_id_unit))
                        const genre = genreListMap.get(String(ingredient.fk_id_genre))
                        if (genre !== undefined && unit !== undefined){
                            //レシピ以外のIDから表示に必要なデータを取得
                            ingredient.name_unit = unit.name_unit;
                            ingredient.name_genre = genre.name_genre;
                            recipedetailStore.recipedetail.ingredients.push(ingredient);
                        }
                    }
                })
                .catch((result) => {
                    console.log("catch", result);
                })


//すでにレシピ一覧で取得しているデータを取得
function getReceipeExceptIngredients(id_recipe_str: string):void{
    //レシピ一覧から該当のレシピ情報を取得　材料情報は別途取得
    const recipedetail = recipeStore.getById(id_recipe_str)

    //１レシピの詳細をrecipedetailStoreの該当箇所に代入
    recipedetailStore.recipedetail.id_recipe = id_recipe;//レシピID
    recipedetailStore.recipedetail.name_recipe = recipedetail.name_recipe;//レシピ名
    recipedetailStore.recipedetail.serving_size = recipedetail.serving_size;//人前
    recipedetailStore.recipedetail.method = recipedetail.method;//作り方
}

//すでにレシピ一覧で取得しているデータからレシピ詳細に必要なデータを取得
getReceipeExceptIngredients(id_recipe_str);






type VDataTableHeader = VDataTable["headers"];
const headersRecipeIngredientTable: VDataTableHeader = [
    //{key:"fk_id_ingredient", title:"食材ID"},
    {key:"name_ingredient",title:"食材名"},
    {key:"amount", title:"量"},
    //{key:"fk_id_unit", title:"単位ID"},
    {key:"name_unit", title:"単位名"},
    //{key:"fk_id_genre", title:"ジャンルID"},
    {key:"name_genre", title:"ジャンル名"},
    //{key:"fk_id_recipe", title:"レシピID"},
];
</script>