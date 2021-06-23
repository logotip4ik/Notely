<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <h1>{{ $route.name }}</h1>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item-divider>
          <ion-list-header>
            <h3>
              Appearence
            </h3>
          </ion-list-header>
        </ion-item-divider>
        <ion-item>
          <h4 class="font-weight-400 padding-left">Dark Mode</h4>
          <ion-note slot="end">
            <ion-toggle
              :checked="darkMode"
              @ionChange="toggleDarkMode"
            ></ion-toggle>
          </ion-note>
        </ion-item>
        <ion-item-divider>
          <ion-list-header>
            <h3>
              Security
            </h3>
          </ion-list-header>
        </ion-item-divider>
        <ion-item @click="showAskAlert">
          <h4 class="font-weight-400 padding-left">
            Change password
          </h4>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-alert header="Change Password"> </ion-alert>
  </ion-page>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
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
  IonListHeader,
  IonItemDivider,
  IonAlert,
  alertController,
  toastController,
} from '@ionic/vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const confirmNewPassword = ref(null);

    const store = useStore();
    const router = useRouter();
    const darkMode = computed(() => store.state.darkMode);

    const toggleDarkMode = () => store.dispatch('toggleDarkMode');

    async function showToast(msg) {
      const toast = await toastController.create({
        keyboardClose: true,
        message: msg,
        duration: 3500,
      });
      return toast.present();
    }

    async function changePassword(ev) {
      if (ev[0].length < 8) return showToast('Your new password was too short');
      else if (ev[0] !== ev[1])
        return showToast('You typed different passwords');
      store.dispatch('changePassword', ev[0]).then(() => {
        router.push({ name: 'Home' });
        showToast('Password was successfully changed');
      });
    }

    async function showPasswordAlert() {
      const alert = await alertController.create({
        header: 'Change Password',
        inputs: [
          {
            type: 'password',
            placeholder: 'New Password',
            attributes: {
              onKeyPress: ({ key }) =>
                key === 'Enter' ? confirmNewPassword.value.focus() : null,
            },
          },
          {
            type: 'password',
            placeholder: 'Confirm new Password',
            attributes: {
              ref: (el) => (confirmNewPassword.value = el),
            },
          },
        ],
        buttons: [
          {
            text: 'Change',
            role: 'confirm',
            handler: changePassword,
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      });
      await alert.present();
    }

    async function showAskAlert() {
      const alert = await alertController.create({
        header: 'You are going to change the password',
        message: 'Are you sure about that?',
        buttons: [
          {
            text: 'Change',
            role: 'confirm',
            cssClass: 'danger',
            handler: showPasswordAlert,
          },
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'primary',
          },
        ],
      });
      await alert.present();
    }

    return { darkMode, toggleDarkMode, showAskAlert, confirmNewPassword };
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
    IonListHeader,
    IonItemDivider,
    IonAlert,
  },
});
</script>

<style>
.padding-left {
  padding-left: 2rem;
}
</style>
