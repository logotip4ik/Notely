<template>
  <ion-page>
    <ion-header v-if="note" class="padding-top">
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
        <ion-buttons v-if="editing" slot="end">
          <ion-button
            color="success"
            fill="solid"
            shape="round"
            @click="saveNote"
          >
            <ion-icon :icon="checkmark"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="note" class="ion-padding">
      <ion-item-divider>
        <ion-label class="ion-text-wrap">
          <span
            class="font-weight-400 font-size-large"
            contenteditable
            @input="handleInput($event, 'title')"
            >{{ note.title }}</span
          >
        </ion-label>
      </ion-item-divider>
      <br />
      <br />
      <ion-text contenteditable @input="handleInput($event, 'value')">
        {{ note.value }}
      </ion-text>
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
  IonText,
  IonLabel,
  IonItemDivider,
} from '@ionic/vue';
import { arrowBack, checkmark } from 'ionicons/icons';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const note = ref(null);
    const editing = ref(false);
    const newNote = ref({});

    if (!route.params.id) return router.push({ name: 'Home' });
    const { id } = route.params;

    store
      .dispatch('getOne', id)
      .then((encryptedNote) => {
        store
          .dispatch('decryptNote', encryptedNote)
          .then((val) => (note.value = val))
          .catch(() => router.push({ name: 'Home' }));
      })
      .catch(() => router.push({ name: 'Home' }));

    function handleInput({ target }, type) {
      editing.value = true;
      newNote.value[type] = target.textContent;
    }
    function saveNote() {
      store.dispatch('editNote', {
        ...note.value,
        ...newNote.value,
        createdAt: new Date(),
      });
      editing.value = false;
    }

    return {
      note,
      editing,
      arrowBack,
      checkmark,
      handleInput,
      saveNote,
    };
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
    IonText,
    IonLabel,
    IonItemDivider,
  },
});
</script>

<style>
.font-size-large {
  font-size: 1.5rem;
}
.padding-top {
  padding-top: 2rem;
}
</style>
