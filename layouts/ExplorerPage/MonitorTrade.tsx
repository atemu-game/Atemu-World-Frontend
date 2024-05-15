import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import { useWalletContext } from '@/providers/ProviderContext';
import { colors } from '@/themes';
import { convertHex } from '@/utils/convertHex';
import { ellipseMiddle } from '@/utils/formatAddress';
import { Box, Button, Flex, HStack, Input, Text } from '@chakra-ui/react';
import React from 'react';

const MonitorTrade = () => {
  const { address } = useWalletContext();
  return (
    <>
      {address ? (
        <Flex flexDirection="column" gap={4} width="full">
          <Flex
            border="1px solid"
            borderColor="divider.100"
            padding={4}
            gap={4}
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
                <Text>{ellipseMiddle(address, 5, 5)}</Text>

                <CopyClipBoard
                  context={address}
                  aria-label="Copy Stark Address"
                  h={4}
                  w={4}
                />
              </HStack>
            </Box>

            <Box>
              <Text variant="sub_title" mb={2}>
                Your Scret Key
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
                  suiprivkey1qpdr8cdecfxnvllwz7trdq5lkwvhkhwwsnzwzc3r890ulhpga3u62v6rw4m
                </Text>
                <CopyClipBoard
                  context={
                    'suiprivkey1qpdr8cdecfxnvllwz7trdq5lkwvhkhwwsnzwzc3r890ulhpga3u62v6rw4m'
                  }
                  h={4}
                  w={4}
                  aria-label="Copy Stark Address"
                />
              </HStack>
            </Box>
          </Flex>

          <Box padding={4} border="1px solid" borderColor="divider.100">
            <Text variant="sub_title" mb={2}>
              Import your private key
            </Text>
            <HStack>
              <Input
                placeholder="Import your private key here"
                variant="primary"
              />
              <Button
                variant="primary"
                borderColor="white"
                minWidth={{ md: '200px', base: 'fit-content' }}
              >
                Import
              </Button>
            </HStack>
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
            <Text>Events Log</Text>
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
      ) : (
        <Text variant="sub_title">Please connect your wallet</Text>
      )}
    </>
  );
};

export default MonitorTrade;
