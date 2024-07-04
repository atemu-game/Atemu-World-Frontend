import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import RefreshIcon from '@/public/assets/icons/refresh.svg';
import { colors } from '@/themes';
import { convertHex } from '@/utils/convertHex';
import { ellipseMiddle } from '@/utils/formatAddress';
import {
  Box,
  Flex,
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
import { STARKSCAN_LINK } from '@/utils/constants';

import WidthDrawAccount from './WidthDrawAccount';
import Card from '@/components/Card';

interface IProps {
  userWallet: UserWalletProps;
  refetchBalance: () => void;
  isLoadingWallet: boolean;
  isLoadingBalance: boolean;
}
const MonitorTrade = ({
  userWallet,
  refetchBalance,
  isLoadingWallet,
  isLoadingBalance,
}: IProps) => {
  const { eventLog, handleClearEventLog, balance } = useCreatorAccount();

  return (
    <Flex flexDirection="column" gap={4} width="full" flexGrow={1}>
      <Card
        as={HStack}
        padding={4}
        gap={{ md: 6, base: 0 }}
        width="full"
        // justifyContent={{ lg: 'flex-start', base: 'space-between' }}
        alignItems="flex-start"
        justifyContent="flex-start"
        flexWrap={{ lg: 'nowrap', base: 'wrap' }}
      >
        <Box>
          <Text variant="sub_title" mb={2}>
            Your Starknet Address
          </Text>
          <Card
            variant="content"
            as={HStack}
            padding={2}
            justifyContent="space-between"
          >
            {!isLoadingWallet && userWallet ? (
              <>
                <Text fontWeight="bold">
                  {ellipseMiddle(userWallet.payerAddress, 8, 10)}
                </Text>
                <CopyClipBoard
                  context={userWallet.payerAddress}
                  aria-label="Copy Stark Address"
                  h={4}
                  w={4}
                />
              </>
            ) : (
              <Skeleton>Address ........</Skeleton>
            )}
          </Card>
        </Box>

        <Box>
          <Text variant="sub_title" mb={2}>
            Your Secret Key
          </Text>
          <Card
            variant="content"
            as={HStack}
            padding={2}
            flexWrap={{
              md: 'nowrap',
              base: 'wrap',
            }}
          >
            {!isLoadingWallet && userWallet ? (
              <>
                <Text
                  textOverflow="ellipsis"
                  fontWeight="bold"
                  maxWidth={{ lg: 'full', base: '300px' }}
                >
                  {ellipseMiddle(userWallet.privateKey, 15, 15)}
                </Text>
                <CopyClipBoard
                  context={userWallet.privateKey}
                  h={4}
                  w={4}
                  aria-label="Copy Stark Address"
                />
              </>
            ) : (
              <Skeleton>
                0x4e6078cc617d64e1c2c6abe255ba6e68af20fb763585d5e2128eace3a462b83
              </Skeleton>
            )}
          </Card>
        </Box>
      </Card>

      <Card padding={4}>
        <Text variant="sub_title">ETH fund balance </Text>

        {isLoadingWallet ? (
          <HStack>
            <Skeleton>Loading Balance (ETH)</Skeleton>
            <Skeleton>Widthdraw Loading</Skeleton>
          </HStack>
        ) : (
          <HStack flexWrap="wrap">
            <Card height="36px" variant="content" as={HStack} padding={2}>
              {isLoadingBalance ? (
                <Skeleton>Loading Balance....</Skeleton>
              ) : (
                <Text fontWeight="bold" fontSize="sm">
                  {balance?.toFixed(8)} (ETH)
                </Text>
              )}

              <IconButton
                _hover={{
                  color: 'white',
                }}
                onClick={async () => {
                  refetchBalance();
                }}
                variant="icon_button"
                aria-label="refresh"
                icon={<Icon as={RefreshIcon} h={6} w={6} />}
              />
            </Card>

            {balance && (
              <WidthDrawAccount refetchBalance={() => refetchBalance()} />
            )}
          </HStack>
        )}
      </Card>

      <Box
        background={`${convertHex(colors.secondary[400], 0.05)}`}
        border="1px solid"
        color="white"
        borderColor={convertHex(colors.secondary[400], 0.5)}
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
          <IconButton
            onClick={handleClearEventLog}
            icon={<Icon as={ClearIcon} height={5} width={5} />}
            aria-label="icon clear button"
            variant="icon_btn"
          />
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
                      href={`${STARKSCAN_LINK}/${log.transactionHash}`}
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
      </Box>
    </Flex>
  );
};

export default MonitorTrade;
