<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1>{{ $route.name }}</h1>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

export default defineComponent({
  components: { IonPage, IonContent },
});
</script>
