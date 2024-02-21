<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from './views/Login/LoginView.vue'

const LoginViewFlag: boolean = false;
</script>

<template>
  <v-app>
    <!-- ヘッダーここから-->
    <v-app-bar color="primary">
      <v-app-bar-title>冷蔵庫ちゃん</v-app-bar-title>
      <template v-slot:append v-if="LoginViewFlag">
        <v-btn class="app-bar-button">買い物リスト</v-btn>
        <v-btn class="app-bar-button">レシピ一覧</v-btn>
        <v-btn class="app-bar-button">アカウント</v-btn>
      </template>
    </v-app-bar>
    <!-- ヘッダーここまで-->
    <v-main>
      <RouterView ></RouterView>
    </v-main>
    <v-footer color="primary">
      Footer
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
</style>
