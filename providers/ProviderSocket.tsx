'use client';
import { connectSocketBlitz, socketBlitzApi } from '@/config/socketBlitzConfig';
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
    if (socketBlitzApi && socketBlitzApi.active) {
      try {
        socketBlitzApi.on(BliztEvent.BLIZT_POINT, data => {
          handleSetPoint(data);
        });
        socketBlitzApi.on(BliztEvent.BLIZT_STATUS, data => {
          handleSetStatus(data);
          if (data === 'balance_low') {
            toast({
              title: 'Balance low',
              description: 'Please deposit more ETH to continue',
              status: 'info',
            });
          }
        });
        socketBlitzApi.on(BliztEvent.BLIZT_BALANCE, data => {
          handleSetBalance(data);
        });
        socketBlitzApi.on(BliztEvent.BLIZT_TRANSACTION, data => {
          handleSetTransaction(
            data.transactionHash,
            data.status,
            data.timestamp
          );
        });
        socketBlitzApi.on('disconnect', () => {
          socketBlitzApi.disconnect();
          handleSetStatus('stopped');
        });
        socketBlitzApi.on('error', message => {
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
  }, [socketBlitzApi]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProviderSocket;
