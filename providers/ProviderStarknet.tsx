import { sepolia } from '@starknet-react/chains';
import {
  InjectedConnector,
  StarknetConfig,
  jsonRpcProvider,
} from '@starknet-react/core';
import React, { PropsWithChildren } from 'react';
import { ArgentMobileConnector } from 'starknetkit/argentMobile';
import { WebWalletConnector } from 'starknetkit/webwallet';

const ProviderStarknet = ({ children }: PropsWithChildren) => {
  function rpc() {
    return {
      nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
    };
  }

  const provider = jsonRpcProvider({ rpc });
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos', name: 'Braavos' } }),
    new InjectedConnector({ options: { id: 'argentX', name: 'Argent X' } }),
    new WebWalletConnector({ url: 'https://web.argent.xyz' }),
    new ArgentMobileConnector(),
  ];
  return (
    <>
      <StarknetConfig
        chains={[sepolia]}
        provider={provider}
        connectors={connectors}
      >
        {children}
      </StarknetConfig>
    </>
  );
};

export default ProviderStarknet;
