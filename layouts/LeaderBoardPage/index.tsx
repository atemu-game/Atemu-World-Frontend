'use client';
import Card from '@/components/Card';
import TimeReminder from '@/components/TimeReminder';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const LeaderPage = () => {
  return (
    <Flex flexDirection="column">
      <Text variant="title">Leaderboard</Text>
      <Card as={VStack} py={6}>
        <Text>Season 1</Text>
        <Text
          fontSize="24px"
          fontWeight="bold"
          color="secondary.400"
          textTransform="uppercase"
        >
          Rise of the ash
        </Text>
        <HStack>
          <Text>Time remaining:</Text>
          <TimeReminder
            targetDate={new Date(
              new Date().getTime() + 3 * 24 * 60 * 60 * 1000
            ).getTime()}
          />
        </HStack>
      </Card>
    </Flex>
  );
};

export default LeaderPage;
