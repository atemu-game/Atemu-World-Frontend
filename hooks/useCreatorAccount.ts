import { useDispatch } from 'react-redux';
import { useTypedSelector } from './useTypedSelector';
import {
  connectSocket,
  socketAPI,
  startMint,
  stopMint,
} from '@/config/socketConfig';
import {
  clearEventLog,
  resetCreator,
  setBalance,
  setLoadingMint,
  setPoint,
  setStatusMint,
  setTransactionLog,
} from '@/redux/creatorAccount/creator-slice';

import { BliztSatus, TXRType } from '@/utils/constants';

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
    await stopMint();
  };
  const handleSetPoint = (data: number) => {
    dispatch(setPoint(data));
  };
  const handleSetStatus = (status: BliztSatus) => {
    dispatch(setStatusMint(status));
  };
  const handleSetTransaction = (
    transactionHash: string,
    status: TXRType,
    timestamp: number
  ) => {
    dispatch(
      setTransactionLog({
        transactionHash: transactionHash,
        status: status,
        timestamp: timestamp,
      })
    );
  };

  const handleClearEventLog = () => {
    dispatch(clearEventLog());
  };
  const handleResetCreator = () => {
    dispatch(resetCreator());
  };

  const handleSetBalance = (balance: number) => {
    dispatch(setBalance(balance));
  };

  return {
    ...creatorAccount,
    handleStartMint,
    handleStopMint,
    handleSetPoint,
    handleSetStatus,
    handleSetTransaction,
    handleClearEventLog,
    handleResetCreator,
    handleSetBalance,
  };
};
