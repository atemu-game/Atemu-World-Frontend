'use client';
import {
  Box,
  Divider,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CurrentPlayer from './CurrentPlayer';
import YourEntries from './YourEntries';

import Card from '@/components/Card';

import { useCountdown } from '@/hooks/useCountDown';
import DateTimeDisplay from '@/components/TimeReminder/DateTimePlay';
import { connectSocketFuel, socketFuelApi } from '@/config/socketFuelConfig';
import { FuelEvents, WinerProps } from '@/utils/constants';
import LotteryWheelTest from '@/components/LotteryWheel/test';
import QuestionIcon from '@/public/assets/icons/question.svg';
import ModalWiner from '@/components/LotteryWheel/ModalWiner';

const FuelPage = () => {
  const [isLoadingPool, setIsLoadingPool] = useState(true);
  const [listPlayer, setListPlayer] = useState([]);
  const [currentPool, setCurrentPool] = useState<any>(undefined);

  const [totalPoint, setTotalPoint] = useState(0);
  const [totalOnline, setTotalOnline] = useState(0);
  const testWiner: WinerProps = {
    cardId: '123',
    cardContract: '321321321',
    cardCollection: '321321',
    amountOfCards: 4,
    winner: {
      address: '0x123123123',
    },
  };
  const [winner, setWinner] = useState<WinerProps | undefined>(testWiner);

  const [days, hours, minutes, seconds] = useCountdown(currentPool?.endAt);

  const {
    isOpen: isOpenWinner,
    onOpen: onOpenWiner,
    onClose: onCloseWiner,
  } = useDisclosure();

  useEffect(() => {
    if (!socketFuelApi?.active) {
      connectSocketFuel();
    } else if (!currentPool && !socketFuelApi?.active) {
      connectSocketFuel();
    }
  }, [socketFuelApi, currentPool]);
  useEffect(() => {
    if (socketFuelApi && socketFuelApi.active) {
      try {
        socketFuelApi.on(FuelEvents.TOTAL_ONLINE, data => {
          setTotalOnline(() => data);
        });
        socketFuelApi.on(FuelEvents.WINNER, data => {
          console.log('Now Winer', data);
          setWinner(() => data);
        });
        socketFuelApi.on(FuelEvents.CURRENT_POOL, data => {
          setCurrentPool(() => data);
          setIsLoadingPool(false);
        });
        socketFuelApi.on(FuelEvents.CURRENT_JOINED_POOL, data => {
          setListPlayer(() => data);
        });
        socketFuelApi.on(FuelEvents.TOTAL_POINT, data => {
          setTotalPoint(() => data);
        });
      } catch (error) {
        console.log('Error Data', error);
      }
      return () => {
        socketFuelApi.off(FuelEvents.TOTAL_ONLINE);
        socketFuelApi.off(FuelEvents.TOTAL_POINT);
        socketFuelApi.off(FuelEvents.CURRENT_JOINED_POOL);
        socketFuelApi.off(FuelEvents.WINNER);
        socketFuelApi.off('disconnect');
        socketFuelApi.off('error');
      };
    }
  }, [socketFuelApi]);
  useEffect(() => {
    if (winner) {
      onOpenWiner();
    }
  }, [winner]);

  return (
    <Flex flexDirection="column" gap={4}>
      <Text variant="title">Fuel</Text>

      <Grid gridTemplateColumns={{ lg: '3fr 1fr', base: '1fr 1fr' }} gap={4}>
        <Flex flexDirection="column" gap={4} width="full">
          <Flex
            as={Card}
            gap={4}
            border="none"
            justifyContent="space-between"
            flexWrap={{ lg: 'nowrap', base: 'wrap-reverse' }}
          >
            <Box minWidth={{ lg: '325px', base: 'full' }} height="full">
              {!isLoadingPool && currentPool ? (
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
                  <Text variant="title">Current Round</Text>
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

                <Card variant="content_secondary" px={2}>
                  <HStack>
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
                  </HStack>
                </Card>
              </HStack>

              <VStack height="full">
                {!isLoadingPool && currentPool ? (
                  <>
                    {listPlayer && totalPoint ? (
                      <>
                        <LotteryWheelTest
                          dataSeries={listPlayer}
                          totalPoint={totalPoint}
                          timer={currentPool.endAt}
                        />
                        {winner && (
                          <ModalWiner
                            isOpen={isOpenWinner}
                            onClose={onCloseWiner}
                            dataWiner={winner}
                          />
                        )}
                      </>
                    ) : (
                      <Text variant="title" color="primary.100">
                        Wait For Joining
                      </Text>
                    )}
                  </>
                ) : (
                  <Spinner size="lg" />
                )}
              </VStack>
            </Box>
          </Flex>

          {!isLoadingPool && currentPool ? (
            <YourEntries currentId={currentPool.id} />
          ) : (
            <Card padding={4} minH="200px" as={VStack} justifyContent="center">
              <Spinner size="lg" />
            </Card>
          )}
        </Flex>
        <Flex flexDirection="column" gap={4} width="380px" height="100%">
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
                  <Text fontWeight="bold">{listPlayer.length}/15</Text>
                  <Text>Participants </Text>
                </Box>
                <Box>
                  <Text>0</Text>
                  <Text>Your Entries</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">20</Text>
                  <Text>Your win chances </Text>
                </Box>
              </Grid>
            </Box>
            <Divider
              border="1px solid transparent"
              style={{
                borderImageSlice: 1,
                borderImageSource: `linear-gradient(90.73deg, rgba(232, 183, 124, 0.5) -5.34%, rgba(253, 217, 105, 0.5) 51.67%, rgba(178, 113, 34, 0.5) 116.05%)
              `,
              }}
            />
            <Grid gridTemplateColumns={'repeat(2,1fr)'} gap={4} padding={4}>
              <Box flexGrow={1}>
                <Text fontWeight="bold" color="primary.100">
                  25k
                </Text>
                <Text>Prize Pool </Text>
              </Box>
              <Box flexGrow={1}>
                <Text fontWeight="bold" color="primary.100">
                  5/500
                </Text>
                <Text>Participants </Text>
              </Box>
            </Grid>
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
