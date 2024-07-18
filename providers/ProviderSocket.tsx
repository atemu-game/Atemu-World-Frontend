'use client';
import { socketAPI } from '@/config/socketConfig';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
import { BliztEvent } from '@/utils/constants';
import { useToast } from '@chakra-ui/react';
import React, { PropsWithChildren, useEffect } from 'react';

const ProviderSocket = ({ children }: PropsWithChildren) => {
  const toast = useToast({
    position: 'top-right',
    duration: 5000,
    isClosable: true,
  });
  const {
    handleSetBalance,
    handleSetTransaction,
    handleSetStatus,
    handleSetPoint,
  } = useCreatorAccount();
  useEffect(() => {
    if (socketAPI && socketAPI.active) {
      try {
        socketAPI.on(BliztEvent.BLIZT_POINT, data => {
          handleSetPoint(data);
        });
        socketAPI.on(BliztEvent.BLIZT_STATUS, data => {
          handleSetStatus(data);
          if (data === 'balance_low') {
            toast({
              title: 'Balance low',
              description: 'Please deposit more ETH to continue',
              status: 'info',
            });
          }
        });
        socketAPI.on(BliztEvent.BLIZT_BALANCE, data => {
          handleSetBalance(data);
        });
        socketAPI.on(BliztEvent.BLIZT_TRANSACTION, data => {
          handleSetTransaction(
            data.transactionHash,
            data.status,
            data.timestamp
          );
        });
        socketAPI.on('disconnect', () => {
          socketAPI.disconnect();
          handleSetStatus('stopped');
        });
        socketAPI.on('error', message => {
          handleSetStatus('stopped');
          toast({
            title: 'Error',
            description: message,
            status: 'error',
          });
        });
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
        });
      }
    }
  }, [socketAPI]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProviderSocket;
