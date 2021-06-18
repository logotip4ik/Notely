<template>
  <ion-item-sliding ref="item">
    <ion-item
      class="ion-activatable ripple-parent"
      @click="() => $router.push({ name: 'Note', params: { id: note.id } })"
    >
      <ion-badge
        v-if="note.starred"
        mode="ios"
        color="warning"
        class="badge-floating"
        >&nbsp;
      </ion-badge>
      <h3 class="ion-text-wrap font-weight-400">{{ note.title }}</h3>
      <ion-note slot="end">
        {{ formatDate(note.createdAt) }}
      </ion-note>
    </ion-item>
    <ion-item-options side="start">
      <ion-item-option
        color="danger"
        slot="icon-only"
        @click="deleteNote(note.id)"
      >
        <ion-icon :icon="trash" class="icon-large"></ion-icon>
      </ion-item-option>
    </ion-item-options>
    <ion-item-options side="end">
      <ion-item-option
        color="warning"
        slot="icon-only"
        @click="toggleStar(note)"
      >
        <ion-icon
          :icon="note.starred ? star : starOutline"
          class="icon-large"
        ></ion-icon>
      </ion-item-option>
    </ion-item-options>
    <ion-ripple-effect></ion-ripple-effect>
  </ion-item-sliding>
</template>

<script>
import { onBeforeUpdate, ref } from 'vue';
import { trash, starOutline, star } from 'ionicons/icons';
import { useStore } from '@/store';
import {
  createAnimation,
  IonItemSliding,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonNote,
  IonRippleEffect,
  IonBadge,
  IonIcon,
} from '@ionic/vue';

export default {
  setup() {
    const item = ref(null);

    const store = useStore();

    function formatDate(date) {
      return new Intl.DateTimeFormat('ua', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
    }
    function deleteNote(id) {
      createAnimation()
        .addElement(item.value.$el)
        .duration(250)
        .easing('ease-out')
        .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
        .play()
        .then(() => store.dispatch('deleteNote', id));
    }
    function toggleStar(note) {
      store.dispatch('editNote', { ...note, starred: !note.starred });
    }

    onBeforeUpdate(() => {
      item.value = null;
    });

    return {
      item,
      trash,
      starOutline,
      star,
      formatDate,
      deleteNote,
      toggleStar,
    };
  },
  props: { note: { type: Object, required: true, default: () => ({}) } },
  components: {
    IonItemSliding,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonNote,
    IonRippleEffect,
    IonBadge,
    IonIcon,
  },
};
</script>

<style></style>
