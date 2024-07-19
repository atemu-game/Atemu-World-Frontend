import { createSlice } from '@reduxjs/toolkit';

interface CurrentPoolProps {
  id: number;
  address: string;
  startAt: number;
  endAt: number;
  isClaimed?: boolean;

  winner?: any;
  isCanceled?: boolean;
}

interface IFuelState {
  totalOnline: number;
  totalPoint: number;
  curentPool?: CurrentPoolProps;
  currentUserJoined: any[];
}

const initialState: IFuelState = {
  totalOnline: 0,
  totalPoint: 0,
  curentPool: undefined,
  currentUserJoined: [],
};
export const fuelSlice = createSlice({
  name: 'fuel',
  initialState,
  reducers: {
    setTotalPoint: (state, action) => {
      state.totalPoint = action.payload;
    },
    setTotalOnline: (state, action) => {
      state.totalOnline = action.payload;
    },
    setCurrentPool: (state, action) => {
      state.curentPool = action.payload;
    },
  },
});
export const { setCurrentPool, setTotalOnline, setTotalPoint } =
  fuelSlice.actions;
