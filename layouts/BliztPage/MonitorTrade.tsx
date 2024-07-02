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

interface IProps {
  userWallet: UserWalletProps;
  refetchBalance: () => void;
  isLoadingWallet: boolean;
}
const MonitorTrade = ({
  userWallet,
  refetchBalance,
  isLoadingWallet,
}: IProps) => {
  const { eventLog, handleClearEventLog, balance } = useCreatorAccount();

  return (
    <Flex flexDirection="column" gap={4} width="full">
      <Flex
        border="1px solid"
        borderColor="divider.100"
        padding={4}
        gap={{ xl: 8, lg: 6, base: 0 }}
        width="full"
        justifyContent={{ lg: 'flex-start', base: 'space-around' }}
        flexWrap={{ xl: 'nowrap', base: 'wrap' }}
      >
        <Box>
          <Text variant="sub_title" mb={2}>
            Your Starknet Address
          </Text>
          <HStack
            padding={2}
            border="1px solid"
            borderColor="divider.100"
            justifyContent="space-between"
          >
            {!isLoadingWallet && userWallet ? (
              <>
                <Text>{ellipseMiddle(userWallet.payerAddress, 8, 10)}</Text>
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
          </HStack>
        </Box>

        <Box>
          <Text variant="sub_title" mb={2}>
            Your Secret Key
          </Text>
          <HStack
            padding={2}
            border="1px solid"
            borderColor="divider.100"
            flexWrap={{
              md: 'nowrap',
              base: 'wrap',
            }}
          >
            {!isLoadingWallet && userWallet ? (
              <>
                <Text
                  textOverflow="ellipsis"
                  maxWidth={{ lg: 'full', base: '300px' }}
                >
                  {userWallet.privateKey}
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
          </HStack>
        </Box>
      </Flex>

      <Box border="1px solid" borderColor="divider.100" padding={4}>
        <Text>Balance: </Text>
        {isLoadingWallet ? (
          <HStack>
            <Skeleton>Loading Balance (ETH)</Skeleton>
            <Skeleton>Widthdraw Loading</Skeleton>
          </HStack>
        ) : (
          <HStack flexWrap="wrap">
            <Text fontWeight="bold">{balance} (ETH)</Text>
            <IconButton
              _hover={{
                color: 'white',
              }}
              onClick={async () => {
                refetchBalance();
              }}
              variant="icon_button"
              aria-label="refresh"
              icon={<Icon as={RefreshIcon} />}
            />
            {balance && (
              <WidthDrawAccount refetchBalance={() => refetchBalance()} />
            )}
          </HStack>
        )}
      </Box>

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
