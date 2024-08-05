import { useDispatch } from 'react-redux';
import { useTypedSelector } from './useTypedSelector';
import {
  connectSocketBlitz,
  socketBlitzApi,
  startMint,
  stopMint,
} from '@/config/socketBlitzConfig';
import {
  clearEventLog,
  resetCreator,
  setBalance,
  setCurrentRPC,
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
    dispatch(setLoadingMint(true));
    await startMint(creatorAccount.currentRPC);
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

  const handleChangeRPC = (rpc: string) => {
    dispatch(setCurrentRPC(rpc));
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
    handleChangeRPC,
  };
};
