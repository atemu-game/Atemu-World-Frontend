'use client';
import Card from '@/components/Card';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const SpinOfFatePage = () => {
  return (
    <Flex flexDirection="column" gap={4}>
      <Text variant="title">Spin Of fate</Text>
      <Card></Card>
      <Card>
        <Flex flexDirection="column" gap={4}>
          <Text variant="title">+1500</Text>
          <Text>{`To be eligible to join “Spin of Fate"`}</Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default SpinOfFatePage;
