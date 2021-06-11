<template>
  <ion-page>
    <ion-content class="">
      <ion-grid>
        <ion-row v-for="(row, rowIdx) in notes" :key="rowIdx">
          <ion-col v-for="note in row" :key="note.rowIdx">
            <ion-card class="ion-padding-top ion-padding-bottom">
              <ion-card-header>
                <ion-card-title>{{ note.title }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from '../store';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/vue';

export default defineComponent({
  setup() {
    const store = useStore();
    const notes = computed(() => {
      const final = [];
      let sec = [];
      let idx = 1;
      store.state.notes.forEach((val) => {
        if (idx === 2) {
          sec.push(val);
          final.push(sec);
          idx = 1;
          sec = [];
          return;
        }
        sec.push(val);
        idx++;
      });
      return final;
    });

    return { notes };
  },
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardTitle,
    IonCardHeader,
  },
});
</script>
