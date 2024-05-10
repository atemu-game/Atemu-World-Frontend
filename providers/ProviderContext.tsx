import useLocalStorage from '@/hooks/useLocalStorage';
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
  sound: boolean; // turn on or off
  chain_id?: number; // SNIPPET chain ID is Argentx or Bravoos
}
const initalValue: IWalletConnectionProps = {
  connectWallet: () => {},
  disconnectWallet: () => {},
  sound: false,
  address: '',
  chain_id: 0,
};
interface Configuration {
  address?: string;
  chain_id?: number;
  sound: boolean;
}
export const WalletContext = createContext<IWalletConnectionProps>(initalValue);
const APP_NAME = 'StarkArcade_Teris';
const ProviderWalletContext = ({ children }: PropsWithChildren) => {
  const { address: addressWallet, status: statusWallet } = useAccount();
  const [config, setConfig] = useLocalStorage<Configuration>(
    APP_NAME,
    {
      address: undefined,
      chain_id: undefined,
      sound: false,
    },
    24 * 60 * 60 * 1000 + Date.now() // 1days
  );
  const [address, setAddress] = React.useState(config.address);
  const [chain_id, setChainId] = React.useState(config.chain_id);
  const [sound, setSound] = React.useState(config.sound);
  const { connect, connectors } = useConnect();

  /// Custom
  const connectWallet = async (index: number) => {
    await connect({ connector: connectors[index] });
    await setChainId(index);
  };
  const disconnectWallet = () => {
    setConfig({ address: undefined, chain_id: undefined, sound: true });
    setAddress(undefined);
    setChainId(undefined);
  };
  useEffect(() => {
    if (addressWallet && addressWallet !== address && chain_id != undefined) {
      setAddress(addressWallet);
      setConfig({ ...config, address: addressWallet, chain_id: chain_id });
    }
  }, [addressWallet, chain_id]);
  useEffect(() => {
    const handleReConenct = async () => {
      if (address && statusWallet === 'disconnected' && chain_id != undefined) {
        try {
          await connect({ connector: connectors[chain_id] });
        } catch (error) {
          disconnectWallet();
        }
      }
    };
    handleReConenct();
  }, [address, chain_id]);
  return (
    <WalletContext.Provider
      value={{ sound, address, chain_id, connectWallet, disconnectWallet }}
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
