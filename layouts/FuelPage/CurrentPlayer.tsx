import { Box, HStack, Icon, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

import { colors } from '@/themes';
import { ellipseMiddle } from '@/utils/formatAddress';
import EyeIcon from '@/public/assets/icons/eye.svg';
interface IProps {
  listPlayer: any;
  watching: number;
  currentPool?: any;
}
const CurrentPlayer = ({ listPlayer, watching, currentPool }: IProps) => {
  return (
    <Box padding={4}>
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
            <HStack>
              <Skeleton>
                <Box w="52px" h="52px"></Box>
              </Skeleton>
              <Box>
                <Text fontWeight={700}>
                  {ellipseMiddle(player.user.address, 10, 4)}
                </Text>
                <Text>{player.stakedAmount}</Text>
              </Box>
            </HStack>

            <Box textAlign="right">
              <Text fontWeight={700}> %</Text>
              <Text>k Points</Text>
            </Box>
          </HStack>
        ))}
    </Box>
  );
};

export default CurrentPlayer;
