import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from '.';
import Card from '../Card';

const RequireConnectWallet = () => {
  return (
    <Card>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        height="100vh"
        width="full"
        // bgColor="primary.200"
        backgroundImage={`url('./assets/arts/bg/bg_require_connect.svg')`}
        backgroundPosition="center"
        justifyContent="center"
        alignItems="center"
        bgRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Text variant="title" textAlign="center">
          Please connect your wallet to continue
        </Text>
        <ConnectWallet
          sx={{
            borderColor: 'secondary.100',
            width: '300px',
          }}
        />
      </Box>
    </Card>
  );
};

export default RequireConnectWallet;
