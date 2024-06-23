'use client';
import { Box, Text, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import SettingRpc from './SettingRpc';
import MonitorTrade from './MonitorTrade';
import { useAuth } from '@/hooks/useAuth';

import { useWalletAccount } from '@/hooks/useWalletAccount';
import DespositAccount from './DespositAccount';
import { useBalanceCustom } from '@/hooks/useBalanceCustom';
import { CONTRACT_ADDRESS } from '@/utils/constants';
import MintTransfer from './MintTransfer';
import RequireConnectWallet from '@/components/ConnectWallet/RequireConnectWallet';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
// TODO MOVE NEW TYPE
export interface UserWalletProps {
  payerAddress: string;

  creatorAddress: string;

  feeType: string;

  feeDeploy: number;

  privateKey: string;

  deployHash?: string;
}
const BliztPage = () => {
  const { userAddress } = useAuth();
  const { userWallet, refetchWallet } = useWalletAccount();
  const { point } = useCreatorAccount();
  const { balance, fetchBalance } = useBalanceCustom({
    address: userWallet ? userWallet.payerAddress : '',
    token: CONTRACT_ADDRESS.ETH,
  });
  // TODO: MOVE TO HOOK USE STATUS
  const { status } = useCreatorAccount();
  console.log('Now Current', userWallet);
  return (
    <>
      {userAddress ? (
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
              <Text
                fontWeight="bold"
                color="secondary.400"
                textTransform="capitalize"
              >
                {status}
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
                {Number(balance).toFixed(3)} ETH
              </Text>
              <Text>Wallet Balance</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color="white">
                {point}
              </Text>
              <Text>Point Balance</Text>
            </Box>

            <HStack gap={3} flexWrap="wrap">
              {userWallet && (
                <>
                  {userWallet.deployHash && <MintTransfer />}
                  <DespositAccount
                    refetchWallet={refetchWallet}
                    userWallet={userWallet}
                    refetchBalance={async () => {
                      await fetchBalance();
                    }}
                  />
                </>
              )}
            </HStack>
          </HStack>
          <HStack
            alignItems="flex-start"
            gap={4}
            flexWrap={{ xl: 'nowrap', base: 'wrap' }}
          >
            <SettingRpc />
            {userWallet && (
              <MonitorTrade userWallet={userWallet} balance={balance} />
            )}
          </HStack>
        </Box>
      ) : (
        <VStack margin="auto" height="full" justifyContent="center">
          <Box>
            <RequireConnectWallet />
          </Box>
        </VStack>
      )}
    </>
  );
};

export default BliztPage;
