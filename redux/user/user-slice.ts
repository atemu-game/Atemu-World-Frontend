import { formattedContractAddress } from '@/utils/formatAddress';
import { createSlice } from '@reduxjs/toolkit';

interface IUserInitialState {
  userAddress: string | null;
  isLoading: boolean;
  prevConnector: number | null; // Chain ID Number Order of ArgentX , Bravoos, ArgentMobile
}
const initialState: IUserInitialState = {
  userAddress: null,
  isLoading: false,
  prevConnector: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAdress: (state, action) => {
      const formatAddress = formattedContractAddress(action.payload);
      state.userAddress = formatAddress;
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
