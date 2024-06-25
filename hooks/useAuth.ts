'use client';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { useTypedSelector } from './useTypedSelector';
import { deleteCookie, setCookie } from '@/utils/cookie';
import { ACCESS_TOKEN } from '@/utils/constants';
import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import { useDispatch } from 'react-redux';
import {
  logout,
  setConnector,
  setUserAdress,
  setUserLoading,
} from '@/redux/user/user-slice';

import { AccountInterface } from 'starknet';
import { useToast } from '@chakra-ui/react';
import { resetCreator } from '@/redux/creatorAccount/creator-slice';
import systemConfig from '@/config/systemConfig';

export const useAuth = () => {
  const user = useTypedSelector(state => state.user);
  const { address: addressWallet, account } = useAccount();
  const { connect, connectors } = useConnect();
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();
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
            rpc: systemConfig().RPC,
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
  const connectWallet = async (index: number) => {
    await connect({ connector: connectors[index] });
    dispatch(setConnector(index));

    if (
      account &&
      account.address != user.userAddress &&
      addressWallet != user.userAddress
    ) {
      await verifySignature(account);
    }
  };

  const disconnectWallet = () => {
    dispatch(setUserLoading(true));
    disconnect();
    dispatch(logout());
    deleteCookie(ACCESS_TOKEN);
    dispatch(resetCreator());
    dispatch(setUserLoading(false));
  };

  return { ...user, disconnectWallet, connectWallet };
};
