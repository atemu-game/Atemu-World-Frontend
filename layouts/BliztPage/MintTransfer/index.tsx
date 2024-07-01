import { disconnectSocket, socketAPI } from '@/config/socketConfig';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';

import { Button, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const MintTransfer = () => {
  const {
    handleStartMint,
    handleStopMint,

    handleSetStatus,

    status,
    isLoading,
  } = useCreatorAccount();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        'Are you sure you want to leave? Your changes will close your connection';
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      handleSetStatus('stopped');
      if (socketAPI) {
        disconnectSocket();
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
            handleSetStatus('starting');
            await handleStartMint();
          }}
        >
          Start
        </Button>
      )}
      {status == 'starting' && (
        <HStack
          key="start"
          py={2}
          px={4}
          border="1px solid"
          borderColor="secondary.400"
          minW="200px"
          cursor="not-allowed"
        >
          <Spinner color="secondary.400" />
          <Text>Starting.....</Text>
        </HStack>
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
