'use client';
import Card from '@/components/Card';
import NumberSpinder from '@/components/Input/NumberSpinder';
import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const SpinOfFatePage = () => {
  return (
    <Flex flexDirection="column" gap={4}>
      <Text variant="title">Spin Of fate</Text>
      <Card>Build Dev</Card>
      <Card pt={6} as={VStack}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="500px"
        >
          <Text
            variant="title"
            fontSize="24px"
            textTransform="uppercase"
            fontWeight="bold"
          >
            + 2500 points
          </Text>
          <Text
            color="#FFFFFFBF"
            mb={10}
          >{`To be eligible to join “Spin of Fate"`}</Text>
          <HStack justifyContent="space-between" width="full" mb={3}>
            <Text color="primary.100" fontWeight="bold">
              Rounds of Spin
            </Text>
            <Text color="primary.100" fontStyle="italic">
              1500 points / round
            </Text>
          </HStack>
          <NumberSpinder />
          <Button variant="primary" mt={5} width="full">
            Spin
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default SpinOfFatePage;
