import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import useSessionStorage from '@/hooks/useSessionStorage';
import { ACCESS_TOKEN, RPC_PROVIDER } from '@/utils/constants';
import { deleteCookie, setCookie } from '@/utils/cookie';
import { useToast } from '@chakra-ui/react';
import { useAccount, useConnect } from '@starknet-react/core';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from 'react';
interface IWalletConnectionProps {
  connectWallet: (index: number) => void;
  disconnectWallet: () => void;
  address?: string;
  chain_id?: number;
}
const initalValue: IWalletConnectionProps = {
  connectWallet: () => {},
  disconnectWallet: () => {},
  address: '',
  chain_id: 0,
};
interface Configuration {
  address?: string;
  chain_id?: number;
}
export const WalletContext = createContext<IWalletConnectionProps>(initalValue);
const APP_NAME = 'Atemu';
const ProviderWalletContext = ({ children }: PropsWithChildren) => {
  const {
    address: addressWallet,
    status: statusWallet,
    account,
  } = useAccount();
  const [config, setConfig] = useSessionStorage<Configuration>(APP_NAME, {
    address: undefined,
    chain_id: undefined,
  });
  const [address, setAddress] = React.useState(config.address);
  const [chain_id, setChainId] = React.useState(config.chain_id);

  const { connect, connectors } = useConnect();

  const toast = useToast();

  const disconnectWallet = () => {
    setConfig({ address: undefined, chain_id: undefined });
    setAddress(undefined);
    setChainId(undefined);
    deleteCookie(ACCESS_TOKEN);
  };
  /// Custom
  const connectWallet = async (index: number) => {
    try {
      await connect({ connector: connectors[index] });
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
        setAddress(addressWallet);

        setConfig({
          ...config,
          address: addressWallet,
          chain_id: index,
        });

        setCookie({
          expires: '1d',
          key: ACCESS_TOKEN,
          value: dataToken.data.token,
        });
      }
    } catch (error) {
      toast({
        title: 'Reject Connect',
        description: 'You Reject to connect',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      disconnectWallet();
    }
  };

  useEffect(() => {
    const handleChangeWallet = async () => {
      if (addressWallet && addressWallet !== address && chain_id != undefined) {
        await connectWallet(chain_id);
      }
    };
    handleChangeWallet();
  }, [addressWallet, chain_id]);
  useEffect(() => {
    const handleReConenct = async () => {
      if (address && statusWallet === 'disconnected' && chain_id != undefined) {
        await connect({ connector: connectors[chain_id] });
      }
    };
    handleReConenct();
  }, [address, chain_id]);

  return (
    <WalletContext.Provider
      value={{ address, chain_id, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error(
      'useWalletContext must be used within a ProviderWalletContext'
    );
  }
  return context;
};
export default ProviderWalletContext;
