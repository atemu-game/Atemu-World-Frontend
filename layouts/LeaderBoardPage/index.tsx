'use client';
import Card from '@/components/Card';
import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import TimeReminder from '@/components/TimeReminder';
import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import { useAuth } from '@/hooks/useAuth';
import { formatDateData } from '@/utils/date';
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
      <Card
        as={VStack}
        py={6}
        variant="content_secondary"
        backgroundImage={`url('/assets/arts/bg_leaderboard.svg')`}
        bg={`linear-gradient(90deg, rgba(255, 150, 52, 0.15) -15.67%, rgba(255, 80, 80, 0.15) 118.84%)`}
        bgPosition="center"
        bgRepeat="no-repeat"
        boxShadow={`0px 4px 16px 0px #FF963440 inset,0px -4px 16px 0px #EF468340 inset,4px 0px 16px 0px #FF963426 inset,-4px 0px 16px 0px #EF468326 inset`}
        style={{
          borderImageSource: `linear-gradient(90deg, rgba(255, 150, 52, 0.5) -15.67%, rgba(255, 80, 80, 0.5) 118.84%)`,
        }}
        bgSize="cover"
      >
        <Text>Season 1</Text>
        <Text
          fontSize="36px"
          lineHeight="normal"
          variant="gradient_text"
          bg="linear-gradient(90deg, #FF9634 -15.67%, #FF5050 118.84%)"
          textTransform="uppercase"
          fontWeight="bold"
        >
          Rise from the ash
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
                      <Td as={HStack}>
                        <Text color="primary.100">{item.address}</Text>

                        <CopyClipBoard
                          context={item.address}
                          color="primary.100"
                          aria-label="Copy Clipboard"
                        />
                      </Td>
                      <Td>{item.points}</Td>
                      <Td>{formatDateData(new Date(item.updatedAt))}</Td>
                    </Tr>
                  ))}
                </>
              ) : (
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Tr key={`leaderboard-${index}`}>
                      <Td>
                        <Skeleton>Rank</Skeleton>
                      </Td>

                      <Td>
                        <Skeleton>
                          0x05a2f4c3bcbe542d6a655fb31eca2914f884dd8a1c23ea0b1b210746c28cfa3a
                        </Skeleton>
                      </Td>

                      <Td>
                        <Skeleton>3070</Skeleton>
                      </Td>

                      <Td>
                        <Skeleton>July 13, 2024 at 04:49 AM</Skeleton>
                      </Td>
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
