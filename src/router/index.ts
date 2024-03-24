import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/Login/LoginView.vue';
import MainView from '../views/main/MainView.vue';
import ShoppingListView from '../views/ShoppingList/ShoppingListView.vue';
import RecipeListView from '../views/Recipe/RecipeList.vue';
import RecipeRegister from '../views/Recipe/RecipeRegister.vue';
import RecipeDetail from '../views/Recipe/RecipeDetail.vue';
import UserRegister from '../views/Login/UserRegister.vue';
const routeSetting: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Main',
    name: 'Main',
    component: MainView
  },
  {
    path:'/ShoppingList',
    name: 'ShoppingList',
    component: ShoppingListView
  },
  {
    path:'/RecipeList',
    name:'RecipeList',
    component: RecipeListView
  },
  {
    path: '/RecipeRegister',
    name: 'RecipeRegister',
    component: RecipeRegister
  },
  {
    path: '/RecipeDetail/:id_recipe',
    name: 'RecipeDetail',
    component: RecipeDetail,
    props: route => {
      //componentに渡すデータを設定
      console.log('route', route);
     return {id_recipe:route.params.id_recipe}
    }
  },
  {
    path: '/UserRegister',
    name: 'UserRegister',
    component: UserRegister
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSetting,
});

export default router;
