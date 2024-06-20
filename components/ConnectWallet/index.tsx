import { useAuth } from '@/hooks/useAuth';

import { Button, ButtonProps } from '@chakra-ui/react';
import { useConnect } from '@starknet-react/core';
import React from 'react';
import { useStarknetkitConnectModal } from 'starknetkit';

import { Connector } from 'starknetkit'; // Import the Connector type from the starknetkit package
interface IProps {
  sx?: ButtonProps;
}
const ConnectWallet = ({ sx }: IProps) => {
  const { connectors } = useConnect();
  const { connectWallet } = useAuth();
  const handleConnectWallet = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { starknetkitConnectModal } = useStarknetkitConnectModal({
      connectors: connectors as Connector[], // Cast the connectors array to Connector[]
    });
    try {
      const { connector } = await starknetkitConnectModal();
      const connectorIndex = connectors.findIndex(
        c => c.name === connector.name
      );
      await connectWallet(connectorIndex);
    } catch (error) {
      console.log('Reject Connect', error);
    }
  };

  return (
    <Button variant="primary" onClick={handleConnectWallet} {...sx}>
      Connect
    </Button>
  );
};

export default ConnectWallet;
