import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const HowToPlaySection = () => {
  const ListPhasePlay = [
    {
      title: 'Phase 1: Set up',
      content:
        'Each Players  shall prepare a Deck with 40 cards and have 8000 LP.',
      steps: [
        " Shuffle opponent's Deck.",
        ' Choose the one who start.',
        'Draw the first 5 cards.',
      ],
    },
    {
      title: 'Phase 2: Battle',
      content: 'In each turn, a player can:',
      steps: [
        'Summon a Monster Card, declare attack or defense.',
        'Setup Trap Card and activate when it meets the condition.',
        'Setup or activate Spell Cards.',
      ],
    },
    {
      title: 'Phase 3: End',
      content:
        'The game end when one Player‘s LP drops to 0 or ﻿that Player surrender',
    },
  ];
  return (
    <>
      <Box textAlign="center">
        <Text variant="secondary" fontSize="52px" textTransform="uppercase">
          How to play
        </Text>
        <Text variant="secondary" mb={6}>
          {
            "  Choosing and using different combinations of Monsters, Traps and Spells to make damaages on your opponent and protect your LP. If you still have any LPs left and your opponent doesn't, you win!"
          }
        </Text>
        <Text mb={8} variant="secondary">
          The are three phases of game:
        </Text>
        <Flex flexWrap={{ md: 'nowrap', base: 'wrap' }} rowGap={6}>
          {ListPhasePlay.map(data => (
            <Flex
              flexDirection="column"
              key={data.title}
              color="white"
              fontWeight={700}
            >
              <Text variant="primary" mb={{ md: 4, base: 2 }}>
                {data.title}
              </Text>
              <Text variant="primary">{data.content}</Text>
              <>
                {data.steps &&
                  data.steps.map((step, index) => (
                    <Text variant="primary" key={`${data.steps}-${index}`}>
                      {index + 1}/ {step}
                    </Text>
                  ))}
              </>
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default HowToPlaySection;
