'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { UserWalletProps } from '@/layouts/ExplorerPage';
import { axiosHandler } from '@/config/axiosConfig';
// NOTE: It should call when only need the api call wallet
export const useWalletAccount = () => {
  const { userAddress } = useAuth();
  const [userWallet, setUserWallet] = useState<UserWalletProps>();
  const handleLoadPrivateKey = async () => {
    if (userAddress) {
      const { data: dataWallet } = await axiosHandler.get(
        '/wallet/getOrCreateWallet'
      );
      setUserWallet(() => dataWallet.data);
    }
  };
  useEffect(() => {
    handleLoadPrivateKey();
  }, [userAddress]);
  return {
    userWallet,
    refetchWallet: async () => {
      await handleLoadPrivateKey();
    },
  };
};
