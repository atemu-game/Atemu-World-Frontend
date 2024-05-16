import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import BackGroundImg1 from '@/public/assets/arts/incentive_1.png';
import BackGroundImg2 from '@/public/assets/arts/incentive_2.png';
import { convertHex } from '@/utils/convertHex';
import { colors } from '@/themes';
const IncentiveSection = () => {
  const ListContent = [
    {
      image: BackGroundImg1,
      title: 'Explorer ',
      content:
        'Increase your on-chain activity to boost your points Participate in “Fuel" and gain supreme trading cards',
    },
    {
      image: BackGroundImg2,
      title: 'Fuel ',
      content:
        'Deposit your points and spin the wheel. But remember:there can be only one winner',
    },
  ];
  return (
    <Box>
      <Text variant="title">Incentives</Text>
      <Flex flexWrap={{ lg: 'nowrap', base: 'wrap' }} gap={6}>
        {ListContent.map(item => (
          <Box
            key={item.title}
            background={`url('${item.image.src}')`}
            backgroundPosition="center"
            objectFit="cover"
            height="324px"
            display="flex"
            alignItems="flex-end"
            border="1px solid"
            borderColor="divider.100"
          >
            <Box
              background={convertHex(colors.body, 0.5)}
              padding={5}
              backdropFilter="auto"
              backdropBlur="8px"
            >
              <Text
                variant="title"
                sx={{
                  mb: 0,
                }}
              >
                {item.title}
              </Text>
              <Text>{item.content}</Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default IncentiveSection;
