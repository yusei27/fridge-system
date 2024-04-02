<template>
    <v-container>
        <h2>今日のおすすめ</h2>
        <h3>肉じゃが</h3>
        <v-img src="/src/assets/images/29029806_s.jpg"></v-img>
        <h4>足りない材料</h4>
        <v-data-table
            :headers="headers"
            :items="ingredientsListInit"
        >
        <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
            <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>

        <h2>あなたの冷蔵庫</h2>
        <h3>肉</h3>
        <v-data-table
            :headers="headers_Fridge"
            :items="meatsFridgeList"
        >
        <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
        <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>
        <h3>魚</h3>
        <v-data-table
            :headers="headers_Fridge"
            :items="fishFridgeList"
        >
        <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
        <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>
        <h3>果物</h3>
        <v-data-table
            :headers="headers_Fridge"
            :items="fruitFridgeList"
        >
        <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
        <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>

        <v-btn>追加</v-btn>

    </v-container>
</template>


<script setup lang="ts">

    import type { VDataTable } from 'vuetify/components';

    //単位テーブルのデータストア
    import { useUnitStore } from '@/stores/unit';
    const unitStore = useUnitStore();
    unitStore.initList();//単位データの取得
    type VDataTableHeader = VDataTable["headers"];

    const headers: VDataTableHeader = [
        {key: "name"},
        {key: "amount"},
        {key: "unit"}
    
    ]
    //今日のおすすめ関連
    interface ingredients{
        id: number,
        name: string,
        amount: number,
        unit: string
    };    
    const headers_Fridge: VDataTableHeader = [
        {key: "name"},
        {key: "amount"},
        {key: "unit"}
    ]
    const ingredientsListInit: ingredients[] = [
        {id:1, name:"砂糖", amount:2, unit:"大さじ"},
        {id:2, name:"じゃがいも", amount:3, unit:"個"},

    ]
    //あなたの冷蔵庫関連
    interface ingredientsFridge{
        id: number,
        name: string,
        amount: number,
        unit: string,
        kind: string
    }

    const ingredientsListFridgeInit: ingredientsFridge[] = [
        {id:3, name:"豚肉", amount:300, unit:"g", kind:"肉"},
        {id:4, name:"牛肉", amount:100, unit:"g", kind:"肉"},
        {id:5, name:"まぐろ", amount:100, unit:"g", kind:"魚"},
        {id:6, name:"みかん", amount:5, unit:"個", kind:"果物"},
        {id:7, name:"シャインマスカット", amount: 1, unit:"房", kind:"果物"},
    ]
    const meatsFridgeList: ingredientsFridge[] = [];
    const fishFridgeList: ingredientsFridge[] = [];
    const fruitFridgeList: ingredientsFridge[] = [];
    for (let ingredient of ingredientsListFridgeInit){
        if (ingredient["kind"] === "肉"){
            meatsFridgeList.push(ingredient);
        }else if (ingredient["kind"] === "魚"){
            fishFridgeList.push(ingredient);
        }else if(ingredient["kind"] === "果物"){
            fruitFridgeList.push(ingredient);
        }
    };
</script>