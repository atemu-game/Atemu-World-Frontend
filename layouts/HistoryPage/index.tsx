'use client';
import Card from '@/components/Card';
import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import Pagination from '@/components/Pagination/Pagination';
import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import { useAuth } from '@/hooks/useAuth';
import { ellipseMiddle } from '@/utils/formatAddress';
import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ModalClaimFuel from './ModalClaimFuel';

const HistoryPage = () => {
  const { userAddress } = useAuth();
  const page = useSearchParams().get('page'); // Use page from the URL

  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: `history-${userAddress}`,
    queryFn: async () => {
      const { data } = await axiosHandlerNoBearer.post(
        '/fuel/winning-history',
        {
          page: currentPage,
          size: 10,
          user: userAddress,
        }
      );
      return data.data;
    },
  });
  const ListHeaderData = [
    'Pool ID',
    'End At',
    'Winner',
    'Status',
    'Amount of Cards',
    'Card Collection',
    'Card ID',
  ];
  useEffect(() => {
    refetch();
  }, [currentPage]);
  return (
    <Box>
      <Text variant="title">Your History Fuel</Text>
      <Card
        mt={4}
        padding={6}
        minH={400}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <TableContainer>
          <Table variant="leaderboard" colorScheme="teal">
            <Thead>
              <Tr>
                {ListHeaderData.map((header, index) => (
                  <Th key={`${index}-header-board`} fontWeight="bold">
                    {header}
                  </Th>
                ))}
                {userAddress && <Th fontWeight="bold"> Action</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {!isLoading && data ? (
                <>
                  {data.items.map((item: any, index: number) => (
                    <Tr key={`leaderboard-${index}`}>
                      <Td>{item.id}</Td>
                      <Td>{new Date(item.endAt).toUTCString()}</Td>
                      <Td fontWeight="bold">
                        <HStack>
                          <Text color="primary.100">
                            {ellipseMiddle(item.winner.address, 6, 6)}
                          </Text>
                          <CopyClipBoard
                            context={item.winner.address}
                            color="primary.100"
                            aria-label="Copy Clipboard"
                            h={4}
                            w={4}
                            _hover={{
                              color: 'white',
                            }}
                          />
                        </HStack>
                      </Td>
                      <Td>
                        {item.isCanceled ? (
                          'isCanceled'
                        ) : (
                          <>{item.isClaimed ? 'Claimed' : 'Unclaimed'}</>
                        )}
                      </Td>
                      <Td>{item.amountOfCards}</Td>
                      <Td>
                        {ellipseMiddle(item.cardCollection.nftContract, 6, 6)}
                      </Td>
                      <Td>{item.cardId}</Td>
                      <Td>
                        {item.winner.address == userAddress &&
                        !item.isClaimed ? (
                          <ModalClaimFuel dataClaim={item} />
                        ) : (
                          <Text></Text>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </>
              ) : null}
            </Tbody>
          </Table>
        </TableContainer>
        {data && data.pages > 1 && (
          <Pagination
            totalPages={data.pages}
            currentPage={currentPage}
            onPageChange={value => setCurrentPage(value)}
          />
        )}
      </Card>
    </Box>
  );
};

export default HistoryPage;
