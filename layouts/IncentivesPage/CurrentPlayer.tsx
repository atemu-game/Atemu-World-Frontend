import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const CurrentPlayer = () => {
  const MockData = [
    {
      address:
        '0x062823bA9dd9953f97FF04F820631e4a17ef295AECbb86c8b324011f6Cc3A21a',
      totalPoint: 20000,
    },
  ];
  return (
    <Box>
      <Text variant="title">5 players</Text>
    </Box>
  );
};

export default CurrentPlayer;
