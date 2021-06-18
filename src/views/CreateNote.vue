<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tab/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Create Note</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="handleSubmit" class="ion-padding form">
        <ion-item class="ion-margin-bottom">
          <ion-label position="floating">Title</ion-label>
          <ion-input
            v-model="title"
            clear-input
            type="text"
            ref="input1"
            autofocus="true"
            @keypress.enter="$refs.input2.focus()"
          ></ion-input>
        </ion-item>
        <ion-item class="ion-margin-bottom">
          <ion-label position="floating">Text</ion-label>
          <ion-textarea
            v-model="value"
            ref="input2"
            clear-input
            type="text"
            :auto-grow="true"
            :rows="3"
            @keydown.enter="handleSubmit"
          ></ion-textarea>
        </ion-item>
        <ion-buttons class="ion-justify-content-end ion-padding-top">
          <ion-button
            type="submit"
            color="primary"
            fill="solid"
            style="margin-right: 1rem !important;"
          >
            Add
          </ion-button>
          <ion-button
            type="reset"
            color="warning"
            fill="outline"
            @click="resetForm"
          >
            Reset
          </ion-button>
        </ion-buttons>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonBackButton,
  onIonViewDidEnter,
} from '@ionic/vue';
import { v4 } from 'uuid';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const input1 = ref(null);

    const store = useStore();
    const router = useRouter();

    const title = ref('');
    const value = ref('');

    function resetForm() {
      title.value = '';
      value.value = '';
    }
    function handleSubmit() {
      if (!title.value || !value.value) return;
      const note = {
        id: v4(),
        title: title.value,
        value: value.value,
        starred: false,
        createdAt: new Date(),
      };
      store.dispatch('createNote', note).then(() => {
        resetForm();
        router.go(-1);
      });
    }

    onIonViewDidEnter(() => {
      input1.value.$el.children[0].focus();
    });

    return { title, value, handleSubmit, resetForm, input1 };
  },
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
    IonBackButton,
  },
});
</script>
