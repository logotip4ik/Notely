<template>
  <ion-page>
    <ion-content fullscreen>
      <div class="center">
        <h1 class="ion-margin-bottom">Notely</h1>
        <ion-item class="ion-margin-bottom">
          <ion-label position="floating">
            Master Password
          </ion-label>
          <ion-input
            v-model="masterPassword"
            autofocus
            clear-input
            type="password"
            maxlength="18"
            @keypress.enter.prevent="handleClick"
          />
        </ion-item>
        <ion-button expand="block" color="dark" @click="handleClick">
          Decrypt
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
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
    const router = useRouter();
    const store = useStore();
    const masterPassword = ref('');

    function handleClick() {
      if (!masterPassword.value) return;
      store
        .dispatch('compare', masterPassword.value)
        .then((same: boolean) => {
          if (same) return router.push({ name: 'Home' });
        })
        .catch((err: Error) => console.warn(err));
    }

    return { masterPassword, handleClick };
  },
  components: { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel },
});
</script>

<style>
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
  /* background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%); */
  /* background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); */
  /* background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%); */
  background-image: linear-gradient(
    -225deg,
    #2cd8d5 0%,
    #c5c1ff 56%,
    #ffbac3 100%
  );
  color: transparent;
  background-size: 200% 200%;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: rainbow 8s ease infinite;
}

@keyframes rainbow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 25%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
