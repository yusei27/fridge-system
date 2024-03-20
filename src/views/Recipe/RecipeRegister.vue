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
            <v-btn v-on:click="registerRecipe">保存</v-btn>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
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

//単位テーブルのデータストア
import { useUnitStore, unit } from '@/stores/unit';
const unitStore = useUnitStore();
const unitList: unit[] = unitStore.unitList;

//材料テーブルのデータストア
console.log("aaaaaaa");
import { useIngredientStore, ingredient } from '@/stores/ingredient';
const ingredientStore = useIngredientStore();
ingredientStore.initList();
const ingredientsList: ingredient[] = ingredientStore.ingredientList;

//ジャンルテーブルのデータストア
import {useGenreStore, genre} from '@/stores/genre';
const genreStore = useGenreStore();
genreStore.initList();
const genreList: genre[] = genreStore.genreList;

let counter: number = 0;

const recipeIngredientsList: ingredient_row[] = reactive([{id:counter, name:null, number:null, unit:null, genre:null}]);

function addIngredient(): void{
    recipeIngredientsList.push({id:counter++, name:null, number:null, unit:null, genre:null});
    console.log(recipeIngredientsList);
}

function removeIngredient(id): void{
    const idRemoveIngredient = recipeIngredientsList.findIndex(element => element.id === id);
    console.log("index", idRemoveIngredient);
    recipeIngredientsList.splice(idRemoveIngredient, 1);
}

function registerRecipe(): void{
    console.log("保存ボタン開始");
    type ingredient_alredy_exist = {
        "id_ingredient":number,
        "num":number,
        "id_unit":number,
        "id_genre":number
    }
    type ingredient_not_exist = {
        "ingredient_name":string,
        "num":number,
        "id_unit":number,
        "id_genre":number
    }
    type request = {
    "name_recipe":string,
    "serving_size": number,
    "method":string,
    "ingredient_alredy_exist":ingredient_alredy_exist[],//すでに材料が材料テーブルに登録されているリスト
    "ingredient_not_exist":ingredient_not_exist[]//まだ材料が材料テーブルに登録されていないリスト
    }
    const ingredientsExistList: ingredient_alredy_exist[] = [];
    const ingredientsNotExistList: ingredient_not_exist[] = [];
    recipeIngredientsList.forEach((obj, index) => {
        if (typeof obj.name == "string"){
            console.log("未登録材料", obj.name);
            ingredientsNotExistList.push(
                {
                    "ingredient_name":obj.name,
                    "num":obj.number,
                    "id_unit":obj.unit,
                    "id_genre":obj.genre
                }
            );
        }else{
            console.log("材料", obj.name["id_ingredient"])
            ingredientsExistList.push(
                {
                    "id_ingredient":obj.name["id_ingredient"],
                    "num":obj.number,
                    "id_unit":obj.unit,
                    "id_genre":obj.genre
                }
            )
        }
        const request = {
            "name_recipe":recipeName.value,
            "serving_size": Number(recipeServingSize.value.replace("人", "")),//ex ["３人"]→3
            "method":recipeMethod.value,
            "ingredient_alredy_exist":ingredientsExistList,//すでに材料が材料テーブルに登録されているリスト
            "ingredient_not_exist":ingredientsNotExistList//まだ材料が材料テーブルに登録されていないリスト
        }
        console.log("レシピ保存リクエスト", request);
    });

}
</script>