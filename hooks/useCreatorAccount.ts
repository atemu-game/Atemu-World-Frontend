import { useDispatch } from 'react-redux';
import { useTypedSelector } from './useTypedSelector';
import {
  connectSocket,
  socketAPI,
  startMint,
  stopMint,
} from '@/config/socketConfig';
import {
  setLoadingMint,
  setPoint,
  setStatusMint,
} from '@/redux/creatorAccount/creator-slice';

import { BliztEvent, BliztSatus } from '@/utils/constants';

export const useCreatorAccount = () => {
  const creatorAccount = useTypedSelector(state => state.creatorAccount);
  const dispatch = useDispatch();
  const handleStartMint = async () => {
    if (!socketAPI) {
      connectSocket();
    }
    dispatch(setLoadingMint(true));
    await startMint();
    dispatch(setLoadingMint(false));
  };
  const handleStopMint = async () => {
    dispatch(setLoadingMint(true));
    await stopMint();
    dispatch(setLoadingMint(false));
  };
  const handleSetPoint = (data: number) => {
    dispatch(setPoint(data));
  };
  const handleSetStatus = (status: BliztSatus) => {
    dispatch(setStatusMint(status));
  };
  return {
    ...creatorAccount,
    handleStartMint,
    handleStopMint,
    handleSetPoint,
    handleSetStatus,
  };
};
