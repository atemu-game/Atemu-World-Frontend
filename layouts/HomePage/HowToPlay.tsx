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
      <Text variant="title_home">Blitz points</Text>
      <Text>
        Your gateway to the Atemu Realm. Stack your points and build your deck
      </Text>
      <Card variant="content_secondary">
        <Text></Text>
      </Card>

      <VStack>
        <Text variant="title_home">Atemu is different</Text>
        <Text>Buy, Trade, Sell and Fight</Text>
        {AtemuDifferentSection.map((item, index) => (
          <Card
            width="full"
            variant="shadow"
            key={`${index}-card diff`}
            padding={4}
          >
            <Box
              py={6}
              style={{
                border: '2px solid transparent',
                borderImageSlice: 2,
                borderImageSource:
                  'linear-gradient(90.73deg, rgba(232, 183, 124, 0.5) -5.34%, rgba(253, 217, 105, 0.5) 51.67%, rgba(178, 113, 34, 0.5) 116.05%)',
              }}
              textAlign="center"
            >
              <Text fontSize="24px" fontWeight="medium">
                {item}
              </Text>
            </Box>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default HowToPlay;
