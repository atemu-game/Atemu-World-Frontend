import { Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import LogoIcon from '@/public/logo.svg';
const Header = () => {
  return (
    <HStack
      justifyContent="space-between"
      as="header"
      padding={5}
      borderBottom="1px solid"
      borderBottomColor="divider.100"
    >
      <HStack>
        <LogoIcon />
        <Text fontSize="24px" fontWeight={700} textTransform="uppercase">
          - the supreme card trading game
        </Text>
      </HStack>
      <HStack>
        <Button
          variant="primary"
          sx={{
            borderColor: 'secondary.100',
          }}
        >
          Invite
        </Button>
        <Button variant="primary">Connect</Button>
      </HStack>
    </HStack>
  );
};

export default Header;
