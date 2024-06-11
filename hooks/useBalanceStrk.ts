import { ABIS } from '@/abis';
import { CONTRACT_ADDRESS, RPC_PROVIDER } from '@/utils/constants';
import { publicProvider, useAccount } from '@starknet-react/core';
import { useEffect, useState } from 'react';
import { Contract, Provider } from 'starknet';
import { useAuth } from './useAuth';
import { formatBalance } from '@/utils/formatAddress';

export const useBalanceStrk = () => {
  const { userAddress } = useAuth();
  const [balanceStrk, setBalanceStrk] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contractStrk = new Contract(
    ABIS.ErcSierraABI.abi,
    CONTRACT_ADDRESS.STRK,
    new Provider({ nodeUrl: RPC_PROVIDER.TESTNET })
  );
  useEffect(() => {
    const fetchBalanceStrk = async () => {
      if (!userAddress) return;
      setIsLoading(true);
      const initialStrk = await contractStrk.balanceOf(userAddress);
      const formatBalanceData = parseFloat(formatBalance(initialStrk, 18));
      setBalanceStrk(formatBalanceData.toFixed(3));
      setIsLoading(false);
    };
    fetchBalanceStrk();
  }, [userAddress]);
  return { isLoading, balanceStrk };
};
