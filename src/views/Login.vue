<template>
  <ion-page>
    <ion-content fullscreen>
      <div class="center">
        <h1 class="ion-margin-bottom">Notely</h1>
        <ion-item>
          <ion-label
            position="floating"
            :color="form.error ? 'danger' : 'primary'"
          >
            Master Password
          </ion-label>
          <ion-input
            v-model="masterPassword"
            clear-input
            type="password"
            maxlength="18"
            ref="input"
            @ion-focus="form.error = false"
            @keypress.enter.prevent="handleClick"
          />
        </ion-item>
        <ion-text
          color="danger"
          class="font-size-small"
          ref="errorText"
          v-html="form.errorMessage || '&nbsp;'"
        ></ion-text>
        <ion-button
          expand="block"
          color="dark"
          @click="handleClick"
          class="ion-margin-top"
        >
          Decrypt
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  onIonViewDidEnter,
  IonText,
  createAnimation,
} from '@ionic/vue';

export default defineComponent({
  setup() {
    const input = ref(null);
    const errorText = ref(null);

    const router = useRouter();
    const store = useStore();
    const masterPassword = ref('');
    const form = reactive({ error: false, errorMessage: '' });

    function handleClick() {
      if (!masterPassword.value)
        return (
          (form.error = true),
          (form.errorMessage = 'You need to type your password')
        );
      if (masterPassword.value.length < 8)
        return (
          (form.error = true),
          (form.errorMessage = 'Your password is too short')
        );
      store
        .dispatch('compare', masterPassword.value)
        .then((same) => {
          if (same) {
            router.push({ name: 'Home' });
            store.dispatch('decryptAllNotes');
          } else {
            form.errorMessage = 'You typed wrong password';
            form.error = true;
          }
        })
        .catch((err) => console.warn(err));
    }

    watch(form, ({ error }) => {
      const anim = createAnimation()
        .addElement(errorText.value.$el)
        .duration(200);
      console.log({ error });
      if (error) anim.fromTo('opacity', '0', '1');
      else anim.fromTo('opacity', '1', '0');
      anim.play();
    });

    onIonViewDidEnter(() => {
      setTimeout(() => input.value.$el.children[0].focus(), 150);
    });

    return { masterPassword, handleClick, input, form, errorText };
  },
  components: {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonText,
  },
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

.font-size-small {
  font-size: 0.8rem;
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
