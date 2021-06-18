<template>
  <ion-page>
    <ion-content class="ion-padding-top">
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
        <ion-item-sliding
          v-for="(note, noteIdx) in notes[noteDate]"
          :key="note.id"
          :ref="(el) => (el ? (items[note.id] = el) : null)"
          :class="{
            'ion-margin-bottom': true,
            'ion-margin-top': noteIdx === 0,
          }"
        >
          <ion-item
            class="ion-activatable ripple-parent"
            @click="$router.push({ name: 'Note', params: { id: note.id } })"
          >
            <h3 class="ion-text-wrap font-weight-400">{{ note.title }}</h3>
            <ion-note slot="end">
              {{ formatDate(note.createdAt) }}
            </ion-note>
          </ion-item>
          <ion-item-options side="start">
            <ion-item-option color="danger" @click="deleteNote(note.id)">
              <ion-icon :icon="trash" class="icon-large"></ion-icon>
            </ion-item-option>
          </ion-item-options>
          <ion-item-options side="end">
            <ion-item-option color="warning" @click="toggleStar(note.id)">
              <ion-icon :icon="starOutline" class="icon-large"></ion-icon>
            </ion-item-option>
          </ion-item-options>
          <ion-ripple-effect></ion-ripple-effect>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, defineComponent, ref, onBeforeUpdate, watch } from 'vue';
import { useStore } from '../store';
import {
  IonPage,
  IonContent,
  IonList,
  IonItemDivider,
  IonListHeader,
  IonItemSliding,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonNote,
  IonRippleEffect,
  IonIcon,
  createAnimation,
} from '@ionic/vue';
import { trash, starOutline } from 'ionicons/icons';

export default defineComponent({
  setup() {
    const text = ref(null);
    const items = ref([]);

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

    function formatDate(date) {
      return new Intl.DateTimeFormat('ua', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
    }
    function deleteNote(id) {
      createAnimation()
        .addElement(items.value[id].$el)
        .duration(250)
        .easing('ease-out')
        .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
        .play()
        .then(() => store.dispatch('deleteNote', id));
    }
    function toggleStar(id) {
      console.log('TOGGLING STAR ON - ', id);
      // TODO: implement this functions
    }

    onBeforeUpdate(() => {
      items.value = [];
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
      items,
      text,
      notes,
      formatDate,
      notesDates,
      notesLength,
      trash,
      starOutline,
      deleteNote,
      toggleStar,
    };
  },
  components: {
    IonPage,
    IonContent,
    IonList,
    IonItemDivider,
    IonListHeader,
    IonItemSliding,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonNote,
    IonRippleEffect,
    IonIcon,
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
</style>
