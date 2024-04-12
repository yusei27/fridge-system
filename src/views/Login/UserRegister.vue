<template>
    <v-row>
    <h3>ユーザー登録</h3>
    </v-row>
    <v-form
        @submit.prevent="submit">
        <v-row>
            <v-col>
                <v-text-field
                    v-model="name"
                    label="名前を入力"
                    variant="outlined"
                    rows="1">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    v-model=email
                    label="メールアドレスを入力"
                    variant="outlined"
                    :rules="[rules.email]"
                    rows="1"
                    type="email">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                        v-model="password"
                        label="パスワードを入力"
                        variant="outlined"
                        :rules="[rules.password]"
                        rows="1"
                        type="password">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                        v-model="password_confirm"
                        label="パスワード（確認）を入力"
                        variant="outlined"
                        :rules="[rules.password, rules.passwordConfirm]"
                        rows="1"
                        type="password"
                        >
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-btn
                type="submit"
                text="登録">
            </v-btn>
        </v-row>
    </v-form>
    
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import axios, {type AxiosResponse, AxiosError} from "axios";
    const name = ref();
    const email = ref();
    const password = ref();
    const password_confirm= ref();
    const rules = {
        email:
            (v:string) => !!(v || '').match(/@/) || 'Please enter a valid email',
        password:(v:string) => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        passwordConfirm:(v:string)=>(v == password.value) || 'Password must match'
    }
    

    function submit(events:SubmitEvent):void {
        console.log("submit", "name", name.value, "email", email.value, "password", password.value, "password_confirm", password_confirm.value);
        const results = events;
        alert(JSON.stringify(results, null, 2));
        type request = {
            "user": {
                "email":string,
                "password":string,
                "password_confirm":string
            }
        };
        const data_request:request = {'user': {"name":name.value, "email":email.value, "password":password.value, "password_confirm":password_confirm.value}}
        
        axios.post("http://localhost:3333//register/user", JSON.stringify(data_request), {headers:{'Content-Type': 'application/json'}})
            .then((res: AxiosResponse) => {
                console.log("ユーザー登録API成功");
            })
            .catch((e: AxiosError<{error: string}>) => {
                console.log("ユーザー登録API失敗");
            })
    };

</script>

<style>
    .koumoku{
    color: #fff;
    background: #eb6100;
    font-weight: 2000;
    margin: 12px;
    
    }
    .nyuuryoku{
        margin: 0px;
        /*background-color: #eb6100;*/
    }
</style>