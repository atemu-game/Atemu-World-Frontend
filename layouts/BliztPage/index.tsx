'use client';
import {
  Box,
  Text,
  HStack,
  VStack,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SettingRpc from './SettingRpc';
import MonitorTrade from './MonitorTrade';
import { useAuth } from '@/hooks/useAuth';

import { useWalletAccount } from '@/hooks/useWalletAccount';
import DespositAccount from './DespositAccount';

import MintTransfer from './MintTransfer';
import RequireConnectWallet from '@/components/ConnectWallet/RequireConnectWallet';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
import { useBlock } from '@starknet-react/core';
import { BlockNumber } from 'starknet';
import { useBalanceCustom } from '@/hooks/useBalanceCustom';
import { BliztEvent, CONTRACT_ADDRESS } from '@/utils/constants';
import { socketAPI } from '@/config/socketConfig';
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
  const {
    point,
    balance,
    handleSetBalance,
    handleSetTransaction,
    handleSetStatus,
    handleSetPoint,
  } = useCreatorAccount();

  const { status } = useCreatorAccount();

  const { data: dataBlock, isLoading: isLoadingBlock } = useBlock({
    refetchInterval: 10_000,
    blockIdentifier: 'latest' as BlockNumber,
  });
  const toast = useToast({ position: 'top', duration: 5000, isClosable: true });
  const {
    balance: balancePayer,
    isLoading: isLoadingBalance,
    fetchBalance,
  } = useBalanceCustom({
    address: userWallet ? userWallet.payerAddress : '',
    token: CONTRACT_ADDRESS.ETH,
  });
  useEffect(() => {
    if (!isLoadingBalance) {
      handleSetBalance(Number(balancePayer));
    }
  }, [isLoadingBalance]);
  useEffect(() => {
    if (socketAPI) {
      try {
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
        socketAPI.on(BliztEvent.BLIZT_BALANCE, data => {
          handleSetBalance(data);
        });
        socketAPI.on(BliztEvent.BLIZT_TRANSACTION, data => {
          handleSetTransaction(
            data.transactionHash,
            data.status,
            data.timestamp
          );
        });
        socketAPI.on('disconnect', () => {
          socketAPI.disconnect();
          handleSetStatus('stopped');
        });
      } catch (error) {
        console.log('Error in Blizt', error);
      }
    }
  }, [socketAPI]);
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
              {!isLoadingBlock && dataBlock ? (
                <Text fontWeight="bold" color="white">
                  {(dataBlock as any).block_number}
                </Text>
              ) : (
                <Skeleton>999999</Skeleton>
              )}

              <Text>Current Block</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" color="white">
                1,654,456
              </Text>
              <Text>Current TX</Text>
            </Box>
            <Box>
              {isLoadingBalance}
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
              <MonitorTrade
                userWallet={userWallet}
                refetchBalance={async () => await fetchBalance()}
              />
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
