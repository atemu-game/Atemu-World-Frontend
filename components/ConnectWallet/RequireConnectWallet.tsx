import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from '.';

const RequireConnectWallet = () => {
  return (
    <VStack height="100%" margin="auto">
      <Text variant="title">Please connect your wallet to continue</Text>
      <ConnectWallet
        sx={{
          borderColor: 'secondary.100',
          width: '300px',
        }}
      />
    </VStack>
  );
};

export default RequireConnectWallet;
