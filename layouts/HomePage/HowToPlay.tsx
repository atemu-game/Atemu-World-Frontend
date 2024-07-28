import Card from '@/components/Card';
import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const HowToPlay = () => {
  const BliztPointSection = [
    'Earn Blitz Points by playing Blitz',
    'Boost your earnings: Invite friends for multiplier bonuses',
    'Use Blitz Points to:',
  ];

  const AtemuDifferentSection = [
    'Full Ownership: Trade or sell your cards anytime',
    'Free-care Gas Fees: Play as much as you want with the cheapest L2 gas costs on Starknet',
    'Fast Gameplay: Instant battles and transactions',
    'Earn Real Value: Collect, Build your deck and Compete with others',
  ];
  return (
    <Box>
      <Text>Blitz points</Text>
      <Text>
        Your gateway to the Atemu Realm. Stack your points and build your deck
      </Text>
      <Card>
        <Text></Text>
      </Card>

      <VStack>
        <Text>Atemu is different</Text>
        <Text>Buy, Trade, Sell and Fight</Text>
        {}
      </VStack>
    </Box>
  );
};

export default HowToPlay;
