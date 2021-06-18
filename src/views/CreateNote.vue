<template>
  <ion-page>
    <ion-content class="ion-padding-top">
      <ion-header class="ion-padding-top">
        <ion-toolbar>
          <!-- TODO: V-SLOT DONT WORK -->
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
          <ion-title>Create Note</ion-title>
        </ion-toolbar>
      </ion-header>
      <form @submit.prevent="handleSubmit" class="ion-padding form">
        <ion-item class="ion-margin-bottom">
          <ion-label position="floating">Title</ion-label>
          <ion-input
            v-model="title"
            clear-input
            type="text"
            ref="input1"
            :autofocus="true"
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
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  // onIonViewDidEnter,
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { v4 } from 'uuid';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
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
        createdAt: new Date(),
      };
      store.dispatch('createNote', note).then(() => {
        resetForm();
        router.go(-1);
      });
    }
    // TODO: Autofocus on $refs.input1
    return { title, value, arrowBack, handleSubmit, resetForm };
  },
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
  },
});
</script>
