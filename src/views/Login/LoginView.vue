<template>
    <v-container>
        <v-card min-width="300">
            <v-text-field type="email"></v-text-field>
            <v-text-field type="password"></v-text-field>
            <RouterLink v-bind:to="{name: 'Main'}" tag="v-btn">
                <v-col>
                    <v-btn v-on:click="onLoginButtonClick">ログイン</v-btn>
                </v-col>
            </RouterLink>
            <v-col>
                <v-btn>新規会員登録</v-btn>
            </v-col>
        </v-card>
    </v-container>
</template>


<script setup lang="ts">
import { useLoginUserStore } from '@/stores/loginuser';
const LoginUserStore = useLoginUserStore();


const onLoginButtonClick = () => {
    LoginUserStore.loginSuccess();
}
</script>
