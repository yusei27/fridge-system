 <template>
    
    <v-container>
        <h2>買い物リスト</h2>
        <v-data-table
            :headers="headersShoppingListTable"
            :items="shopItemListInit"
            v-model="shopItemListInit"
            item-key="id"
            show-select>
            <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
            <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
            <template v-slot:item.data-table-select="{ item, isSelected }" >
                <v-checkbox @change="buyItem(item)">
                </v-checkbox>
            </template>
        </v-data-table>
    </v-container>
    <v-container>
        <h2>購入済みリスト</h2>
        <v-data-table
            :headers="headersBuyedItemListTable"
            :items="buyedItemListInit"
            v-model="buyedItemListInit"
        >
            <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
            <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>

    </v-container>
</template>

<script setup lang="ts">
    import {reactive} from "vue";
    import type {VDataTable} from 'vuetify/components';
    type VDataTableHeader = VDataTable["headers"];

    const headersShoppingListTable: VDataTableHeader = [
        {key: "id"},
        {key: "name"}
    ];

    //買い物リスト
    interface shopItem{
        id: number,
        name: string
    };

    const shopItemListInit: shopItem[] = reactive([
        {id:1, name:"ミックスナッツ"},
        {id:2, name:"うどん"}
    ]);
    //購入済みリスト
    interface buyedItem{
        id:number,
        name: string
    };
    const headersBuyedItemListTable: VDataTableHeader = [
        {key: "id"},
        {key: "name"}
    ];
    const buyedItemListInit: buyedItem[] = reactive([]);
    function buyItem(item: buyedItem):void {
        console.log("購入済みリスト追加イベント", item);
        const idShopItem =  shopItemListInit.findIndex(element => element.id === item.id);
        shopItemListInit.splice(idShopItem, 1);
        buyedItemListInit.push(item);
    }
</script>