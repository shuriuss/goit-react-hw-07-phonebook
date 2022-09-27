import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const contactsinitialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsinitialState,
  extraReducers: {
    //Запрос контактов с сервера
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //Добавление контакта
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts.unshift(action.payload);
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //Удаление контакта

    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      // const index = state.contacts.findIndex(
      // contact => contact.id === action.payload
      // );
      // state.contacts.splice(index, 1);
      state.contacts= state.contacts.filter(contact => contact.id !== action.payload.id)
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

  // reducers: {
  //   //Добавление контакта
  //   addContact: {
  //     reducer(state, action) {
  //       state.push(action.payload);
  //     },
  //     prepare(name, number) {
  //       return {
  //         payload: {
  //           id: Date.now(),
  //           name,
  //           number,
  //         },
  //       };
  //     },
  //   },

  //   //Удаление контакта
  //   deleteContact(state, action) {
  //     const index = state.findIndex(contact => contact.id === action.payload);
  //     state.splice(index, 1);
  //   },
  // },
});

// export const {

//   deleteContact,
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,

// } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
