<template>
    <v-container>
        <h2>レシピ登録</h2>
        <h3>[レシピ名]</h3>
        <v-text-field
            label="レシピ名"
            v-model="recipeName"
        ></v-text-field>
        <h3>[人数]</h3>
        <v-select :items="numberOfPeopleSelect">
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
import {reactive} from "vue";
// interface ingredient{
//     id: number
//     name: string,
//     number: number,
//     unit: string
// }
var recipeName:string;
var recipeMethod:string;
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
console.log("ingredientsList", ingredientsList)

let counter: number = 0;

const recipeIngredientsList: ingredient[] = reactive([{id:counter, name:null, number:null, unit:null}]);

function addIngredient(): void{
    recipeIngredientsList.push({id:counter++, name:null, number:null, unit:null});
    console.log(recipeIngredientsList);
}

function removeIngredient(id): void{
    const idRemoveIngredient = recipeIngredientsList.findIndex(element => element.id === id);
    console.log("index", idRemoveIngredient);
    recipeIngredientsList.splice(idRemoveIngredient, 1);
}

function registerRecipe(): void{
    console.log("保存ボタン開始");
    console.log("レシピ名", recipeName);
    console.log("作り方", recipeMethod);

}
</script>