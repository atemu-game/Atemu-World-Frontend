import { connectSocket, startMint } from '@/config/socketConfig';
import { Button } from '@chakra-ui/react';
import React from 'react';
// TODO Change Name if needed
const MintTransfer = () => {
  const handleStartMint = async () => {
    connectSocket();
    startMint();
  };
  return (
    <>
      <Button
        variant="primary"
        borderColor="secondary.300"
        minW="200px"
        onClick={async () => {
          await handleStartMint();
        }}
      >
        Start
      </Button>
    </>
  );
};

export default MintTransfer;
