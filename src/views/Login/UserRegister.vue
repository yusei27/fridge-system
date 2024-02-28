<template>
    <v-row>
    <h3>ユーザー登録</h3>
    </v-row>
    <v-form
        @submit.prevent="submit">
        <v-row>
            <v-col>
                <v-text-field
                    ref="form"
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
    const form = ref();
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

    // function passwordConfirm(v:string){
    //     console.log("v", v)
    //     console.log("password", password.value);
    //     console.log("password_confirm", password_confirm.value);
    //     return !!(password_confirm.value == password.value) || password.value
    // }
    

    function submit(events:SubmitEvent):void {
        console.log("submit");
        console.log("email", email.value);
        console.log("password", password.value);
        console.log("password_confirm", password_confirm.value);
        const results = events;
        alert(JSON.stringify(results, null, 2));
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