<template>
  <ion-page>
    <ion-content v-if="note" class="ion-padding-top">
      <ion-header class="ion-padding-top">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button
              color="primary"
              fill="outline"
              shape="round"
              @click="$router.go(-1)"
            >
              <ion-icon :icon="arrowBack"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>{{ note.title }}</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../store';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const note = ref(null);

    if (!route.params.id) return router.push({ name: 'Home' });
    const { id } = route.params;

    store
      .dispatch('getOne', id)
      .then((val) => (note.value = val))
      .catch(() => router.push({ name: 'Home' }));

    return { note, arrowBack };
  },
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButtons,
    IonButton,
  },
});
</script>
