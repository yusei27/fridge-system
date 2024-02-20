<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from './views/Login/LoginView.vue'
</script>

<template>
  <v-app>
    <!-- ヘッダーここから-->
    <v-app-bar color="primary">
      冷蔵庫ちゃん
    </v-app-bar>
    <!-- ヘッダーここまで-->
    <v-main>
      <RouterView ></RouterView>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
