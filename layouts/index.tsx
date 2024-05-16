'use client';
import { Box, Flex } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import Header from './Header';

import Sidebar from './Sidebar';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
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
