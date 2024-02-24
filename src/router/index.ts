import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login/LoginView.vue'
import MainView from '../views/main/MainView.vue'
import ShoppingListView from '../views/ShoppingList/ShoppingListView.vue'

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
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSetting
});

export default router;
