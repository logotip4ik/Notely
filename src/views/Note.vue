<template>
  <ion-page>
    <ion-header v-if="note">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
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
    <ion-content v-if="note" class="ion-padding" fullscreen>
      <ion-item-divider>
        <ion-label class="ion-text-wrap">
          <ion-textarea
            :rows="1"
            auto-grow
            ref="title"
            :value="note.title"
            class="font-weight-400 font-size-large no-input"
            @input="handleInput($event, 'title')"
          />
        </ion-label>
      </ion-item-divider>
      <br />
      <ion-text>
        <ion-textarea
          auto-grow
          ref="value"
          :value="note.value"
          class="no-input"
          @input="handleInput($event, 'value')"
        ></ion-textarea>
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
  IonTextarea,
  IonBackButton,
} from '@ionic/vue';
import { checkmark } from 'ionicons/icons';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const title = ref(null);
    const value = ref(null);

    const note = ref(null);
    const editing = ref(false);
    const newNote = ref({});

    if (!route.params.id) return router.push({ name: 'Home' });
    const { id } = route.params;

    store
      .dispatch('getOne', id)
      .then((n) => (note.value = n))
      .catch(() => router.push({ name: 'Home' }));

    function handleInput({ target }, type) {
      editing.value = true;
      newNote.value[type] = target.value;
    }
    function saveNote() {
      const n = {
        ...note.value,
        title: newNote.value.title
          ? newNote.value.title.trim()
          : note.value.title,
        value: newNote.value.value
          ? newNote.value.value.trim()
          : note.value.value,
        createdAt: new Date(),
      };
      store.dispatch('editNote', n);
      note.value = n;
      editing.value = false;
    }

    return {
      note,
      editing,
      checkmark,
      handleInput,
      saveNote,
      title,
      value,
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
    IonTextarea,
    IonBackButton,
  },
});
</script>

<style>
.font-size-large {
  font-size: 1.5rem;
}
.no-input {
  border: none;
  outline: none;
}
</style>
