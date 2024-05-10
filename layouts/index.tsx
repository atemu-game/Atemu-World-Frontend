'use client';
import { Container, Flex } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import Header from './Header';

import Sidebar from './Sidebar';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Flex width="full" flexDirection="column">
        <Header />

        <Container
          px={{
            base: 3,
            md: 4,
          }}
          maxWidth="container.2xl"
          w="full"
          display="flex"
          as="article"
          flexDirection="column"
          overflow="clip"
        >
          <Sidebar />
          <Flex as="main">{children}</Flex>
        </Container>
      </Flex>
    </>
  );
};

export default DefaultLayout;
