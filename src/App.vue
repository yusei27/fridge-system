<script setup lang="ts">
import {computed} from "vue";
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import Login from './views/Login/LoginView.vue';

//ログインしたユーザーのデータストア
import { useLoginUserStore } from '@/stores/loginuser';
const loginUserStore = useLoginUserStore();
const loginFlag = computed(
  ():boolean => {
    return loginUserStore.loginFlag;
  }
);
</script>

<template>
  <v-app>
    <!-- ヘッダーここから-->
    <v-app-bar color="primary">
      <v-app-bar-title>冷蔵庫ちゃん</v-app-bar-title>
      <template v-slot:append v-if="loginFlag">
        <RouterLink v-bind:to="{name: 'ShoppingList'}" tag="v-btn">
          <v-btn class="app-bar-button">買い物リスト</v-btn>
        </RouterLink>
        <RouterLink v-bind:to="{name: 'RecipeList'}" tag="v-btn">
          <v-btn class="app-bar-button">レシピ一覧</v-btn>
        </RouterLink>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              class="app-bar-account"
              v-bind="props"
            >
              アカウント
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item
                title="ドラえもん">
              </v-list-item>
              <v-list-item
                title="doradora@fujio.com">
              </v-list-item>
              <v-list-item>
                  <v-btn>詳細情報</v-btn>
              </v-list-item>

            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>
    <!-- ヘッダーここまで-->
    <v-main>
      <RouterView ></RouterView>
    </v-main>
    <!-- v-fotterにapp propを付与すると画面下部に固定-->
    <v-footer color="primary" app>
      <div>Footer</div>
    </v-footer>
  </v-app>
</template>

<style scoped>
.app-bar-button{
  color: #fff;
  background: #eb6100;
  font-weight: 2000;
  margin: 3px;
}
.app-bar-account{
  color: #fff;
  background: #eb6100;
  font-weight: 2000;
  margin: 3px;
}
</style>
