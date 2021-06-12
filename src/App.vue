<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';
import { useBackButton } from '@ionic/vue';
import { store } from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    store.dispatch('checkForNotes');

    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({ style: Style.Light });

    useBackButton(10, () => {
      if (window.history.length === 0 || route.name === 'Login')
        return App.exitApp();
      return router.go(-1);
    });
    // NEED TO FIX: This don't work, problem with sdk
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // this.toggleDarkTheme(prefersDark.matches);
    // prefersDark.addListener((mediaQuery) => {
    //   console.log({ darkMode: mediaQuery.matches });
    //   this.toggleDarkTheme(mediaQuery.matches);
    // });
  },
  beforeUnmount() {
    store.state.db.close();
  },
  methods: {
    toggleDarkTheme(shouldAdd: boolean) {
      document.body.classList.toggle('dark', shouldAdd);
    },
  },
});
</script>
