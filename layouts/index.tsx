'use client';
import { Box, Container, Flex } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import Header from './Header';

import Sidebar from './Sidebar';
import NextTopLoader from 'nextjs-toploader';
import { colors } from '@/themes';
import Scrollbar from '@/components/Scrollbar';
const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextTopLoader color={colors.primary[100]} showSpinner={false} />
      <Scrollbar height="100vh">
        <Flex
          width="full"
          flexDirection="column"
          background={`url('./assets/arts/bg/bg_body.svg')`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        >
          <Header />
          <Flex width="full" position="sticky" flexGrow={1}>
            {/* <Sidebar /> */}
            <Box flexGrow={1} width="full" as="main" padding={4}>
              {children}
            </Box>
          </Flex>
        </Flex>
      </Scrollbar>
    </>
  );
};

export default DefaultLayout;
