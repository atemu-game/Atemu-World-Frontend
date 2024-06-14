import { createSlice } from '@reduxjs/toolkit';

interface ICreatorState {
  point: number | null;
  status: 'start' | 'stop';
  balance: number | null;
  isLoading: boolean; // Loading mint or pint data
  eventLog: string[]; //
}
const initialState: ICreatorState = {
  point: null,
  isLoading: false,
  balance: null,
  status: 'stop',
  eventLog: [],
};
export const creatorSlice = createSlice({
  name: 'creatorAccount',
  initialState,
  reducers: {
    setPoint: (state, action) => {
      state.point = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setLoadingMint: (state, action) => {
      state.isLoading = action.payload;
    },
    setStatusMint: (state, action) => {
      state.status = action.payload;
    },
    setTransactionLog: (state, action) => {
      state.eventLog.push(action.payload);
    },
    resetCreator: state => {
      state.isLoading = false;
      state.point = null;
      state.balance = null;
    },
  },
});
export const {
  setPoint,
  setBalance,
  setLoadingMint,
  resetCreator,
  setStatusMint,
} = creatorSlice.actions;
