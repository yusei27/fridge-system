<template>
    <v-container fluid class="n1">
        <v-card min-width="300">
            <v-row>
                <v-col cols="12" lg="6" md="12">
                    <v-text-field v-model=email type="email" label="email"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="12">
                <v-text-field v-model=password type="password" label="password"></v-text-field>       
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <!--<RouterLink v-bind:to="{name: 'Main'}" tag="v-btn">-->
                        <v-btn v-on:click="onLoginButtonClick">ログイン</v-btn>
                    <!-- </RouterLink> -->
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <RouterLink v-bind:to="{name: 'UserRegister'}" tag="v-btn">
                        <v-btn>新規会員登録</v-btn>
                    </RouterLink>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>


<script setup lang="ts">
import {ref, type Ref} from "vue";
import { useLoginUserStore } from '@/stores/loginuser';
import axios, {type AxiosResponse, AxiosError} from "axios";
import {instance} from '@/network/axiosutils'
import { useRouter } from "vue-router";
const LoginUserStore = useLoginUserStore();

//入力フォームの値
const email = ref("");
const password = ref("");

//ルータ
const router = useRouter()



const onLoginButtonClick = () => {
    type request = {
    "email":string,
    "password":string,
    };
    const data_request:request = {"email":email.value, "password":password.value};
    console.log("ログイン認証情報", data_request);
    //axios.post("http://localhost:3000/login", JSON.stringify(data_request),{headers:{'Content-Type': 'application/json'}})
    //axios.post("https://localhost:3000/login", {withCredentials:true})
    axios("https://localhost:3000/login",{
        method: "post",
        data:data_request,
        withCredentials: true,
        headers:{'content-type': 'application/x-www-form-urlencoded'}
    })
                .then((res: AxiosResponse) => {
                    console.log("ログインAPI成功");
                    LoginUserStore.loginSuccess();
                    router.push({name: "Main"})
                })
                .catch((e: AxiosError<{error: string}>) => {
                    console.log("ログイン登録API失敗");
                })
    
}
</script>
