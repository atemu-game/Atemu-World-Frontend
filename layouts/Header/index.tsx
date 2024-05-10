import { Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import LogoIcon from '@/public/logo.svg';
const Header = () => {
  return (
    <HStack justifyContent="space-between" as="header" padding={5}>
      <HStack>
        <LogoIcon />
        <Text fontSize="24px" fontWeight={700} textTransform="uppercase">
          - the supreme card trading game
        </Text>
      </HStack>
      <HStack>
        <Button>Invite</Button>
        <Button>Connect</Button>
      </HStack>
    </HStack>
  );
};

export default Header;
