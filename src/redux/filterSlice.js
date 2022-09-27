import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',

  reducers: {
    search: (_, action) => action.payload,
  },
});

export const { search } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
