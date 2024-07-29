import React from 'react';

import { Icon, VStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
const DescriptionSection = () => {
  const ListContent = [
    'Atemu OG is the first Card Collection on Atemu. Coming with limted supply and will not be restock',
    '50 Powerful Cards from 5 Unique Realms: Egypt, Greek, Japan, Viking, and Hellborn',
    '5 ultra-rare god-tier characters (1% rarity) from each realm that possess powerful strength, special skills and unique appearances.',
    'Each card is a unique NFT that you can own, collect and trade with others',
  ];
  return (
    <VStack mt="300px">
      <Text variant="title_home">The genesis of atemu</Text>
      <VStack gap={2} mb="72px">
        {ListContent.map((item, index) => (
          <Text
            textAlign="center"
            key={`Content Description ${index}`}
            color="#FFFFFFBF"
            textShadow="0px 0px 2px #1E1E1E"
          >
            - {item}
          </Text>
        ))}
      </VStack>
      <Image
        src={'/assets/arts/common/card_group_tester.svg'}
        alt="Card Art"
        width={1273}
        height={670}
      />
    </VStack>
  );
};

export default DescriptionSection;
