<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/tab/home">
            <ion-icon :icon="create"></ion-icon>
            <ion-label>Notes</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="search" href="/tab/search">
            <ion-icon :icon="search"></ion-icon>
            <ion-label>Search</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="settings" href="/tab/settings">
            <ion-icon :icon="cog"></ion-icon>
            <ion-label>Settings</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
      <ion-fab class="fab" @click="() => $router.push({ name: 'Create' })">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  IonFab,
  IonFabButton,
} from '@ionic/vue';
import { create, search, cog, add } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonIcon,
    IonContent,
    IonLabel,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonFab,
    IonFabButton,
  },
  setup() {
    return {
      create,
      search,
      cog,
      add,
    };
  },
});
</script>

<style>
.fab {
  bottom: 4rem;
  right: 2rem;
}
</style>
