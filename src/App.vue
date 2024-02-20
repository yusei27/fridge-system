<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from './views/Login/LoginView.vue'
</script>

<template>
  <RouterLink v-bind:to="{name: 'Login'}"></RouterLink>
  <RouterView ></RouterView>
  <h3>あ</h3>
</template>

<style scoped>
</style>
