'use client';
import {
  Box,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import CurrentPlayer from './CurrentPlayer';
import YourEntries from './YourEntries';

import LotteryWheel from '@/components/LotteryWheel';
import Card from '@/components/Card';
export interface PlayerProps {
  address: string;
  pointTotal: number;
  pointEntry: number;
  percentage?: number;
}
const FuelPage = () => {
  const CurentPlayerMock: PlayerProps[] = [
    {
      address:
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2a3456',
      pointTotal: 12000,
      pointEntry: 5000,
      percentage: 25,
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
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2affff',
      pointTotal: 12000,
      pointEntry: 5000,
      percentage: 5,
    },
    {
      address:
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2a8888',
      pointTotal: 12000,
      pointEntry: 5000,
      percentage: 10,
    },
    {
      address:
        '0x014841C8012702aCB28A9a5777d27bc84e086f892E709E17Ce5273840F2a9999',
      pointTotal: 12000,
      pointEntry: 5000,
      percentage: 45,
    },
  ];
  const [isSpinning, setIsSpinning] = React.useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsSpinning(true);
      // Code to run every 2 seconds
    }, 2000);

    return () => {
      setIsSpinning(false);
      clearInterval(interval);
    };
  }, []);

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
      <HStack
        alignItems="flex-start"
        gap={4}
        justifyContent="space-between"
        flexWrap={{
          xl: 'nowrap',
          base: 'wrap',
        }}
      >
        <Flex flexDirection="column" gap={4} width="full">
          <Flex
            as={Card}
            gap={4}
            justifyContent="space-between"
            flexWrap={{ lg: 'nowrap', base: 'wrap-reverse' }}
          >
            <Box minWidth={{ lg: '325px', base: 'full' }} height="full">
              <CurrentPlayer listPlayer={CurentPlayerMock} />
            </Box>

            <Box
              padding={4}
              width="full"
              borderLeft="2px solid transparent"
              backgroundImage={`url('/assets/arts/bg_whale.svg')`}
              backgroundPosition="center"
              backgroundSize="contain"
              style={{
                borderImageSlice: 2,
                borderImageSource:
                  'linear-gradient(90.73deg, rgba(232, 183, 124, 0.15) -5.34%, rgba(253, 217, 105, 0.15) 51.67%, rgba(178, 113, 34, 0.15) 116.05%)',
              }}
            >
              <Text variant="title">Current Round</Text>
              <VStack>
                <LotteryWheel
                  dataSeries={CurentPlayerMock}
                  totalPoint={25}
                  timer={10}
                  winner={CurentPlayerMock[0].address}
                />
              </VStack>
            </Box>
          </Flex>

          <YourEntries />
        </Flex>
        <Flex flexDirection="column" gap={4} width="380px">
          <Card>
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
          </Card>

          <Card padding={4}>
            <Text variant="title">Card Prize</Text>
            <Image
              src="/assets/arts/card_test.svg"
              aria-label="Back Side Card"
            />
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
          </Card>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default FuelPage;
