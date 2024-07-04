import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import LogoIcon from '@/public/assets/logo/atemu_logo_long.svg';

import ConnectWallet from '@/components/ConnectWallet';

import ProfileAccount from '@/components/Account/ProfileAccount';
import PageDrawer from '../Sidebar/PageDrawer';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useAccount, useConnect } from '@starknet-react/core';
import { useDispatch } from 'react-redux';

import { setUserLoading } from '@/redux/user/user-slice';

import { useCreatorAccount } from '@/hooks/useCreatorAccount';

import LoadingConnectWallet from '@/components/Animation/LoadingConnectWallet';

const Header = () => {
  const { userAddress, prevConnector, isLoading, verifySignature } = useAuth();
  const { connectors, connect } = useConnect();
  const { handleClearEventLog } = useCreatorAccount();
  const {
    address: addressWallet,
    status: statusWallet,
    account,
  } = useAccount();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleChangeWallet = async () => {
      if (
        addressWallet &&
        addressWallet !== userAddress &&
        prevConnector != null &&
        account
      ) {
        dispatch(setUserLoading(true));
        handleClearEventLog();
        await verifySignature(account);
        dispatch(setUserLoading(false));
      } else if (
        addressWallet &&
        account &&
        account.address !== addressWallet &&
        userAddress != null
      ) {
        dispatch(setUserLoading(true));
        handleClearEventLog();
        await verifySignature(account);
        dispatch(setUserLoading(false));
      }
    };
    handleChangeWallet();
  }, [addressWallet]);

  useEffect(() => {
    const handleReConenct = async () => {
      if (
        userAddress != null &&
        statusWallet === 'disconnected' &&
        prevConnector != null
      ) {
        await connect({ connector: connectors[prevConnector] });
      }
    };
    handleReConenct();
  }, [userAddress, prevConnector]);

  return (
    <HStack
      justifyContent="space-between"
      as="header"
      padding={5}
      position="sticky"
      top={0}
      zIndex={99}
      background="body"
      backgroundImage={`url('./assets/arts/banner.svg')`}
      borderBottom="1px solid"
      borderBottomColor="primary.100"
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
          fontWeight={600}
          textTransform="uppercase"
          variant="gradient_text"
          dropShadow={`0px 4px 16px 0px #1E1E1EBF`}
        >
          - the supreme card trading game
        </Text>
      </HStack>

      <HStack gap={3}>
        {userAddress ? (
          <>
            {/* <Button
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
            </Button> */}
            <ProfileAccount />
          </>
        ) : (
          <ConnectWallet />
        )}
      </HStack>
      <LoadingConnectWallet isOpen={isLoading} />
    </HStack>
  );
};

export default Header;
