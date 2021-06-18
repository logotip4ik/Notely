<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { computed, defineComponent, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';
import { useBackButton } from '@ionic/vue';
import { useStore, store } from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    store.dispatch('checkForNotes');

    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: '#ffffff' });

    const darkMode = computed(() => store.state.darkMode);

    // NEED TO FIX: This don't work, problem with sdk
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // this.toggleDarkTheme(prefersDark.matches);
    // prefersDark.addListener((mediaQuery) => {
    //   console.log({ darkMode: mediaQuery.matches });
    //   this.toggleDarkTheme(mediaQuery.matches);
    // });
    function toggleDarkTheme(shouldAdd: boolean) {
      document.body.classList.toggle('dark', shouldAdd);
    }

    useBackButton(10, () => {
      if (window.history.length === 0 || route.name === 'Login')
        return App.exitApp();
      return router.go(-1);
    });

    watch(darkMode, (isDarkMode) => {
      toggleDarkTheme(isDarkMode);
      if (isDarkMode) {
        StatusBar.setStyle({ style: Style.Dark });
        StatusBar.setBackgroundColor({ color: '#121212' });
      } else {
        StatusBar.setStyle({ style: Style.Light });
        StatusBar.setBackgroundColor({ color: '#ffffff' });
      }
    });
  },
  beforeUnmount() {
    store.state.db.close();
  },
});
</script>

<style></style>
