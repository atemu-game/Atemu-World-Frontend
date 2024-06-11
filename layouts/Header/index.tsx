import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import LogoIcon from '@/public/assets/logo/atemu_logo_long.svg';

import ConnectWallet from '@/components/ConnectWallet';

import ProfileAccount from '@/components/Account/ProfileAccount';
import PageDrawer from '../Sidebar/PageDrawer';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
const Header = () => {
  const { userAddress } = useAuth();
  return (
    <HStack
      justifyContent="space-between"
      as="header"
      padding={5}
      position="sticky"
      top={0}
      zIndex={99}
      background="body"
      borderBottom="1px solid"
      borderBottomColor="divider.100"
    >
      <Box
        display={{
          base: 'block',
          md: 'none',
        }}
      >
        <PageDrawer />
      </Box>

      <HStack
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <Link href="/">
          <LogoIcon />
        </Link>

        <Text
          fontSize="24px"
          fontWeight={700}
          textTransform="uppercase"
          color="
        white"
        >
          - the supreme card trading game
        </Text>
      </HStack>
      <HStack gap={3}>
        <Link href="https://demo.atemu.xyz/" target="_blank">
          <Button
            variant="primary"
            display={{
              base: 'none',
              md: 'inline-flex',
            }}
          >
            Demo
          </Button>
        </Link>

        {userAddress ? (
          <>
            <Button
              variant="primary"
              sx={{
                borderColor: 'secondary.100',
              }}
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
            >
              Invite
            </Button>
            <ProfileAccount />
          </>
        ) : (
          <ConnectWallet />
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
