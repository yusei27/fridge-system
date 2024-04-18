<template>
    <v-container>
        <h2>レシピ登録</h2>
        <h3>[レシピ名]</h3>
        <v-text-field
            label="レシピ名"
            v-model="recipeName"
        ></v-text-field>
        <h3>[人前]</h3>
        <v-select
            label="人前"
            :items="numberOfPeopleSelect"
            v-model="recipeServingSize"
            >
        </v-select>
        <h3>[材料]</h3>
        <v-row v-for="recipeIngredient in recipeIngredientsList">
            <v-combobox
                label="材料"
                :items="ingredientsList"
                item-title="name_ingredient"
                item-value="id_ingredient"
                v-model="recipeIngredient.name"
            ></v-combobox>
            <v-select
                label="総数"
                :items="numberOfIngredient"
                v-model="recipeIngredient.number">
            </v-select>
            <v-select
                label="単位"
                :items="unitList"
                item-title="name_unit"
                item-value="id_unit"
                v-model="recipeIngredient.unit">
            </v-select>
            <v-select
                label="ジャンル"
                :items="genreList"
                item-title="name_genre"
                item-value="id_genre"
                v-model="recipeIngredient.genre">
            </v-select>
            <v-btn v-on:click="removeIngredient(recipeIngredient.id)">削除</v-btn>
        </v-row>
        <v-row>
            <v-btn v-on:click="addIngredient">材料追加</v-btn>
        </v-row>
        <v-row>
            <v-textarea
                label="作り方"
                v-model="recipeMethod">
            </v-textarea>
        </v-row>
        <v-row>
            <v-btn v-on:click="registerRecipe(recipeIngredientsList, recipe_unique)">保存</v-btn>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import { type Ref } from "vue";
//保存ボタンを押下時に起動するメソッド
import { registerRecipe} from "@/views/Recipe/RecipeRegister_button";



export interface ingredient_row{
    id: number
    name: string,
    number: number,
    unit: number,
    genre:number
}
const recipeName: Ref<string> = ref("");
const recipeMethod: Ref<string> = ref("");
const recipeServingSize:Ref<string> = ref("1");
const numberOfPeopleSelect: string[] = ["1人", "2人", "3人", "4人", "5人", "6人"];
const numberOfIngredient: number[] = [1, 2, 3, 4, 5, 6, 7];
export type recipe_unique =  {
    recipeMethod: Ref<string>,
    recipeName: Ref<string>,
    recipeServingSize:Ref<string>
}
const recipe_unique: recipe_unique = {"recipeMethod":recipeMethod, "recipeName":recipeName, "recipeServingSize":recipeServingSize};

//=================pinia読み込み  ここから
//単位テーブルのデータストア
import { useUnitStore, type unit } from '@/stores/unit';
const unitStore = useUnitStore();
console.log("unitStore.$state", unitStore.$state);
unitStore.initList()
// if (unitStore.afterinitListFalg === false){
//     //リロード対策 初期化されていたら、もう一度データベースから単位を取得
//     unitStore.initList()
// }
const unitList: unit[] = unitStore.unitList;

//材料テーブルのデータストア
import { useIngredientStore, type ingredient } from '@/stores/ingredient';
const ingredientStore = useIngredientStore();
ingredientStore.initList();
const ingredientsList: ingredient[] = ingredientStore.ingredientList;

//ジャンルテーブルのデータストア
import {useGenreStore, type genre} from '@/stores/genre';
import type { recipe } from "@/stores/recipe";
const genreStore = useGenreStore();
genreStore.initList();
const genreList: genre[] = genreStore.genreList;
//=================pinia読み込み  ここまで



//材料行の各種初期値
const ingredient_init_unit:number = unitList[0].id_unit;//肉
const ingredient_init_genre:number = genreList[0].id_genre

//画面初期描画時にある材料列
let counter: number = 0;
const recipeIngredientsList: ingredient_row[] = reactive([{id:counter, name:"", number:1, unit:ingredient_init_unit, genre:ingredient_init_genre}]);


//材料追加ボタン押下時の処理
function addIngredient(): void{
    recipeIngredientsList.push({id:counter++, name:"", number:1, unit:ingredient_init_unit, genre:ingredient_init_genre});
}


//削除ボタン押下時の処理
function removeIngredient(id: number): void{
    const idRemoveIngredient = recipeIngredientsList.findIndex(element => element.id === id);
    recipeIngredientsList.splice(idRemoveIngredient, 1);
}


// window.onbeforeunload = function () {
//   console.log("リロード禁止です！");
//   unitStore.$state.value;

// };
</script>

<!-- <script lang="ts">
// ページ移動前に確認をしたいページでこの関数を呼ぶだけ
import useConfirmUnload from '@/views/Recipe/use-confirm-unload'
useConfirmUnload()
</script> -->


