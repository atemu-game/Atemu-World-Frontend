import { createSlice } from '@reduxjs/toolkit';

import { IInitialState } from './user-interface';

const initialState: IInitialState = {
  userAddress: null,
  isLoading: false,
  prevConnector: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAdress: (state, action) => {
      state.userAddress = action.payload;
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setConnector: (state, action) => {
      state.prevConnector = action.payload;
    },
    logout: state => {
      state.userAddress = null;
      state.prevConnector = null;
      state.isLoading = false;
    },
  },
});
export const { setUserAdress, setUserLoading, setConnector, logout } =
  userSlice.actions;
