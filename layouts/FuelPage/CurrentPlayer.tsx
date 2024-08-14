import { Box, HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { colors } from '@/themes';
import { ellipseMiddle } from '@/utils/formatAddress';
import EyeIcon from '@/public/assets/icons/eye.svg';
import Card from '@/components/Card';
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

      {listPlayer.length > 0 ? (
        <>
          {listPlayer.map((player: any, index: number) => (
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
                        {Number(
                          (player.stakedAmount / totalPoint) * 100
                        ).toFixed(2)}
                        %
                      </Text>
                    )}
                  </HStack>
                  <HStack justifyContent="space-between">
                    {/* <Text fontSize="sm">{player.stakedAmount}</Text> */}
                    <Text fontSize="sm" color="white">
                      {player.stakedAmount} Points
                    </Text>
                  </HStack>
                </Box>
              </HStack>
            </HStack>
          ))}
        </>
      ) : (
        <Card mt={6} p={4}>
          <VStack
            py={10}
            gap={0}
            style={{
              border: '2px solid transparent',
              borderImageSlice: 2,
              borderImageSource:
                'linear-gradient(90.73deg, rgba(232, 183, 124, 0.5) -5.34%, rgba(253, 217, 105, 0.5) 51.67%, rgba(178, 113, 34, 0.5) 116.05%)',
            }}
          >
            <Text variant="title" lineHeight="normal" mb={0}>
              Waiting
            </Text>
            <Text textAlign="center">Min 3 users to start</Text>
          </VStack>
        </Card>
      )}
    </Box>
  );
};

export default CurrentPlayer;
