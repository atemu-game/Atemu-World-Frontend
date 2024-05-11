import { Box, Button, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import LogoIcon from '@/public/logo.svg';
import StarkNetIcon from '@/public/assets/token/starknet.svg';
import ConnectWallet from '@/components/ConnectWallet';
import { useWalletContext } from '@/providers/ProviderContext';
import ProfileAccount from '@/components/Account/ProfileAccount';
import PageDrawer from '../Sidebar/PageDrawer';
const Header = () => {
  const { address } = useWalletContext();
  return (
    <HStack
      justifyContent="space-between"
      as="header"
      padding={5}
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
        <LogoIcon />
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
        <Button
          variant="primary"
          rightIcon={<Icon as={StarkNetIcon} />}
          display={{
            base: 'none',
            md: 'inline-flex',
          }}
        >
          100
        </Button>
        {address ? <ProfileAccount /> : <ConnectWallet />}
      </HStack>
    </HStack>
  );
};

export default Header;
