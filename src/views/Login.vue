<template>
  <ion-page>
    <ion-content fullscreen>
      <div class="center">
        <h1>Password Manager</h1>
        <ion-item class="ion-margin-bottom">
          <ion-label position="floating" color="">
            Master Password
          </ion-label>
          <ion-input v-model="masterPassword" autofocus clear-input />
        </ion-item>
        <ion-button expand="block" color="dark" @click="log">
          Decrypt
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from '@ionic/vue';

export default defineComponent({
  setup() {
    const masterPassword = ref('');

    watch(masterPassword, (val) => console.log(val));

    const log = (ev) => console.log(ev);

    return { masterPassword, log };
  },
  components: { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel },
});
</script>

<style>
:root {
  --color: #bbb !important;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 300px;
  text-align: center;
}

.center h1 {
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
