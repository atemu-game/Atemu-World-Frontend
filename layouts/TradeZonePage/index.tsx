'use client';
import { Box, Text, HStack, Button } from '@chakra-ui/react';
import React from 'react';
import SettingRpc from './SettingRpc';
import MonitorTrade from './MonitorTrade';

const TradeZonePage = () => {
  return (
    <Box>
      <Text variant="title">Explorer</Text>
      <HStack
        padding={4}
        mb={4}
        width="full"
        justifyContent="space-between"
        border="1px solid"
        borderColor="divider.100"
      >
        <Box>
          <Text fontWeight="bold" color="secondary.400">
            Running
          </Text>
          <Text>Status</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">
            654,456
          </Text>
          <Text>Current Block</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">
            1,654,456
          </Text>
          <Text>Current TX</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">
            0.002 ETH
          </Text>
          <Text>Wallet Balance</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">
            1.002 PTS
          </Text>
          <Text>Point Balance</Text>
        </Box>
        <Button variant="primary" borderColor="secondary.300" minW="200px">
          Stop
        </Button>
      </HStack>
      <HStack alignItems="flex-start" gap={4}>
        <SettingRpc />
        <MonitorTrade />
      </HStack>
    </Box>
  );
};

export default TradeZonePage;
