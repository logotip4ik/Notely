import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Dexie, { IndexableType } from 'dexie';
import { AES } from 'crypto-js';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

export interface Note {
  id: string;
  title: string;
  value: string;
  starred: boolean;
  createdAt: Date;
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
    toggleDarkMode({ state }) {
      state.darkMode = !state.darkMode;
    },
    encryptNote({ state }, note: Note) {
      const base64TitleString = btoa(note.title);
      const base64ValueString = btoa(note.value);

      const hashedTitleString = AES.encrypt(
        base64TitleString,
        state.masterPassword,
      ).toString();
      const hashedValueString = AES.encrypt(
        base64ValueString,
        state.masterPassword,
      ).toString();

      return { ...note, title: hashedTitleString, value: hashedValueString };
    },
    decryptNote({ state }, hashedNote: Note) {
      const codeTitleString = AES.decrypt(
        hashedNote.title,
        state.masterPassword,
      ).toString();
      const codeValueString = AES.decrypt(
        hashedNote.value,
        state.masterPassword,
      ).toString();

      let base64TitleString = '';
      let base64ValueString = '';

      const length =
        codeTitleString.length > codeValueString.length
          ? codeTitleString.length
          : codeValueString.length;

      for (let i = 0; i < length; i += 2) {
        if (codeTitleString[i]) {
          base64TitleString += String.fromCharCode(
            parseInt(codeTitleString.substr(i, 2), 16),
          );
        }
        if (codeValueString[i]) {
          base64ValueString += String.fromCharCode(
            parseInt(codeValueString.substr(i, 2), 16),
          );
        }
      }

      return {
        ...hashedNote,
        title: atob(base64TitleString),
        value: atob(base64ValueString),
      };
    },
    async decryptAllNotes({ state, dispatch }) {
      const hashedNotes = await state.db
        .table('notes')
        .orderBy('createdAt')
        .reverse()
        .toArray();

      const arrayToAwait: Promise<Note>[] = [];
      hashedNotes.forEach((note) =>
        arrayToAwait.push(dispatch('decryptNote', note)),
      );

      Promise.all(arrayToAwait).then((notes) => {
        state.notes = notes;
      });
    },
    createDB({ state }) {
      state.db.version(2).stores({
        user: 'password',
        notes: '&id, title, starred, createdAt',
      });
    },
    createNote({ state, dispatch }, note: Note) {
      return new Promise((resolve, reject) => {
        state.notes.unshift(note);
        dispatch('encryptNote', note).then((secureNote: Note) => {
          dispatch('insertInto', secureNote)
            .then(resolve)
            .catch(reject);
        });
      });
    },
    async editNote({ state, dispatch }, note: Note) {
      state.db.table('notes').put(await dispatch('encryptNote', note));
      const { notes } = state;
      for (let i = 0; i < notes.length; i++) {
        if (note.id === notes[i].id) {
          notes[i] = note;
          break;
        }
      }
    },
    deleteNote({ state }, id) {
      state.db
        .table('notes')
        .where({ id })
        .delete();
      const { notes } = state;
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.id === id) {
          state.notes.splice(i, 1);
          break;
        }
      }
    },
    insertInto({ state }, value) {
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
          state.masterPassword = masterPassword;
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
          if (isSame) {
            state.masterPassword = masterPassword;
            state.loggedIn = true;
          }
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
      //   const secureNote = await dispatch('encryptNote', value);
      //   console.log(await dispatch('decryptNote', secureNote));
      //   state.db.table('notes').add(secureNote);
      // }
      if (!user) return;
      state.masterPassword = user.password;
    },
  },
  plugins: [createPersistedState()],
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
