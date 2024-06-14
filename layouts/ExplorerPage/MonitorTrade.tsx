import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';

import { colors } from '@/themes';
import { convertHex } from '@/utils/convertHex';
import { ellipseMiddle } from '@/utils/formatAddress';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { UserWalletProps } from '.';

interface IProps {
  userWallet: UserWalletProps;
  balance: string;
}
const MonitorTrade = ({ userWallet, balance }: IProps) => {
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
        padding={4}
        background={`${convertHex(colors.secondary[400], 0.05)}`}
        border="1px solid"
        color="white"
        borderColor={convertHex(colors.secondary[400], 0.5)}
        fontWeight={700}
        display="flex"
        flexDirection="column"
        gap={3}
        minH={400} // Test
      >
        <Text>Events Log (10 Latest transactions)</Text>
      </Box>
      <HStack
        padding={4}
        background={`${convertHex(colors.secondary[400], 0.05)}`}
        border="1px solid"
        borderColor={convertHex(colors.secondary[400], 0.5)}
        justifyContent="space-between"
      >
        <Box>
          <Text>123,456</Text>
          <Text>Claimable Points</Text>
        </Box>
        <Button
          variant="primary"
          minWidth={{ md: '200px', base: 'fit-content' }}
          color="secondary.400"
          borderColor="secondary.400"
        >
          Claim
        </Button>
      </HStack>
    </Flex>
  );
};

export default MonitorTrade;
