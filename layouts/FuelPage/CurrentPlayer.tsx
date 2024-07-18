import { Box, HStack, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { PlayerProps } from '.';
import { colors } from '@/themes';
import { ellipseMiddle } from '@/utils/formatAddress';

interface IProps {
  listPlayer: PlayerProps[];
}
const CurrentPlayer = ({ listPlayer }: IProps) => {
  return (
    <Box padding={4}>
      <Text variant="sub_title">{listPlayer.length} players</Text>
      {listPlayer.map((player, index: number) => (
        <HStack
          key={index}
          p={4}
          mt={4}
          justifyContent="space-between"
          borderRight="4px solid"
          borderRightColor={`${
            colors.secondary[(index * 100) as keyof typeof colors.secondary]
          }`}
        >
          <HStack>
            <Skeleton>
              <Box w="52px" h="52px"></Box>
            </Skeleton>
            <Box>
              <Text fontWeight={700}>
                {ellipseMiddle(player.address, 5, 5)}
              </Text>
              <Text>{player.pointTotal}</Text>
            </Box>
          </HStack>

          <Box textAlign="right">
            <Text fontWeight={700}>{player.percentage} %</Text>
            <Text>{player.pointEntry / 1000}k Points</Text>
          </Box>
        </HStack>
      ))}
    </Box>
  );
};

export default CurrentPlayer;
