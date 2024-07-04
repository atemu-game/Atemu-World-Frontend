import Card from '@/components/Card';
import NumberSpinder from '@/components/Input/NumberSpinder';
import { Box, Button, Flex, HStack, Input, Text } from '@chakra-ui/react';
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
  return (
    <Card padding={4} display="flex" flexDirection="column" gap={4}>
      <Text textTransform="uppercase" variant="sub_title">
        Your entries
      </Text>
      <Flex
        gap={8}
        flexWrap={{
          md: 'nowrap',
          base: 'wrap',
        }}
      >
        <Box>
          <HStack
            justifyContent="space-between"
            mb={4}
            flexWrap={{ md: 'nowrap', base: 'wrap' }}
          >
            <Text variant="sub_title">Points entry per round</Text>
            <Flex gap={3}>
              {ListOption.map((option, index) => {
                return (
                  <Button
                    variant="primary"
                    key={`Option-Entries ${index}`}
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
            placeholder="Enter your entry"
            value={entry}
            variant="primary"
          />
        </Box>

        <Box width={{ md: 'auto', base: 'full' }}>
          <HStack justifyContent="space-between" mb={4}>
            <Text variant="sub_title">Number of rounds</Text>
            <Button variant="primary">Max</Button>
          </HStack>
          <NumberSpinder />
        </Box>
      </Flex>

      <HStack justifyContent="space-between">
        <Text>Total entry</Text>
        <Text>100 points</Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text>Est. gas fees</Text>
        <Text>10.0025 ETH</Text>
      </HStack>
      <Button variant="primary" width="full" borderColor="secondary.100">
        Add Selection
      </Button>
    </Card>
  );
};

export default YourEntries;
