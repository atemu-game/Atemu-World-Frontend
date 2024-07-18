import Card from '@/components/Card';
import ConnectWallet from '@/components/ConnectWallet';
import NumberSpinder from '@/components/Input/NumberSpinder';
import { useAuth } from '@/hooks/useAuth';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const YourEntries = () => {
  const ListOption = [
    {
      value: 25,
      label: '25',
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
  return (
    <Card padding={4} display="flex" flexDirection="column" gap={4}>
      {userAddress ? (
        <>
          <Text textTransform="uppercase" variant="sub_title" fontWeight="bold">
            Your entries
          </Text>
          <Flex
            gap={8}
            flexWrap={{
              md: 'nowrap',
              base: 'wrap',
            }}
          >
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

            <Box width={{ md: 'auto', base: 'full' }}>
              <HStack justifyContent="space-between" mb={4}>
                <Text variant="sub_title">Number of rounds</Text>
                <Button variant="secondary">Max</Button>
              </HStack>
              <NumberSpinder />
            </Box>
          </Flex>

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
          <Button variant="primary" width="full" borderColor="secondary.100">
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
