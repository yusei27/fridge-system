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
            <v-btn v-on:click="registerbutton">保存</v-btn>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import { registerRecipe} from "@/views/Recipe/RecipeRegister_button";



interface ingredient_row{
    id: number
    name: string,
    number: number,
    unit: number,
    genre:number
}
const recipeName = ref("");
var recipeMethod = ref();
var recipeServingSize = ref();
const numberOfPeopleSelect: string[] = ["1人", "2人", "3人", "4人", "5人", "6人"];
const numberOfIngredient: number[] = [1, 2, 3, 4, 5, 6, 7];

//=================pinia読み込み  ここから
//単位テーブルのデータストア
import { useUnitStore, unit } from '@/stores/unit';
const unitStore = useUnitStore();
const unitList: unit[] = unitStore.unitList;

//材料テーブルのデータストア
import { useIngredientStore, ingredient } from '@/stores/ingredient';
const ingredientStore = useIngredientStore();
ingredientStore.initList();
const ingredientsList: ingredient[] = ingredientStore.ingredientList;

//ジャンルテーブルのデータストア
import {useGenreStore, genre} from '@/stores/genre';
const genreStore = useGenreStore();
genreStore.initList();
const genreList: genre[] = genreStore.genreList;
//=================pinia読み込み  ここまで

let counter: number = 0;

const recipeIngredientsList: ingredient_row[] = reactive([{id:counter, name:null, number:null, unit:null, genre:null}]);

//材料追加ボタン押下時の処理
function addIngredient(): void{
    recipeIngredientsList.push({id:counter++, name:null, number:null, unit:null, genre:null});
}


//削除ボタン押下時の処理
function removeIngredient(id: number): void{
    const idRemoveIngredient = recipeIngredientsList.findIndex(element => element.id === id);
    recipeIngredientsList.splice(idRemoveIngredient, 1);
}

//登録ボタン押下時の処理
const registerbutton = registerRecipe(recipeIngredientsList)
</script>