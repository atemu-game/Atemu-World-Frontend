import Card from '@/components/Card';
import ConnectWallet from '@/components/ConnectWallet';

import { useAuth } from '@/hooks/useAuth';

import { CONTRACT_ADDRESS } from '@/utils/constants';
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAccount } from '@starknet-react/core';
import React from 'react';
import { CallData, uint256 } from 'starknet';
interface IProps {
  currentId?: number;
  endAt?: number;
}
const YourEntries = ({ currentId, endAt }: IProps) => {
  const ListOption = [
    {
      value: 10,
      label: '10',
    },
    {
      value: 50,
      label: '50',
    },

    {
      value: 100,
      label: '100',
    },
    {
      value: 1000,
      label: 'random',
    },
  ];
  const [entry, setEntry] = React.useState(ListOption[0].value);
  const { userAddress } = useAuth();
  const { account } = useAccount();

  const handleJoinPool = async () => {
    try {
      if (account && currentId) {
        await account.execute([
          {
            contractAddress: CONTRACT_ADDRESS.BLIZT_POINT,
            entrypoint: 'approve',
            calldata: CallData.compile({
              spender: CONTRACT_ADDRESS.FUEL,
              amount: uint256.bnToUint256(Number(entry)),
            }),
          },
          {
            contractAddress: CONTRACT_ADDRESS.FUEL,
            entrypoint: 'joiningPool',
            calldata: CallData.compile({
              poolId: uint256.bnToUint256(currentId),
              amountPoint: uint256.bnToUint256(Number(entry)),
            }),
          },
        ]);
      }
    } catch (error) {
      console.log(typeof error);
    }
  };
  return (
    <Card padding={4} display="flex" flexDirection="column" gap={4}>
      {userAddress ? (
        <>
          <Text textTransform="uppercase" variant="sub_title" fontWeight="bold">
            Your entries
          </Text>
          <Grid gridTemplateColumns={`repeat(2,1fr)`} gap={8}>
            <Box flexGrow={1}>
              <HStack
                justifyContent="space-between"
                mb={4}
                flexWrap={{ md: 'nowrap', base: 'wrap' }}
              >
                <Text color="primary.100" fontWeight="bold">
                  Points entry per round
                </Text>
                <Flex gap={3}>
                  {ListOption.map((option, index) => {
                    return (
                      <Button
                        key={`Option-Entries ${index}`}
                        variant="secondary"
                        onClick={() => {
                          setEntry(() => option.value);
                        }}
                      >
                        {option.label}
                      </Button>
                    );
                  })}
                </Flex>
              </HStack>
              <Input
                variant="primary"
                placeholder="Enter your entry"
                value={entry}
              />
            </Box>

            <Box
              width={{ md: 'auto', base: 'full' }}
              opacity={0.3}
              cursor="not-allowed"
            >
              <HStack justifyContent="space-between" mb={4}>
                <Text color="primary.100" fontWeight="bold">
                  Number of rounds
                </Text>
                <Button variant="secondary">Max</Button>
              </HStack>
              {/* <NumberSpinder /> */}
            </Box>
          </Grid>

          <HStack justifyContent="space-between">
            <Text color="primary.100">Total entry</Text>
            <Text fontWeight="bold" color="primary.100">
              100 points
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color="primary.100">Est. gas fees</Text>
            <Text fontWeight="bold" color="primary.100">
              10.0025 ETH
            </Text>
          </HStack>
          <Button
            variant="primary"
            width="full"
            borderColor="secondary.100"
            isDisabled={endAt && endAt < Date.now() ? true : false}
            onClick={() => {
              handleJoinPool();
            }}
          >
            Add Selection
          </Button>
        </>
      ) : (
        <VStack py={20}>
          <Text variant="sub_title">Connect your wallet to start</Text>
          <ConnectWallet />
        </VStack>
      )}
    </Card>
  );
};

export default YourEntries;
