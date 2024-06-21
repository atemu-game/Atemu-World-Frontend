import { BliztSatus, TXRType } from '@/utils/constants';
import { createSlice } from '@reduxjs/toolkit';

interface TransactionLogProps {
  transactionHash: string;
  status: TXRType;
  timestamp: number;
}
interface ICreatorState {
  point: number | null;
  status: BliztSatus;
  balance: number | null;
  isLoading: boolean; // Loading mint or pint data
  eventLog: TransactionLogProps[]; //
}

const initialState: ICreatorState = {
  point: null,
  isLoading: false,
  balance: null,
  status: 'stopped',
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
    clearEventLog: state => {
      state.eventLog = [];
    },
    resetCreator: state => {
      state.isLoading = false;
      state.point = null;
      state.balance = null;
      state.status = 'stopped';
      state.eventLog = [];
    },
  },
});
export const {
  setPoint,
  setBalance,
  setLoadingMint,
  resetCreator,
  setStatusMint,
  setTransactionLog,
  clearEventLog,
} = creatorSlice.actions;
