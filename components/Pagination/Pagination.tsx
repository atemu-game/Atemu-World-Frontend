import React from 'react';
import {
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import usePagination from '@/hooks/usePagination';
import { useRouter, useSearchParams } from 'next/navigation';
import BackIcon from '@/public/assets/icons/left.svg';
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const { data, onClickPage } = usePagination({
    currentPage: currentPage,
    setCurrentPage: onPageChange,
    amount: totalPages,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };
  const renderPageNumbers = () => {
    const pageNumbers: any[] = [];

    data.map((item, index) => {
      return (
        <>
          {typeof item === 'string' ? (
            <>
              {pageNumbers.push(
                <Button
                  isDisabled={true}
                  key={index}
                  bg="primary.100"
                  color="white"
                >
                  {item}
                </Button>
              )}
            </>
          ) : (
            <>
              {pageNumbers.push(
                <Button
                  key={index}
                  onClick={() => {
                    onClickPage(item);
                    handlePageChange(item);
                  }}
                  bg={currentPage == item ? 'primary.100' : 'gray.300'}
                  color={currentPage == item ? 'white' : 'black'}
                >
                  {item}
                </Button>
              )}
            </>
          )}
        </>
      );
    });

    return pageNumbers;
  };

  return (
    <HStack spacing={4} mt={4}>
      <IconButton
        icon={<Icon as={BackIcon} />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        variant="icon_primary"
        aria-label="Previous btn"
      />

      <ButtonGroup isAttached>{renderPageNumbers()}</ButtonGroup>

      <IconButton
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        variant="icon_primary"
        icon={<Icon as={BackIcon} transform="rotate(180deg)" />}
        aria-label="Next btn"
      />
    </HStack>
  );
};

export default Pagination;
