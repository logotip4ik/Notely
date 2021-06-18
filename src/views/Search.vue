<template>
  <ion-page>
    <ion-content class="ion-padding-top">
      <ion-header>
        <ion-toolbar>
          <ion-title>
            <h1>{{ $route.name }}</h1>
          </ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';

export default defineComponent({
  components: { IonPage, IonContent, IonHeader, IonToolbar, IonTitle },
});
</script>
