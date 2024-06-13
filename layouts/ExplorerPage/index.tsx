'use client';
import { Box, Text, HStack } from '@chakra-ui/react';
import React from 'react';
import SettingRpc from './SettingRpc';
import MonitorTrade from './MonitorTrade';
import { useAuth } from '@/hooks/useAuth';

import { useWalletAccount } from '@/hooks/useWalletAccount';
import DespositAccount from './DespositAccount';
import { useBalanceCustom } from '@/hooks/useBalanceCustom';
import { CONTRACT_ADDRESS } from '@/utils/constants';
// TODO MOVE NEW TYPE
export interface UserWalletProps {
  payerAddress: string;

  creatorAddress: string;

  feeType: string;

  feeDeploy: number;

  privateKey: string;

  deployHash?: string;
}
const ExplorerPage = () => {
  const { userAddress } = useAuth();
  const { userWallet } = useWalletAccount();
  const { balance, fetchBalance } = useBalanceCustom({
    address: userWallet ? userWallet.payerAddress : '',
    token: CONTRACT_ADDRESS.ETH,
  });
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
        flexWrap="wrap"
      >
        <Box>
          <Text fontWeight="bold" color="secondary.400">
            Stop
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
        {/* <Button variant="primary" borderColor="secondary.300" minW="200px">
          Stop
        </Button> */}
        {userWallet && (
          <DespositAccount
            userWallet={userWallet}
            refetchBalance={async () => {
              await fetchBalance();
            }}
          />
        )}
      </HStack>
      <HStack
        alignItems="flex-start"
        gap={4}
        flexWrap={{ xl: 'nowrap', base: 'wrap' }}
      >
        <SettingRpc />
        {userAddress && userWallet && (
          <MonitorTrade userWallet={userWallet} balance={balance} />
        )}
      </HStack>
    </Box>
  );
};

export default ExplorerPage;
