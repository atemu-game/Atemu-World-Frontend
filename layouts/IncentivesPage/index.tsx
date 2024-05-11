import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import CurrentPlayer from './CurrentPlayer';
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
  return (
    <Box>
      <Text variant="title">Fuel</Text>
      <CurrentPlayer listPlayer={CurentPlayerMock} />
    </Box>
  );
};

export default IncentivePage;
