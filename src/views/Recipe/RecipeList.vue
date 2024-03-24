<template>
    <v-container>
        <h2>レシピ一覧</h2>    
        <v-data-table
            :headers="headersRecipeListTable"
            :items="recipeList"
        >
            <template v-slot:item.hensyuu="{ item }">
                <router-link
                v-bind:to="{name: 'RecipeDetail', params:{id_recipe:item.id_recipe} }">
                    <v-btn>{{ item.id_recipe }}詳細</v-btn>
                </router-link>
            </template>
            <template v-slot:item.delete="{ item }">
                <v-btn>削除</v-btn>
            </template>
        </v-data-table>
        <RouterLink v-bind:to="{name: 'RecipeRegister'}" tag="v-btn">
            <v-btn>新規登録</v-btn>
        </RouterLink>
    </v-container>
</template>

<script setup lang="ts">
import type {VDataTable} from 'vuetify/components';
type VDataTableHeader = VDataTable["headers"];

//レシピデータのストア
import { useRecipeStore, recipe } from '@/stores/recipe';
const recipeStore = useRecipeStore();
recipeStore.initList();
const recipeList: recipe[] = recipeStore.recipeList;

const headersRecipeListTable: VDataTableHeader = [
    {key: "id_recipe"},
    {key: "name_recipe"},
    {key: "hensyuu"},
    {key: "delete"}
];

//レシピ一覧リスト
// interface recipeItem{
//     id: number,
//     name: string
// };

// const recipeItemList: recipeItem[] = [
//     {id:1, name:"肉じゃが"},
//     {id:2, name:"肉うどん"}
// ];
</script>