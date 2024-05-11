import { useWalletContext } from '@/providers/ProviderContext';
import { Button } from '@chakra-ui/react';
import { useConnect } from '@starknet-react/core';
import React from 'react';
import { useStarknetkitConnectModal } from 'starknetkit';

import { Connector } from 'starknetkit'; // Import the Connector type from the starknetkit package

const ConnectWallet = () => {
  const { connectors } = useConnect();
  const { connectWallet } = useWalletContext();

  const handleConnectWallet = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { starknetkitConnectModal } = useStarknetkitConnectModal({
      connectors: connectors as Connector[], // Cast the connectors array to Connector[]
    });

    const { connector } = await starknetkitConnectModal();
    const connectorIndex = connectors.findIndex(c => c.name === connector.name);
    await connectWallet(connectorIndex);
  };

  return (
    <Button variant="primary" onClick={handleConnectWallet}>
      Connect
    </Button>
  );
};

export default ConnectWallet;
