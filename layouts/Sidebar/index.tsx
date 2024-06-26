import { Box } from '@chakra-ui/react';
import React from 'react';
import ListPage from './ListPage';

const Sidebar = () => {
  return (
    <Box
      flexDir="column"
      gap={6}
      padding={6}
      borderRight="1px solid"
      minH="100vh"
      borderRightColor="divider.100"
      display={{ base: 'none', md: 'flex' }}
    >
      <Box
        position="sticky"
        top={100}
        left={0}
        flexDir="column"
        gap={6}
        display="flex"
      >
        <ListPage />
      </Box>
    </Box>
  );
};

export default Sidebar;
