import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';

import { colors } from '@/themes';
import { convertHex } from '@/utils/convertHex';
import { ellipseMiddle } from '@/utils/formatAddress';
import { Box, Flex, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { UserWalletProps } from '.';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
import ClearIcon from '@/public/assets/icons/clear.svg';
interface IProps {
  userWallet: UserWalletProps;
  balance: string;
}
const MonitorTrade = ({ userWallet, balance }: IProps) => {
  const { eventLog, handleClearEventLog } = useCreatorAccount();
  return (
    <Flex flexDirection="column" gap={4} width="full">
      <Flex
        border="1px solid"
        borderColor="divider.100"
        padding={4}
        gap={{ xl: 8, lg: 6, base: 0 }}
        width="full"
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
            <Text>{ellipseMiddle(userWallet.payerAddress, 8, 10)}</Text>

            <CopyClipBoard
              context={userWallet.payerAddress}
              aria-label="Copy Stark Address"
              h={4}
              w={4}
            />
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
          </HStack>
        </Box>
      </Flex>
      <Box border="1px solid" borderColor="divider.100" padding={4}>
        <Text>Balance: </Text>
        <Text fontWeight="bold">{balance} (ETH)</Text>
      </Box>
      <Box
        padding={4}
        background={`${convertHex(colors.secondary[400], 0.05)}`}
        border="1px solid"
        color="white"
        borderColor={convertHex(colors.secondary[400], 0.5)}
        fontWeight={700}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Text color="secondary.400">Block : 124,500</Text>
        <Text>You Sent : 124,500 transactions</Text>
        <Text>Ready to mine? can start at block 123,457</Text>
      </Box>
      <Box
        background={`${convertHex(colors.secondary[400], 0.05)}`}
        border="1px solid"
        color="white"
        borderColor={convertHex(colors.secondary[400], 0.5)}
        fontWeight={700}
        height={600}
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
              const latest = index === 0;
              return (
                <HStack
                  key={index}
                  justifyContent="space-between"
                  color={index === 0 ? 'secondary.400' : 'white'}
                >
                  <Text>
                    {log.transactionHash} {latest ? '(Latest)' : ''}
                  </Text>
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
