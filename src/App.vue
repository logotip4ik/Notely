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
import { useBackButton, onIonViewDidEnter } from '@ionic/vue';
import { useStore } from '@/store';

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

    function toggleDarkTheme(shouldAdd: boolean) {
      document.body.classList.toggle('dark', shouldAdd);
    }
    function onPause() {
      store.state.loggedIn = false;
      console.log('isInBackground');
      router.push({ name: 'Login' });
    }

    useBackButton(10, () => {
      if (window.history.length === 0 || route.name === 'Login')
        return App.exitApp();
      return router.go(-1);
    });

    onIonViewDidEnter(() => {
      document.addEventListener('pause', onPause, false);
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
});
</script>

<style>
:root {
  --ion-safe-area-top: 2rem;
}

.padding-top {
  padding-top: 2rem;
}
</style>
