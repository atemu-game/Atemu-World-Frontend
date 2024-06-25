import { socketAPI } from '@/config/socketConfig';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';

import { BliztEvent } from '@/utils/constants';
import { Button, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const MintTransfer = () => {
  const {
    handleStartMint,
    handleStopMint,
    handleSetPoint,
    handleSetStatus,
    handleSetTransaction,
    status,
    isLoading,
  } = useCreatorAccount();
  const toast = useToast({
    position: 'top',
    duration: 5000,
    isClosable: true,
  });
  useEffect(() => {
    if (socketAPI) {
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
      socketAPI.on(BliztEvent.BLIZT_TRANSACTION, data => {
        handleSetTransaction(data.transactionHash, data.status, data.timestamp);
      });
      socketAPI.on('disconnect', () => {
        socketAPI.disconnect();
        handleSetStatus('stopped');
      });
    }
  }, [socketAPI]);

  return (
    <>
      {status === 'stopped' && (
        <Button
          key="start"
          variant="primary"
          borderColor="secondary.400"
          minW="200px"
          isLoading={isLoading}
          onClick={async () => {
            await handleStartMint();
          }}
        >
          Start
        </Button>
      )}
      {status == 'starting' && (
        <Button
          key="start"
          variant="primary"
          borderColor="secondary.400"
          minW="200px"
          isLoading={isLoading}
        >
          Starting.....
        </Button>
      )}
      {status == 'started' && (
        <Button
          variant="primary"
          borderColor="secondary.300"
          color="secondary.300"
          key="stop"
          minW="200px"
          isLoading={isLoading}
          onClick={async () => {
            handleSetStatus('stopping');
            setTimeout(async () => {
              await handleStopMint();
              handleSetStatus('stopped');
            }, 5000);
          }}
        >
          Stop
        </Button>
      )}
      {status == 'stopping' && (
        <Button
          variant="primary"
          borderColor="secondary.300"
          color="secondary.300"
          key="stop"
          minW="200px"
          isLoading={true}
        >
          Stopping....
        </Button>
      )}
    </>
  );
};

export default MintTransfer;
