import Card from '@/components/Card';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const SpinFatePoint = () => {
  const ListTestReward = [
    {
      id: '0x003211111111111',
      value: 100,
    },
    {
      id: '0x003211111111112',
      value: 1500,
    },
    {
      id: '0x003211111111113',
      value: 2000,
    },

    {
      id: '0x003211111111114',
      value: 100,
    },
    {
      id: '0x003211111111115',
      value: 100,
    },
    {
      id: '0x003211111111161',
      value: 100,
    },
    {
      id: '0x003211111111117',
      value: 100,
    },
    {
      id: '0x003211111111118',
      value: 100,
    },
    {
      id: '0x003211111111119',
      value: 100,
    },
    {
      id: '0x003211111111120',
      value: 100,
    },
  ];
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      width="full"
      overflow="hidden"
      minH="352px"
    >
      <HStack
        position="relative"
        gap={0}
        style={{
          boxAlign: 'center',
        }}
      >
        {ListTestReward.map((item, index) => (
          <Box
            key={item.id}
            as={Card}
            height={112}
            width={144}
            variant="content"
            display="block"
            position="absolute"
            margin="auto"
            transform={`translateX(${
              1090 - index * 100 - index
            }px) translateZ(0px)`}
            textAlign="center"
          >
            <VStack>
              <Text fontWeight="bold">{item.value}</Text>
            </VStack>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default SpinFatePoint;
