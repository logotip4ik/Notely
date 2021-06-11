import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { store } from '../store';
import Tab from '../views/Tab.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Search from '../views/Search.vue';
import Settings from '../views/Settings.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Login' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/tab',
    name: 'Tab',
    component: Tab,
    redirect: '/tab/home',
    children: [
      {
        path: '',
        redirect: 'home',
      },
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
    ],
  },
  // {
  //   path: '/message/:id',
  //   component: () => import('../views/ViewMessage.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.name === 'Login') return next();
  if (!store.state.loggedIn) return next({ name: 'Login' });
  next();
});

export default router;
