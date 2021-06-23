<template>
  <ion-page>
    <ion-header
      class="ion-padding-left ion-padding-rigth position-sticky"
      translucent
    >
      <ion-toolbar>
        <ion-searchbar v-model="q" animated></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding-top" fullscreen>
      <ion-list>
        <NoteListItem
          v-for="note in notes"
          :key="note.id"
          :note="note"
        ></NoteListItem>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import jslinq from 'jslinq';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  // IonTitle,
  IonList,
  IonSearchbar,
} from '@ionic/vue';

import NoteListItem from '@/components/NoteListItem.vue';

export default defineComponent({
  setup() {
    const store = useStore();

    const q = ref('');
    const notes = computed(() => {
      return jslinq(store.state.notes)
        .orderBy((note) => !note.starred)
        .where(
          (note) =>
            note.title.includes(q.value) || note.value.includes(q.value),
        ).items;
    });

    return { notes, q };
  },
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonList,
    IonSearchbar,
    NoteListItem,
  },
});
</script>
