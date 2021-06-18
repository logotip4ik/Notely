<template>
  <ion-page>
    <ion-header class="ion-padding-top">
      <ion-toolbar>
        <ion-title>
          <h1>{{ $route.name }}</h1>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list class="ion-padding-top">
        <ion-item>
          <h4 class="font-weight-400">Dark Mode</h4>
          <!-- TODO: V-SLOT DONT WORK -->
          <ion-note slot="end">
            <ion-toggle
              :value="darkMode"
              @ionChange="toggleDarkMode"
            ></ion-toggle>
          </ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonNote,
  IonToggle,
} from '@ionic/vue';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);

    const toggleDarkMode = () => store.dispatch('toggleDarkMode');

    return { darkMode, toggleDarkMode };
  },
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonNote,
    IonToggle,
  },
});
</script>
