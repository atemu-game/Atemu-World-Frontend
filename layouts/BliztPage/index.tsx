'use client';
import { Box, Text, HStack, VStack, Skeleton } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SettingRpc from './SettingRpc';
import MonitorTrade from './MonitorTrade';
import { useAuth } from '@/hooks/useAuth';

import MintTransfer from './MintTransfer';
import RequireConnectWallet from '@/components/ConnectWallet/RequireConnectWallet';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
import { useBlock } from '@starknet-react/core';
import { BlockNumber, num } from 'starknet';

import { useQuery } from 'react-query';
import { axiosHandler } from '@/config/axiosConfig';
import Card from '@/components/Card';
import { colors } from '@/themes';
import { convertHex } from '@/utils/convertHex';
import { formatBalance } from '@/utils/formatAddress';
import { connectSocketBlitz, socketBlitzApi } from '@/config/socketBlitzConfig';

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
  const { point, balance, handleSetBalance } = useCreatorAccount();

  const {
    data: userWallet,
    isLoading: isLoadingWallet,
    refetch: refetchWallet,
  } = useQuery({
    queryKey: 'wallet',
    queryFn: async () => {
      if (!userAddress) return;
      const { data } = await axiosHandler.get('/wallet/getOrCreateWallet');
      return data.data;
    },
  });
  const {
    data: dataBalancePayer,
    isLoading: isLoadingBalancePayer,
    refetch: refetchBalancePayer,
  } = useQuery({
    queryKey: 'balancePayer',
    queryFn: async () => {
      if (!userAddress) return;
      const { data } = await axiosHandler.get('/wallet/getBalancePayer');
      handleSetBalance(data.data.balanceEth);
      return data.data;
    },
  });

  const { status } = useCreatorAccount();

  const { data: dataBlock, isLoading: isLoadingBlock } = useBlock({
    refetchInterval: 10_000,
    blockIdentifier: 'latest' as BlockNumber,
  });

  useEffect(() => {
    const handleChangeWallet = async () => {
      if (userAddress) {
        if (!socketBlitzApi || !socketBlitzApi.active) {
          await connectSocketBlitz();
        }

        await refetchWallet();
        await refetchBalancePayer();
      }
    };
    handleChangeWallet();
  }, [userAddress]);

  return (
    <>
      <Text variant="title" mb={6}>
        Blitz
      </Text>
      {userAddress ? (
        <Box>
          <Card
            variant="shadow"
            textAlign="center"
            py={10}
            style={{
              boxShadow:
                status == 'started'
                  ? colors.boxShadow[200]
                  : colors.boxShadow[300],
              backgroundColor:
                status == 'started'
                  ? convertHex(colors.secondary[400], 0.075)
                  : convertHex(colors.secondary[300], 0.075),
              border:
                status == 'started'
                  ? colors.boxShadow[200]
                  : '2px solid #FF505026',
            }}
          >
            <Text color="#FFFFFFBF" fontSize="36px" fontWeight={600}>
              Your Points
            </Text>
            {point == undefined ? (
              <Skeleton>
                <Text
                  lineHeight="normal"
                  fontWeight="900"
                  fontSize="124px"
                  color={
                    status == 'started' ? 'secondary.400' : 'secondary.300'
                  }
                >
                  Loading Point
                </Text>
              </Skeleton>
            ) : (
              <Text
                lineHeight="normal"
                fontWeight="900"
                fontSize="124px"
                color={status == 'started' ? 'secondary.400' : 'secondary.300'}
              >
                {point}
              </Text>
            )}
          </Card>

          <HStack
            alignItems="flex-start"
            gap={2}
            mt={4}
            overflowX="hidden"
            flexWrap={{ lg: 'nowrap', base: 'wrap' }}
          >
            <SettingRpc />

            <Box width="full">
              <Card
                padding={4}
                mb={4}
                width="full"
                justifyContent="space-between"
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                gap={4}
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
                    <Text fontWeight="bold" color="primary.100">
                      {(dataBlock as any).block_number}
                    </Text>
                  ) : (
                    <Skeleton>999999</Skeleton>
                  )}

                  <Text>Current Block</Text>
                </Box>
                <Box>
                  {!isLoadingBlock && dataBlock ? (
                    <Text fontWeight="bold" color="primary.100">
                      {formatBalance(
                        num.getDecimalString(
                          (dataBlock as any).l1_gas_price.price_in_fri
                        ) as any,
                        18
                      )}
                    </Text>
                  ) : (
                    <Skeleton>999999</Skeleton>
                  )}

                  <Text>Estimate Gas</Text>
                </Box>

                <Box>
                  {!isLoadingWallet && userWallet ? (
                    <>{userWallet.deployHash && <MintTransfer />}</>
                  ) : (
                    <Skeleton>Loading Content Information Wallet</Skeleton>
                  )}
                </Box>
              </Card>
              <MonitorTrade
                balance={balance}
                isLoadingBalance={isLoadingBalancePayer}
                userWallet={userWallet}
                refetchWallet={async () => await refetchWallet()}
                refetchBalance={async () => await refetchBalancePayer()}
                isLoadingWallet={isLoadingWallet}
              />
            </Box>
          </HStack>
        </Box>
      ) : (
        <VStack margin="auto" height="full" justifyContent="center">
          <Box width="full">
            <RequireConnectWallet />
          </Box>
        </VStack>
      )}
    </>
  );
};

export default BliztPage;
