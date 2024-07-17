import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardImg1 from '@/public/assets/arts/card/card_1.png';
import CardImg2 from '@/public/assets/arts/card/card_2.png';
import CardImg3 from '@/public/assets/arts/card/card_3.png';
import Image from 'next/image';
const CardTypeSection = () => {
  const ListCard = [
    {
      image: CardImg1,
      name: 'Monster Card',
      color: 'Brown',
      description: 'They are the direct force for you to take the opponent LP',
    },
    {
      image: CardImg2,
      name: 'Trap Card',
      color: 'Pink',
      description: 'activate when oppnent declare an attack on your Monster',
    },
    {
      image: CardImg3,
      name: 'Spell Card',
      color: 'Green',
      description:
        'Activate in your turn, these cards shall have special effects on specific objects',
    },
  ];
  return (
    <Box textAlign="center">
      <Text variant="secondary" fontSize="52px" textTransform="uppercase">
        Card Type
      </Text>
      <Text variant="secondary" mb={8}>
        Atemu provides m﻿echanism for Players to bet and earn from their skills.
      </Text>
      <Grid
        gridTemplateColumns={{
          md: 'repeat(3,1fr)',
          base: 'repeat(1,1fr)',
        }}
        rowGap={6}
      >
        {ListCard.map(card => (
          <VStack key={card.name} width="full">
            <Image src={card.image.src} height={546} width={372} alt={''} />
            <Text variant="primary" mt={4}>
              {card.name}
            </Text>
            <Text variant="primary">Color: {card.color}</Text>
            <Text variant="primary" px={{ md: 4, base: 0 }}>
              Description: {card.description}
            </Text>
          </VStack>
        ))}
      </Grid>
    </Box>
  );
};

export default CardTypeSection;
