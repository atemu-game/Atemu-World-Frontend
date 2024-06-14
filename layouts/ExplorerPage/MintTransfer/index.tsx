import { socketAPI } from '@/config/socketConfig';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';

import { BliztEvent } from '@/utils/constants';
import { Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const MintTransfer = () => {
  const {
    handleStartMint,
    handleStopMint,
    handleSetPoint,
    handleSetStatus,
    status,
  } = useCreatorAccount();
  useEffect(() => {
    if (socketAPI) {
      socketAPI.on(BliztEvent.BLIZT_POINT, data => {
        handleSetPoint(data);
      });
      socketAPI.on(BliztEvent.BLIZT_STATUS, data => {
        handleSetStatus(data);
      });
    }
  }, [socketAPI]);

  return (
    <Box>
      {status == 'stop' && (
        <Button
          key="start"
          variant="primary"
          borderColor="secondary.300"
          minW="200px"
          onClick={async () => {
            await handleStartMint();
          }}
        >
          Start
        </Button>
      )}
      {status == 'start' && (
        <Button
          variant="primary"
          borderColor="secondary.100"
          key="stop"
          onClick={async () => {
            await handleStopMint();
          }}
        >
          Stop
        </Button>
      )}
    </Box>
  );
};

export default MintTransfer;
