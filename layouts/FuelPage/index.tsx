'use client';
import {
  Box,
  Divider,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CurrentPlayer from './CurrentPlayer';
import YourEntries from './YourEntries';

import Card from '@/components/Card';

import { useCountdown } from '@/hooks/useCountDown';
import DateTimeDisplay from '@/components/TimeReminder/DateTimePlay';

import QuestionIcon from '@/public/assets/icons/question.svg';
import ModalWiner from '@/components/LotteryWheel/ModalWiner';
import LotteryWheel from '@/components/LotteryWheel';
import { useSelector } from 'react-redux';
import { TypeRootState } from '@/redux/store';
import { useAuth } from '@/hooks/useAuth';

const FuelPage = () => {
  const {
    totalOnline,
    winner,
    currentPool,
    listPlayer,
    totalPoint,
    isLoadingPool,
  } = useSelector((state: TypeRootState) => state.socketFuel);
  const [days, hours, minutes, seconds] = useCountdown(currentPool?.endAt);
  const { userAddress } = useAuth();
  const {
    isOpen: isOpenWinner,
    onOpen: onOpenWiner,
    onClose: onCloseWiner,
  } = useDisclosure();
  useEffect(() => {
    if (winner) {
      console.log('WHat problem', winner);
      onOpenWiner();
    }
  }, [winner]);

  return (
    <Flex flexDirection="column" gap={4}>
      <Text variant="title">Fuel</Text>

      <Grid
        gridTemplateColumns={{
          lg: '3fr 1fr',
          base: '1fr ',
        }}
        gap={4}
      >
        <Flex flexDirection="column" gap={4} width="full">
          <Flex
            as={Card}
            rowGap={4}
            border="none"
            justifyContent="space-between"
            flexWrap={{ lg: 'nowrap', base: 'wrap-reverse' }}
          >
            <Box minWidth={{ lg: '325px', base: 'full' }}>
              {!isLoadingPool &&
              currentPool &&
              totalOnline &&
              totalPoint != undefined ? (
                <CurrentPlayer
                  listPlayer={listPlayer}
                  watching={totalOnline}
                  totalPoint={totalPoint}
                />
              ) : (
                <VStack minH="500px" justifyContent="center">
                  <Spinner size="lg" />
                </VStack>
              )}
            </Box>

            <Box
              padding={4}
              width="full"
              borderLeft="2px solid transparent"
              style={{
                borderImageSlice: 2,
                borderImageSource: ` linear-gradient(90.73deg, rgba(232, 183, 124, 0.15) -5.34%, rgba(253, 217, 105, 0.15) 51.67%, rgba(178, 113, 34, 0.15) 116.05%)`,
              }}
              backgroundImage={`url('/assets/arts/bg/bg_whale.svg')`}
              bgRepeat="no-repeat"
              backgroundPosition="center"
              backgroundSize="cover"
            >
              <HStack justifyContent="space-between">
                <HStack>
                  <Text
                    color="primary.100"
                    fontWeight={700}
                    textTransform="uppercase"
                  >
                    Current Round
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Round will start when there are at least 3 participants."
                    bg="primary.100"
                    color="black"
                    fontWeight="bold"
                  >
                    <VStack>
                      <Icon
                        as={QuestionIcon}
                        cursor="pointer"
                        color="primary.100"
                        h={6}
                        w={6}
                      />
                    </VStack>
                  </Tooltip>
                </HStack>

                <Card variant="content_secondary" px={2} boxShadow="none">
                  <HStack>
                    {!isLoadingPool && currentPool ? (
                      <>
                        {new Date(currentPool?.endAt).getTime() >
                        new Date().getTime() ? (
                          <>
                            <DateTimeDisplay
                              value={minutes}
                              type={'M'}
                              style={{
                                fontWeight: 'bold',
                                bg: 'secondary.400',
                              }}
                            />
                            <p>:</p>
                            <DateTimeDisplay
                              value={seconds}
                              type={'S'}
                              style={{
                                fontWeight: 'bold',
                                bg: 'secondary.400',
                              }}
                            />
                          </>
                        ) : (
                          <Text>Time Out</Text>
                        )}
                      </>
                    ) : (
                      <React.Fragment>
                        <Skeleton>
                          <Text>00:M</Text>
                        </Skeleton>
                        <Skeleton>
                          <Text>00:S</Text>
                        </Skeleton>
                      </React.Fragment>
                    )}
                  </HStack>
                </Card>
              </HStack>

              <VStack height="full">
                {!isLoadingPool && currentPool && totalPoint != undefined ? (
                  <>
                    {new Date(currentPool?.endAt).getTime() <
                      new Date().getTime() &&
                    listPlayer &&
                    listPlayer.length < 3 ? (
                      <Text fontWeight="bold" fontSize="lg" color="primary.100">
                        Waiting to create new pool onchain
                      </Text>
                    ) : (
                      <LotteryWheel
                        dataSeries={listPlayer}
                        totalPoint={totalPoint}
                        endAt={currentPool.endAt}
                        winner={winner}
                      />
                    )}
                  </>
                ) : (
                  <Spinner size="lg" />
                )}
              </VStack>
            </Box>
          </Flex>

          <ModalWiner
            isOpen={isOpenWinner}
            onClose={onCloseWiner}
            dataWiner={winner}
            currentPool={currentPool}
          />

          {!isLoadingPool && currentPool && currentPool.address ? (
            <YourEntries currentId={currentPool.id} />
          ) : (
            <Card padding={4} minH="200px" as={VStack} justifyContent="center">
              <Spinner size="lg" />
            </Card>
          )}
        </Flex>
        <Flex
          flexDirection="column"
          gap={4}
          width={{ md: '380px', base: 'full' }}
        >
          <Card>
            <Box padding={4}>
              <Text mb={5} variant="sub_title">
                Round: {currentPool && currentPool.id}
              </Text>
              <Grid gridTemplateColumns={'repeat(2,1fr)'} gap={4}>
                <Box>
                  <Text fontWeight="bold">{totalPoint}</Text>
                  <Text>Prize Pool </Text>
                </Box>
                <Box>
                  {listPlayer && (
                    <Text fontWeight="bold">{listPlayer.length}</Text>
                  )}
                  <Text>Participants </Text>
                </Box>
                <Box>
                  {listPlayer &&
                  listPlayer.length > 0 &&
                  listPlayer?.filter(item => item.user.address === userAddress)
                    .length ? (
                    <Text>
                      {
                        listPlayer?.filter(
                          item => item.user.address === userAddress
                        )[0].stakedAmount
                      }
                      points
                    </Text>
                  ) : (
                    <Skeleton>
                      <Text>0</Text>
                    </Skeleton>
                  )}

                  <Text>Your Entries</Text>
                </Box>
                <Box>
                  {listPlayer &&
                  listPlayer.length > 0 &&
                  totalPoint &&
                  listPlayer?.filter(item => item.user.address === userAddress)
                    .length ? (
                    <Text fontWeight="bold">
                      {Number(
                        (listPlayer.filter(
                          item => item.user.address === userAddress
                        )[0].stakedAmount /
                          totalPoint) *
                          100
                      ).toFixed(2)}
                      %
                    </Text>
                  ) : (
                    <Skeleton>
                      <Text>0%</Text>
                    </Skeleton>
                  )}

                  <Text>Your win chances </Text>
                </Box>
              </Grid>
            </Box>
          </Card>

          <Card padding={4} flexGrow={1}>
            <Text variant="title">Card Prize</Text>
            <Image
              src="/assets/arts/card/card_test.svg"
              aria-label="Back Side Card"
            />
          </Card>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default FuelPage;
