import { Box, HStack, Icon, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

import { colors } from '@/themes';
import { ellipseMiddle } from '@/utils/formatAddress';
import EyeIcon from '@/public/assets/icons/eye.svg';
interface IProps {
  listPlayer: any;
  watching: number;
  totalPoint?: number;
}
const CurrentPlayer = ({ listPlayer, watching, totalPoint }: IProps) => {
  return (
    <Box padding={4} minH="500px">
      <HStack justifyContent="space-between">
        <Text variant="sub_title">{listPlayer.length} players</Text>

        {watching && (
          <HStack color="secondary.400">
            <Text>{watching} Watching</Text>
            <Icon as={EyeIcon} w={4} h={4} />
          </HStack>
        )}
      </HStack>

      {listPlayer.length &&
        listPlayer.map((player: any, index: number) => (
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
            <HStack width="full">
              <Skeleton>
                <Box w="52px" h="52px"></Box>
              </Skeleton>
              <Box flexGrow={1}>
                <HStack justifyContent="space-between">
                  <Text fontWeight={700} fontSize="sm">
                    {ellipseMiddle(player.user.address, 10, 4)}
                  </Text>
                  {totalPoint && (
                    <Text fontWeight={700}>
                      {Number((player.stakedAmount / totalPoint) * 100).toFixed(
                        2
                      )}
                      %
                    </Text>
                  )}
                </HStack>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm">{player.stakedAmount}</Text>
                  <Text fontSize="sm">{totalPoint} Points</Text>
                </HStack>
              </Box>
            </HStack>
          </HStack>
        ))}
    </Box>
  );
};

export default CurrentPlayer;
