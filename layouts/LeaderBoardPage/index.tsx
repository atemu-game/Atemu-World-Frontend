'use client';
import Card from '@/components/Card';
import TimeReminder from '@/components/TimeReminder';
import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import { useAuth } from '@/hooks/useAuth';
import {
  Flex,
  Grid,
  HStack,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
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
        <TableContainer>
          <Table variant="leaderboard" colorScheme="teal">
            <Thead>
              <Tr>
                {ListHeader.map((header, index) => (
                  <Th key={`${index}-header-board`}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {!isLoadingLeaderBoard ? (
                <>
                  {dataLeaderboard.items.map((item: any, index: number) => (
                    <Tr key={`leaderboard-${index}`}>
                      <Td>{index + 1}</Td>
                      <Td>{item.address}</Td>
                      <Td>{item.points}</Td>
                      <Td>{item.updatedAt}</Td>
                    </Tr>
                  ))}
                </>
              ) : (
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Tr key={`leaderboard-${index}`}>
                      <Td>Rank</Td>
                      <Td>
                        0x018bd03138fa59a84bbcae32efa4b80726b242897e4378fdb016f66333c3aeb4
                      </Td>
                      <Td>100</Td>
                      <Td>100000</Td>
                    </Tr>
                  ))}
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Flex>
  );
};

export default LeaderPage;
