import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Dexie, { IndexableType } from 'dexie';
// import crypto from 'crypto-js';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

interface Note {
  id: string;
  title?: string;
  value: string;
}

export interface State {
  notes: Note[];
  db: Dexie;
  masterPassword: string;
  loggedIn: boolean;
  darkMode: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notes: [],
    masterPassword: '',
    loggedIn: false,
    db: new Dexie('notes_store'),
    darkMode: false,
  },
  actions: {
    createDB({ state }) {
      state.db.version(1).stores({
        user: 'password',
        notes: '&id, title, createdAt',
      });
    },

    insertInto({ state }, { value }) {
      return new Promise((resolve, reject) => {
        state.db
          .table('notes')
          .add({ ...value })
          .then((val: IndexableType) => resolve(val))
          .catch((err: Error) => reject(err));
      });
    },
    getOne({ state }, id: string) {
      return new Promise((resolve, reject) => {
        state.db
          .table('notes')
          .get({ id })
          .then((note: object) => resolve(note))
          .catch((err: Error) => reject(err));
      });
    },
    getAll({ state }, tableName: string) {
      return new Promise((resolve, reject) => {
        state.db
          .table(tableName)
          .toArray()
          .then((val: any[]) => resolve(val))
          .catch((err: Error) => reject(err));
      });
    },
    compare({ state }, masterPassword) {
      return new Promise((resolve) => {
        if (!state.masterPassword) {
          const salt = 8;
          const password = bcrypt.hashSync(masterPassword, salt);
          state.masterPassword = password;
          state.loggedIn = true;
          state.db
            .table('user')
            .put({ password })
            .then(() => resolve(true));
        } else {
          const isSame = bcrypt.compareSync(
            masterPassword,
            state.masterPassword,
          );
          if (isSame) state.loggedIn = true;
          resolve(isSame);
        }
      });
    },
    async checkForNotes({ state, dispatch }) {
      await dispatch('createDB');
      const user = (await dispatch('getAll', 'user'))[0];
      // for (let i = 0; i < 40; i++) {
      //   const value = {
      //     id: v4(),
      //     title: `Hello from ${i + 1} item`,
      //     value:
      //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quibusdam nulla deleniti vel quae modi.',
      //     createdAt: new Date(),
      //   };
      //   state.db.table('notes').add(value);
      // }
      if (!user) return;
      state.masterPassword = user.password;
      state.notes = await state.db
        .table('notes')
        .orderBy('createdAt')
        .reverse()
        .toArray();
    },
  },
  plugins: [createPersistedState()],
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
