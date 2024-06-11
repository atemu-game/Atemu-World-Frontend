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

  const connectWallet = async (index: number) => {
    await connect({ connector: connectors[index] });
    dispatch(setConnector(index));
    if (addressWallet && account) {
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
  };
  const disconnectWallet = async () => {
    dispatch(setUserLoading(true));
    await dispatch(logout());
    await disconnect();
    deleteCookie(ACCESS_TOKEN);
    dispatch(setUserLoading(false));
  };
  useEffect(() => {
    const handleChangeWallet = async () => {
      if (
        addressWallet &&
        addressWallet !== user.userAddress &&
        user.prevConnector != undefined
      ) {
        await connectWallet(user.prevConnector);
      } else if (addressWallet && account && user.userAddress == undefined) {
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
    };
    handleChangeWallet();
  }, [addressWallet]);
  useEffect(() => {
    const handleReConenct = async () => {
      if (
        user.userAddress &&
        statusWallet === 'disconnected' &&
        user.prevConnector != undefined
      ) {
        await connect({ connector: connectors[user.prevConnector] });
      }
    };
    handleReConenct();
  }, [user.userAddress, user.prevConnector]);
  return { ...user, disconnectWallet, connectWallet };
};
