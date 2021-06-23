<template>
  <ion-page>
    <ion-content>
      <div :class="{ center: true, 'ion-hide': notesLength !== 0 }" ref="text">
        <h1>
          Oops, you haven't got any notes, create some, by clicking "&plus;"
          button
        </h1>
      </div>
      <ion-list
        v-for="(noteDate, noteDateKey) in notesDates"
        :key="noteDateKey"
      >
        <ion-item-divider class="position-sticky">
          <ion-list-header class="ion-padding-top ion-padding-bottom">
            <h1>{{ noteDate }}</h1>
          </ion-list-header>
        </ion-item-divider>
        <NoteListItem
          v-for="(note, noteIdx) in notes[noteDate]"
          :key="note.id"
          :class="{
            'ion-margin-bottom': true,
            'ion-margin-top': noteIdx === 0,
          }"
          :note="note"
        >
        </NoteListItem>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from '../store';
import {
  IonPage,
  IonContent,
  IonList,
  IonItemDivider,
  IonListHeader,
  createAnimation,
} from '@ionic/vue';
import NoteListItem from '@/components/NoteListItem.vue';

export default defineComponent({
  setup() {
    const text = ref(null);

    const store = useStore();

    const notesLength = computed(() => store.state.notes.length);
    const notesDates = computed(() => {
      const dates = new Set();
      store.state.notes.forEach((note) => {
        const date = new Intl.DateTimeFormat('ua', {
          day: '2-digit',
          month: 'long',
        }).format(note.createdAt);
        dates.add(date);
      });
      return Array.from(dates);
    });
    const notes = computed(() => {
      const final = {};
      const n = store.state.notes;
      for (let i = 0; i < n.length; i += 1) {
        const date = new Intl.DateTimeFormat('ua', {
          day: '2-digit',
          month: 'long',
        }).format(n[i].createdAt);
        if (typeof final[date] === 'object') {
          final[date].push(n[i]);
        } else {
          final[date] = [n[i]];
        }
      }
      return final;
    });

    watch(notesLength, (val) => {
      if (val === 0) {
        createAnimation()
          .addElement(text.value)
          .duration(500)
          .fromTo('opacity', '0', '1')
          .play();
      }
    });

    return {
      text,
      notes,
      notesDates,
      notesLength,
    };
  },
  components: {
    IonPage,
    IonContent,
    IonList,
    IonItemDivider,
    IonListHeader,
    NoteListItem,
  },
});
</script>

<style>
.ripple-parent {
  position: relative;
  overflow: hidden;
}
.position-sticky {
  position: sticky;
  top: -0.5rem;
}
.font-weight-400 {
  font-weight: 400;
}
.icon-large {
  font-size: 28px;
}
.badge-floating {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
