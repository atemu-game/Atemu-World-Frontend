import Card from '@/components/Card';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
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
    <Box width="full" position="relative">
      <Image
        src="/assets/arts/common/home_art_blizt.svg"
        height={1550}
        width={400}
        style={{
          position: 'absolute',
          right: 0,
          zIndex: -2,
        }}
        alt=""
      />
      <Text variant="title_home">Blitz points</Text>
      <Text
        color="#FFFFFFBF"
        textAlign="center"
        textShadow="0px 0px 2px  #1E1E1E"
        mb="72px"
      >
        Your gateway to the Atemu Realm. Stack your points and build your deck
      </Text>
      <Card width="full" variant="shadow" padding={4}>
        <Box
          padding="80px"
          style={{
            border: '2px solid transparent',
            borderImageSlice: 2,
            borderImageSource:
              'linear-gradient(90.73deg, rgba(232, 183, 124, 0.5) -5.34%, rgba(253, 217, 105, 0.5) 51.67%, rgba(178, 113, 34, 0.5) 116.05%)',
          }}
        >
          <VStack spacing={4} position="relative">
            {BliztPointSection.map((item, index) => (
              <Box key={`${index}-box`}>
                <Text
                  fontSize="24px"
                  fontWeight="medium"
                  color=" #FFFFFFBF"
                  textShadow="0px 0px 2px #1E1E1E"
                >
                  {index + 1}.{item}
                </Text>
              </Box>
            ))}
            <Text color="primary.100">
              Enter tournaments with big prize pools
            </Text>
            <Text color="primary.100">
              Join the Fuel - Wheel Of Fortune to Spin for rare OG cards
            </Text>
            <Text color="primary.100">Buy exclusive Atemu items</Text>
            <Button variant="primary">Enter</Button>
          </VStack>
        </Box>
      </Card>
      <VStack mt="240px">
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
