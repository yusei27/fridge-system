<template>
    <v-container>
        <v-card>
            <v-text-field type="email"></v-text-field>
            <v-text-field type="password"></v-text-field>
            <RouterLink v-bind:to="{name: 'Main'}" tag="v-btn">
                <v-col>
                    <v-btn>ログイン</v-btn>
                </v-col>
            </RouterLink>
            <v-col>
                <v-btn>新規会員登録</v-btn>
            </v-col>
        </v-card>
    </v-container>
</template>