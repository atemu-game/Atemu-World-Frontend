import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const BettingSection = () => {
  const ListBettingContent = [
    'Top ranking Card Master of the Week/Month/Year.',
    'Winning Streak Bonus',
    'Top 1 Bounty',
    'Tournament',
    'Many many more',
  ];
  return (
    <Box textAlign="center">
      <Text variant="secondary" fontSize="52px" textTransform="uppercase">
        Betting and earning
      </Text>
      <Text variant="secondary">
        Atemu provides m﻿echanism for Players to bet and earn from their skills.
      </Text>
      <Text variant="primary" my={8}>
        Before the game:: input amount of STRK for betting plus 1$ fee. The
        total amount will be locked until the end of the game; when the game i﻿s
        over, the winner shall take the award.
      </Text>
      <Text variant="primary">Other Ways To Ea﻿rn on Atemu:</Text>
      {ListBettingContent.map((item, index) => (
        <Text key={item} variant="primary">
          {index + 1}/ ${item}
        </Text>
      ))}
    </Box>
  );
};

export default BettingSection;
