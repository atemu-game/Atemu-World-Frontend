'use client';
import Card from '@/components/Card';
import TimeReminder from '@/components/TimeReminder';
import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import { useAuth } from '@/hooks/useAuth';
import {
  Box,
  Flex,
  Grid,
  HStack,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

const LeaderPage = () => {
  const { userAddress } = useAuth();
  const {
    data: dataLeaderboard,
    refetch: refetchDataLeaderboard,
    isLoading: isLoadingLeaderBoard,
  } = useQuery({
    queryKey: 'leaderboard',
    queryFn: async () => {
      const { data }: any = await axiosHandlerNoBearer.get(
        '/leaderboard/topPoints'
      );
      return data.data;
    },
  });
  const { data: dataUser, refetch: refetchTopByOwner } = useQuery({
    queryKey: 'userTopLeaderboard',
    queryFn: async () => {
      if (userAddress) {
        const data = await axiosHandlerNoBearer.get(
          `/leaderboard/topPoints/${userAddress}`
        );
        return data.data;
      }
      return;
    },
  });
  useEffect(() => {
    if (userAddress) {
      refetchTopByOwner();
    }
  }, [userAddress]);
  const ListHeader = ['Rank', 'Address', 'Points', 'Last Update'];
  return (
    <Flex flexDirection="column">
      <Text variant="title">Leaderboard</Text>
      <Card as={VStack} py={6}>
        <Text>Season 1</Text>
        <Text
          fontSize="24px"
          fontWeight="bold"
          color="secondary.400"
          textTransform="uppercase"
        >
          Rise of the ash
        </Text>
        <HStack>
          <Text>Time remaining:</Text>
          <TimeReminder
            targetDate={new Date(
              new Date().getTime() + 3 * 24 * 60 * 60 * 1000
            ).getTime()}
          />
        </HStack>
      </Card>
      <Card mt={6}>
        <Grid
          gridTemplateColumns="repeat(4,1fr)"
          py={4}
          px={8}
          gap={6}
          bg="primary.100"
          border="1px solid"
          borderColor="primary.200"
          color="primary.300"
          fontSize="lg"
          fontWeight="bold"
        >
          {ListHeader.map((header, index) => (
            <Text key={`leadboard-${index}`}>{header}</Text>
          ))}
        </Grid>

        <Grid gridTemplateColumns="repeat(4,1fr)" py={4} px={8} gap={6}>
          {!isLoadingLeaderBoard ? (
            <>
              {dataLeaderboard.items.map((item: any, index: number) => (
                <React.Fragment key={`leaderboard-${index}`}>
                  <Text>{index + 1}</Text>
                  <Text>{item.address}</Text>
                  <Text>{item.points}</Text>
                  <Text>{item.updatedAt}</Text>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <React.Fragment key={`skeleton-${index}`}>
                  <Skeleton>Loading Rank</Skeleton>
                  <Skeleton>Loading Rank</Skeleton>
                  <Skeleton>Loading Rank</Skeleton>
                  <Skeleton>Loading Rank</Skeleton>
                </React.Fragment>
              ))}
            </>
          )}
        </Grid>
      </Card>
    </Flex>
  );
};

export default LeaderPage;
