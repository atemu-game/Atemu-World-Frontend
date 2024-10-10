// src/store/socketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  totalOnline: number | null;
  winner: any | null;
  currentPool: any | null;
  listPlayer: any[] | null;
  totalPoint: number | null;
  isLoadingPool: boolean;
}

const initialState: SocketState = {
  totalOnline: null,
  winner: null,
  currentPool: null,
  listPlayer: null,
  totalPoint: null,
  isLoadingPool: true,
};

export const socketFuelSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setTotalOnline: (state, action: PayloadAction<number>) => {
      state.totalOnline = action.payload;
    },
    setWinner: (state, action: PayloadAction<any>) => {
      state.winner = action.payload;
    },
    setCurrentPool: (state, action: PayloadAction<any>) => {
      state.currentPool = action.payload;
      state.isLoadingPool = false;
    },
    setListPlayer: (state, action: PayloadAction<any[]>) => {
      state.listPlayer = action.payload;
    },
    setTotalPoint: (state, action: PayloadAction<number>) => {
      state.totalPoint = action.payload;
    },
    resetSocketState: () => initialState,
  },
});

export const {
  setTotalOnline,
  setWinner,
  setCurrentPool,
  setListPlayer,
  setTotalPoint,
  resetSocketState,
} = socketFuelSlice.actions;
