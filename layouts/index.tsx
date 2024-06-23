'use client';
import { Box, Flex } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import Header from './Header';

import Sidebar from './Sidebar';
import NextTopLoader from 'nextjs-toploader';
import { colors } from '@/themes';
const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextTopLoader color={colors.primary[100]} showSpinner={false} />
      <Flex width="full" flexDirection="column">
        <Header />

        <Flex width="full" position="sticky">
          <Sidebar />
          <Box padding={4} flex={1} width="full" as="main">
            {children}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default DefaultLayout;
