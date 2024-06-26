import { Box, Button, HStack, Text, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import LogoIcon from '@/public/assets/logo/atemu_logo_long.svg';

import ConnectWallet from '@/components/ConnectWallet';

import ProfileAccount from '@/components/Account/ProfileAccount';
import PageDrawer from '../Sidebar/PageDrawer';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useAccount, useConnect } from '@starknet-react/core';
import { useDispatch } from 'react-redux';
import { AccountInterface } from 'starknet';
import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import { ACCESS_TOKEN, RPC_PROVIDER } from '@/utils/constants';
import { setUserAdress } from '@/redux/user/user-slice';
import { setCookie } from '@/utils/cookie';
const Header = () => {
  const { userAddress, prevConnector } = useAuth();
  const { connectors, connect } = useConnect();
  const {
    address: addressWallet,
    status: statusWallet,
    account,
  } = useAccount();
  const dispatch = useDispatch();
  const toast = useToast({
    position: 'top-right',
  });
  const verifySignature = async (account: AccountInterface) => {
    try {
      if (account) {
        const { data: dataSignMessage } = await axiosHandlerNoBearer.get(
          '/authentication/getNonce',
          {
            params: {
              address: addressWallet,
            },
          }
        );

        const signature = await account.signMessage(
          dataSignMessage.data.signMessage
        );

        const { data: dataToken } = await axiosHandlerNoBearer.post(
          '/authentication/token',
          {
            address: addressWallet,
            signature: signature,
            rpc: RPC_PROVIDER.TESTNET,
          }
        );
        dispatch(setUserAdress(addressWallet));
        setCookie({
          expires: '1d',
          key: ACCESS_TOKEN,
          value: dataToken.data.token,
        });
      }
    } catch (error) {
      toast({
        title: ' Rejected ',
        description: 'You Rejected the Signature Request',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const handleChangeWallet = async () => {
      if (
        addressWallet &&
        addressWallet !== userAddress &&
        prevConnector != null &&
        account
      ) {
        await verifySignature(account);
      } else if (
        addressWallet &&
        account &&
        account.address !== addressWallet &&
        userAddress != null
      ) {
        await verifySignature(account);
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
    </HStack>
  );
};

export default Header;
