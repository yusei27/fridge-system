<template>
    <v-container>
        <v-row>
            {{ recipeList }}
            <br>
            <br>
            <h5><font color="red">recipedetail</font></h5>
            {{ recipedetail.method}}
            <br>
            <h5><font color="red">recipedetail.ingredients</font></h5>
            {{ recipedetail.ingredients }}
            <br>
        </v-row>
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
            <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
            <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>
        <h4>作り方</h4>
        <p>{{ recipedetail.method}}</p>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';
import type {VDataTable} from 'vuetify/components';
import {watch} from 'vue'
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
import { recipe_detail, useRecipeDetailStore } from '@/stores/recipedetail';
const recipedetailStore = useRecipeDetailStore();
const {recipedetail} = storeToRefs(recipedetailStore)

//単位テーブルのデータストア
import { useUnitStore, unit } from '@/stores/unit';
const unitStore = useUnitStore();
const unitListMap: Map<string, unit> = unitStore.unitListMap;

//ジャンルテーブルのデータストア
import {useGenreStore, genre} from '@/stores/genre';
const genreStore = useGenreStore();
genreStore.initList();
const genreListMap: Map<string, genre> = genreStore.genreListMap;

var {isLoading, recipeList, recipeListMap} = storeToRefs(recipeStore);
// async function getRecipeDetail(id_recipe:number) {
//             const recipe2 =  await recipeStore.getIngredientsFromRecipe(id_recipe)
//                 .then((result2) => {
//                     console.log("then", result2);
//                 })
//                 .catch((result) => {
//                     console.log("catch", result);
//                 })
//             console.log("then後", recipe2);
            //console.log('ccccccc', recipe2)
                // .then(
                //     console.log('ccccccc')
                //     recipedetailStore.recipe = recipe2
                // )
// }
//getRecipeDetail(id_recipe);

//レシピの材料を取得
recipeStore.getIngredientsFromRecipe(id_recipe)
                .then((ingredients) =>{
                    console.log("then", ingredients);
                    //if (typeof ingredient_recipe == ingredient_recipe){
                    if (true){
                        console.log("レシピ詳細に代入")
                        for (const ingredient of ingredients){
                            if (ingredient != undefined){
                            console.log("レシピ詳細の他テーブルデータ取得")
                            //レシピ以外のIDから表示に必要なデータを取得
                            console.log("単位", unitListMap.get(String(ingredient.fk_id_unit)))
                            ingredient.name_unit = unitListMap.get(String(ingredient.fk_id_unit)).name_unit;
                            ingredient.name_genre = genreListMap.get(String(ingredient.fk_id_genre)).name_genre;
                            console.log("加工後", ingredient)
                            recipedetailStore.recipedetail.ingredients.push(ingredient);
                            }
                        }
                        //recipedetailStore.recipedetail.method ="aaaaa";
                    }
                })
                .catch((result) => {
                    console.log("catch", result);
                })


//すでにレシピ一覧で取得しているデータを取得
function getReceipeExceptIngredients(id_recipe_str: string):void{
    //レシピ一覧から該当のレシピ情報を取得　材料情報は別途取得
    const recipedetail = recipeStore.getById(id_recipe_str)
    console.log("xxxxxx", recipedetail)

    //１レシピの詳細をrecipedetailStoreの該当箇所に代入
    recipedetailStore.recipedetail.id_recipe = id_recipe;//レシピID
    recipedetailStore.recipedetail.name_recipe = recipedetail.name_recipe;//レシピ名
    recipedetailStore.recipedetail.serving_size = recipedetail.serving_size;//人前
    recipedetailStore.recipedetail.method = recipedetail.method;//作り方
}

//すでにレシピ一覧で取得しているデータからレシピ詳細に必要なデータを取得
getReceipeExceptIngredients(id_recipe_str);

//すでにレシピ一覧で取得しているデータを取得






type VDataTableHeader = VDataTable["headers"];
// interface ingredient_recipe{
//     id_ingredient: number,
//     name_ingredient: string,
//     amount: number,
//     id_unit: number,
//     id_genre: number
// };

// const recipeIngredient1: ingredient_recipe[] = recipeStore.getById(id_recipe);
// console.log("取得した材料", recipeIngredient1)

const headersRecipeIngredientTable: VDataTableHeader = [
    {key:"fk_id_ingredient"},
    {key:"name_ingredient"},
    {key:"amount"},
    {key:"fk_id_unit"},
    {key:"name_unit"},
    {key:"fk_id_genre"},
    {key:"name_genre"},
    {key:"fk_id_recipe"},

];



</script>