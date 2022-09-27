// import axios from 'axios';
// import { fetchingError, fetchingInProgress, fetchingSuccess } from './contactSlice';

// axios.defaults.baseURL =
//   'https://6330803a591935f3c890f207.mockapi.io/contacts';
// export const fetchContacts = () => async dispatch => {
//   try {
//     //Индикатор загрузки
//     dispatch(fetchingInProgress());
//     //HTTPS - запрос
//     const response = await axios.get('/contacts');
//     //Обработка даннsх
//     dispatch(fetchingSuccess(response.data));
//   } catch (e) {
//     //Обработка ошибки
//     dispatch(fetchingError(e.message));
//   }
// };

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://6330803a591935f3c890f207.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addContact = createAsyncThunk(
    "contact/addContact",
    async ({name, phone}, thunkAPI) => {
        console.log(name, phone);
      try {
        const response = await axios.post("/contacts", { name, phone });
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );


  export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (ContactId, thunkAPI) => {
        console.log(ContactId);
      try {
        const response = await axios.delete(`/contacts/${ContactId}`);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );
