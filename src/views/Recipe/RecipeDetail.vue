<template>
    <v-container>
        <v-row>
            <h2>レシピ詳細</h2>
        </v-row>
        <v-row>
            <h3>肉じゃが</h3>
            <v-btn>編集</v-btn>
        </v-row>
        <v-data-table
            :headers="headersRecipeIngredientTable"
            :items="recipeIngredient"
            v-model="recipeIngredient"
        >
            <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
            <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>
        <h4>作り方</h4>
        <p>dfhsjdfhksjdfhkjdsfhidubvkjdsnvbbjhgfvsadlsfj</p>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';
import type {VDataTable} from 'vuetify/components';
//propsで表示するレシピIDを取得
interface Props{
    id_recipe: number;
}
const props = defineProps<Props>();
const id_recipe: number = props.id_recipe;
console.log('propsのID', props.id_recipe);

//レシピストア
import { useRecipeStore, recipe} from '@/stores/recipe';
const recipeStore = useRecipeStore();
recipeStore.getIngredientsFromRecipe(id_recipe)

type VDataTableHeader = VDataTable["headers"];
interface ingredient_recipe{
    id_ingredient: number,
    name_ingredient: string,
    amount: number,
    id_unit: number,
    id_genre: number
};
setTimeout(() => {
    console.log("Hello, TypeScript!");
}, 3000);

const recipeIngredient1: ingredient_recipe[] = recipeStore.getById(id_recipe);
const recipeIngredient = reactive(recipeIngredient1)
console.log("取得した材料", recipeIngredient1)

const headersRecipeIngredientTable: VDataTableHeader = [
    {key:"id_ingredient"},
    {key:"name_ingredient"},
    {key:"amount"},
    {key:"id_unit"},
    {key:"id_genre"},
];



</script>