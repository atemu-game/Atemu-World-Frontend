import { sepolia } from '@starknet-react/chains';
import {
  InjectedConnector,
  StarknetConfig,
  publicProvider,
} from '@starknet-react/core';
import React, { PropsWithChildren } from 'react';
import { ArgentMobileConnector } from 'starknetkit/argentMobile';
import { WebWalletConnector } from 'starknetkit/webwallet';

const ProviderStarknet = ({ children }: PropsWithChildren) => {
  const provider = publicProvider();
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
