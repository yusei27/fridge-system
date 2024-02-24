 <template>
    <h2>買い物リスト</h2>
    <v-container>
        <v-data-table
            :headers="headersShoppingListTable"
            :items="shopItemListInit"
            item-key="name"
            show-select>
            <template #headers></template><!-- v-data-tabeeのヘッダーを削除-->
            <template #bottom></template><!-- v-data-tabeeのフッターを削除-->
        </v-data-table>
        <v-checkbox label="Checkbox 1" color="red" value="red"></v-checkbox>
    </v-container>
    <v-checkbox label="Checkbox"></v-checkbox>
</template>

<script setup lang="ts">
    import type {VDataTable} from 'vuetify/components';
    type VDataTableHeader = VDataTable["headers"];

    const headersShoppingListTable: VDataTableHeader = [
        {key: "name"}
    ];

    //買い物リスト
    interface shopItem{
        id: number,
        name: string
    };

    const shopItemListInit: shopItem[] = [
        {id:1, name:"ミックスナッツ"},
        {id:2, name:"うどん"}
    ];
</script>