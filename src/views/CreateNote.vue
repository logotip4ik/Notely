<template>
  <ion-page>
    <ion-content class="ion-padding-top">
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
            required
            ref="input1"
            autofocus="true"
            @keypress.enter="$refs.input2.focus()"
          ></ion-input>
        </ion-item>
        <ion-item class="iion-margin-bottom">
          <ion-label position="floating">Text</ion-label>
          <ion-input
            v-model="value"
            ref="input2"
            clear-input
            type="text"
            required
          ></ion-input>
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
import { defineComponent, ref, onMounted } from 'vue';
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
  onIonViewDidEnter,
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { v4 } from 'uuid';

export default defineComponent({
  setup() {
    const input1 = ref(null);

    const title = ref('');
    const value = ref('');

    function handleSubmit() {
      if (!title.value && !value.value) return;
      const item = {
        id: v4(),
        title: title.value,
        value: value.value,
        createdAt: new Date(),
      };
      console.log(item);
    }
    function resetForm() {
      title.value = '';
      value.value = '';
    }

    onIonViewDidEnter(() => {
      if (!input1.value) return;
      // setTimeout(() => {
      //   input1.value.setFocus();
      // }, 150);
      // input1.value.setFocus();
    });

    return { title, value, arrowBack, handleSubmit, resetForm, input1 };
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
  },
});
</script>
