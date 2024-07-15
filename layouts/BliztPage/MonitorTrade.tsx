import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import RefreshIcon from '@/public/assets/icons/refresh.svg';
import { colors } from '@/themes';
import { convertHex } from '@/utils/convertHex';
import { ellipseMiddle } from '@/utils/formatAddress';
import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { UserWalletProps } from '.';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
import ClearIcon from '@/public/assets/icons/clear.svg';
import Link from 'next/link';

import WidthDrawAccount from './WidthDrawAccount';
import Card from '@/components/Card';
import DespositAccount from './DespositAccount';
import { STARK_SCAN } from '@/utils/constants';

interface IProps {
  userWallet: UserWalletProps;
  refetchWallet: () => void;
  refetchBalance: () => void;
  balance: number | null;
  isLoadingWallet: boolean;
  isLoadingBalance: boolean;
}
const MonitorTrade = ({
  userWallet,
  refetchBalance,
  refetchWallet,
  balance,
  isLoadingWallet,
  isLoadingBalance,
}: IProps) => {
  const { eventLog, handleClearEventLog } = useCreatorAccount();

  return (
    <Flex flexDirection="column" gap={4} width="full" flexGrow={1}>
      <Grid gridTemplateColumns={{ md: 'repeat(2,1fr)' }} gap={4}>
        <Card
          as={HStack}
          padding={4}
          height="full"
          gap={{ md: 6, base: 0 }}
          alignItems="flex-start"
          justifyContent="flex-start"
          flexWrap={{ lg: 'nowrap', base: 'wrap' }}
        >
          <Box>
            <Text mb={2}>Your Starknet Address</Text>
            <Card variant="content" as={HStack} justifyContent="space-between">
              {!isLoadingWallet && userWallet ? (
                <>
                  <Text fontWeight="bold">
                    {ellipseMiddle(userWallet.payerAddress, 6, 4)}
                  </Text>
                  <CopyClipBoard
                    context={userWallet.payerAddress}
                    aria-label="Copy Stark Address"
                    h={3}
                    w={3}
                  />
                </>
              ) : (
                <Skeleton>0x0716...4c69</Skeleton>
              )}
            </Card>
          </Box>

          <Box>
            <Text mb={2}>Your Secret Key</Text>
            <Card
              variant="content"
              as={HStack}
              flexWrap={{
                md: 'nowrap',
                base: 'wrap',
              }}
            >
              {!isLoadingWallet && userWallet ? (
                <>
                  <Text textOverflow="ellipsis" fontWeight="bold">
                    {ellipseMiddle(userWallet.privateKey, 6, 6)}
                  </Text>
                  <CopyClipBoard
                    context={userWallet.privateKey}
                    h={4}
                    w={4}
                    aria-label="Copy Stark Address"
                  />
                </>
              ) : (
                <Skeleton>0x498a...0fab01</Skeleton>
              )}
            </Card>
          </Box>
        </Card>

        <Card padding={4} height="full" flexGrow={1}>
          <Text mb={2}>ETH fund balance </Text>

          {isLoadingWallet ? (
            <HStack>
              <Skeleton>Loading Balance (ETH)</Skeleton>
              <Skeleton>Widthdraw Loading</Skeleton>
            </HStack>
          ) : (
            <HStack flexWrap="wrap">
              <Card variant="content" as={HStack}>
                {!isLoadingBalance && balance != null ? (
                  <Text fontWeight="bold" fontSize="sm">
                    {Number(balance).toFixed(5)} (ETH)
                  </Text>
                ) : (
                  <Skeleton>Loading Balance</Skeleton>
                )}
                <Icon
                  onClick={async () => {
                    refetchBalance();
                  }}
                  as={RefreshIcon}
                  h={3}
                  w={3}
                />
              </Card>

              {!isLoadingWallet &&
                userWallet &&
                userWallet.deployHash &&
                balance && (
                  <WidthDrawAccount refetchBalance={() => refetchBalance()} />
                )}
              <DespositAccount
                refetchWallet={refetchWallet}
                userWallet={userWallet}
                refetchBalance={async () => {
                  await refetchBalance();
                }}
              />
            </HStack>
          )}
        </Card>
      </Grid>

      <Card
        variant="content_secondary"
        fontWeight={700}
        height={500}
        position="relative"
        overflowY="scroll"
      >
        <HStack
          p={4}
          color="secondary.400"
          position="sticky"
          top={0}
          justifyContent="space-between"
        >
          <Text>Events Log</Text>
          <HStack>
            {!isLoadingWallet && userWallet && userWallet.deployHash ? (
              <Link
                href={`${STARK_SCAN.LINK_ACCOUNT}/${userWallet.payerAddress}`}
                target="_blank"
              >
                <Text color="white" textDecoration="underline">
                  {ellipseMiddle(userWallet.payerAddress, 6, 6)}
                </Text>
              </Link>
            ) : (
              <Skeleton>0x498a...0fab01</Skeleton>
            )}

            <IconButton
              onClick={handleClearEventLog}
              icon={<Icon as={ClearIcon} height={5} width={5} />}
              aria-label="icon clear button"
              variant="icon_btn"
            />
          </HStack>
        </HStack>

        <Flex
          position="sticky"
          flexDirection="column"
          padding={4}
          gap={4}
          pt={0}
        >
          {eventLog.length != 0 &&
            eventLog.toReversed().map((log, index) => {
              const currentDate = new Date(log.timestamp * 1000).toISOString();
              return (
                <HStack
                  key={index}
                  justifyContent="space-between"
                  color={index === 0 ? 'secondary.400' : 'white'}
                >
                  <Text>{currentDate}</Text>
                  <Tooltip hasArrow label="View in Starkscan" placement="top">
                    <Link
                      href={`${STARK_SCAN.LINK_TX}/${log.transactionHash}`}
                      target="_blank"
                    >
                      {log.transactionHash}
                    </Link>
                  </Tooltip>

                  <Text>{log.status}</Text>
                </HStack>
              );
            })}
        </Flex>
      </Card>
    </Flex>
  );
};

export default MonitorTrade;
