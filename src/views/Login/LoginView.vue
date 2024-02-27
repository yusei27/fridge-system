<template>
    <v-container>
        <v-card min-width="300">
            <v-text-field type="email"></v-text-field>
            <v-text-field type="password"></v-text-field>       
            <v-col>
                <RouterLink v-bind:to="{name: 'Main'}" tag="v-btn">
                    <v-btn v-on:click="onLoginButtonClick">ログイン</v-btn>
                </RouterLink>
            </v-col>
            <v-col>
                <RouterLink v-bind:to="{name: 'UserRegister'}" tag="v-btn">
                    <v-btn>新規会員登録</v-btn>
                </RouterLink>
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
