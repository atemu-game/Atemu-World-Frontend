import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import LogoIcon from '@/public/logo.svg';
import StarkNetIcon from '@/public/assets/token/starknet.svg';
import ConnectWallet from '@/components/ConnectWallet';
import { useWalletContext } from '@/providers/ProviderContext';
import ProfileAccount from '@/components/Account/ProfileAccount';
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
      <HStack>
        <LogoIcon />
        <Text fontSize="24px" fontWeight={700} textTransform="uppercase">
          - the supreme card trading game
        </Text>
      </HStack>
      <HStack gap={3}>
        <Button
          variant="primary"
          sx={{
            borderColor: 'secondary.100',
          }}
        >
          Invite
        </Button>
        <Button variant="primary" rightIcon={<Icon as={StarkNetIcon} />}>
          100
        </Button>
        {address ? <ProfileAccount /> : <ConnectWallet />}
      </HStack>
    </HStack>
  );
};

export default Header;
