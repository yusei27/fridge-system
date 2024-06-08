<script setup lang="ts">
import {computed} from "vue";
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import Login from './views/Login/LoginView.vue';
import axios, {type AxiosResponse, AxiosError} from "axios";

import {storeToRefs} from 'pinia'

//ログインしたユーザーのデータストア
import { useLoginUserStore } from '@/stores/loginuser';
const loginUserStore = useLoginUserStore();
const loginFlag = computed(
  ():boolean => {
    return loginUserStore.loginFlag;
  }
);

//アラートのデータストア
import { usenotificationStore, type notification_type} from "./stores/notification";
const notificationStore = usenotificationStore();
const { notificationList } = storeToRefs(notificationStore)

//開発用
//セッションの確認
const session = () => {
  axios.get("http://localhost/loginapi/session", {withCredentials:true})
    .then((res:AxiosResponse) => {
      console.log("セッション維持中")
    })
    .catch((e: AxiosError<{error:string}>) => {
      console.log("セッション破棄されています")
    })
}

var num:number = 0
const addNotification = () => {
  num += 1;
  const message:string = "テスト" + num.toString();
  var kind:notification_type
  if (num % 2 === 0){
    kind = "error"
  } else{
    kind = "success"
  }
  notificationStore.pushnotificationList(kind, message)
}
</script>

<template>
  <v-app>
    <!-- ヘッダーここから-->
    <v-app-bar color="primary">
      <v-app-bar-title>冷蔵庫ちゃん</v-app-bar-title>
      <template v-slot:append v-show="loginFlag">
        <RouterLink v-bind:to="{name: 'Main'}" tag="v-btn">
          <v-btn class="app-bar-button">ホーム画面</v-btn>
        </RouterLink>
        <RouterLink v-bind:to="{name: 'ShoppingList'}" tag="v-btn">
          <v-btn class="app-bar-button">買い物リスト</v-btn>
        </RouterLink>
        <RouterLink v-bind:to="{name: 'RecipeList'}" tag="v-btn">
          <v-btn class="app-bar-button">レシピ一覧</v-btn>
        </RouterLink>
        <v-btn class="app-bar-button" v-on:click="session">セッション確認</v-btn>
        <v-btn class="app-bar-button" v-on:click="addNotification">アラートテスト</v-btn>

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

    <v-main class="v-main-container">
      <v-container fluid>
        <div class="notificationContainer">
        <v-slide-y-transition group>
            <v-alert
            v-for="notification in notificationList"
            theme="dark"
            :type="notification.type"
            dismissible
            >{{ notification.message }}</v-alert>
        </v-slide-y-transition>
        </div>
       
          <!--<v-btn @click="removeNotification">New notification</v-btn>-->
        <RouterView ></RouterView>
      </v-container>  
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


.v-application__wrap {
    min-height: 100vh;
    width: 100vw;
    width: 500px;
  }


.v-main-container {
  width: 100vw;
  float: left;
}
</style>
