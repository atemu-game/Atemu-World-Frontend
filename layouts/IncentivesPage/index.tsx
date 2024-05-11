'use client';
import {
  Box,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import CurrentPlayer from './CurrentPlayer';
import YourEntries from './YourEntries';
import CurrentRound from './CurrentRound';
export interface PlayerProps {
  address: string;
  pointTotal: number;
  pointEntry: number;
  percentage?: number;
}
const IncentivePage = () => {
  const CurentPlayerMock: PlayerProps[] = [
    {
      address:
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2a6494',
      pointTotal: 12000,
      pointEntry: 5000,
      percentage: 15,
    },
    {
      address:
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2a6494',
      pointTotal: 24000,
      pointEntry: 5000,
      percentage: 15,
    },
    {
      address:
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2a6494',
      pointTotal: 12000,
      pointEntry: 5000,
      percentage: 15,
    },
    {
      address:
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2a6494',
      pointTotal: 12000,
      pointEntry: 5000,
      percentage: 15,
    },
    {
      address:
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2a6494',
      pointTotal: 12000,
      pointEntry: 5000,
      percentage: 15,
    },
  ];

  const ListTestAtrr = [
    'attribute',
    'icon',
    'monster type',
    'normal monster',
    'spell',
    'trap',
  ];
  return (
    <Flex flexDirection="column" gap={4}>
      <Text variant="title">Fuel</Text>
      <HStack alignItems="flex-start" gap={4} justifyContent="space-between">
        <Flex flexDirection="column" gap={4} width="full">
          <Flex>
            <CurrentPlayer listPlayer={CurentPlayerMock} />
            <CurrentRound />
          </Flex>

          <YourEntries />
        </Flex>
        <Flex flexDirection="column" gap={4} width="340px">
          <Box border="1px solid" borderColor="divider.100">
            <Box padding={4}>
              <HStack justifyContent="space-between" mb={5}>
                <Text variant="sub_title">Round: 23,234</Text>
                <Box>1:30:00</Box>
              </HStack>
              <Grid gridTemplateColumns={'repeat(2,1fr)'} gap={4}>
                <Box>
                  <Text>25k</Text>
                  <Text>Prize Pool </Text>
                </Box>
                <Box>
                  <Text>5/500</Text>
                  <Text>Participants </Text>
                </Box>
                <Box>
                  <Text>5k</Text>
                  <Text>Your Entries</Text>
                </Box>
                <Box>
                  <Text>20%</Text>
                  <Text>Your win chances </Text>
                </Box>
              </Grid>
            </Box>
            <Divider />
            <Grid gridTemplateColumns={'repeat(2,1fr)'} gap={4} padding={4}>
              <Box flexGrow={1}>
                <Text>25k</Text>
                <Text>Prize Pool </Text>
              </Box>
              <Box flexGrow={1}>
                <Text>5/500</Text>
                <Text>Participants </Text>
              </Box>
            </Grid>
          </Box>

          <Box border="1px solid" borderColor="divider.100" padding={4}>
            <Text variant="title">Card Prize</Text>
            <Image src="/assets/arts/back_side.svg" />
            <Flex gap={3} flexWrap="wrap" mt={4}>
              {ListTestAtrr.map((attr, index) => {
                return (
                  <Box
                    py={1}
                    px={4}
                    key={`Attr-${index}`}
                    textTransform="uppercase"
                    border="1px solid"
                    fontWeight="bold"
                  >
                    {attr}
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default IncentivePage;
