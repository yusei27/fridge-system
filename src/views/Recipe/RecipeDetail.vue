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
        >
            <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
            <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>
        <h4>作り方</h4>
        <p>dfhsjdfhksjdfhkjdsfhidubvkjdsnvbbjhgfvsadlsfj</p>
    </v-container>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
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
interface ingredients{
    id: number,
    name: string,
    number: number,
    unit: string
};

const recipeIngredient: ingredient[] = [
    {id:1, name:"じゃがいも", number:2, unit:"個"},
    {id:2, name:"ごま油", number:3, unit:"大さじ"}
];

const headersRecipeIngredientTable: VDataTableHeader = [
    {key:"id"},
    {key:"name"},
    {key:"number"},
    {key:"unit"},
]
</script>