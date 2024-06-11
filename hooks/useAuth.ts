'use client';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { useTypedSelector } from './useTypedSelector';
import { deleteCookie, setCookie } from '@/utils/cookie';
import { ACCESS_TOKEN, RPC_PROVIDER } from '@/utils/constants';
import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import { useDispatch } from 'react-redux';
import {
  logout,
  setConnector,
  setUserAdress,
  setUserLoading,
} from '@/redux/user/user-slice';
import { useEffect } from 'react';
import { AccountInterface } from 'starknet';

export const useAuth = () => {
  const user = useTypedSelector(state => state.user);
  const {
    address: addressWallet,
    status: statusWallet,
    account,
  } = useAccount();
  const { connect, connectors } = useConnect();
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();
  const verifySignature = async (account: AccountInterface) => {
    try {
      if (account) {
        const { data: dataSignMessage } = await axiosHandlerNoBearer.get(
          '/authentication/get-nonce',
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
      console.log('What The Fuck Error', error);
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
      console.log('RUn 1 End');
    }
  };

  const disconnectWallet = () => {
    dispatch(setUserLoading(true));
    disconnect();
    dispatch(logout());
    deleteCookie(ACCESS_TOKEN);
    dispatch(setUserLoading(false));
  };

  // useEffect(() => {
  //   const handleChangeWallet = async () => {
  //     if (
  //       addressWallet &&
  //       addressWallet !== user.userAddress &&
  //       user.prevConnector != null &&
  //       account
  //     ) {
  //       console.log('RUn 2 Start');
  //       await verifySignature(account);
  //       console.log('RUn 2 End');
  //       // await account;
  //     } else if (
  //       addressWallet &&
  //       account &&
  //       account.address !== user.userAddress &&
  //       user.userAddress != null
  //     ) {
  //       await verifySignature(account);
  //     }
  //   };
  //   handleChangeWallet();
  // }, [addressWallet]);
  // useEffect(() => {
  //   const handleReConenct = async () => {
  //     if (
  //       user.userAddress != null &&
  //       statusWallet === 'disconnected' &&
  //       user.prevConnector != null
  //     ) {
  //       await connect({ connector: connectors[user.prevConnector] });
  //     }
  //   };
  //   handleReConenct();
  // }, [user.userAddress, user.prevConnector]);
  return { ...user, disconnectWallet, connectWallet };
};
