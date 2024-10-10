import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';

interface IProps {
  isOpen: boolean;
}

const LoadingConnectWallet = ({ isOpen }: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent bg="inherit">
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Box className="loader" />
          <Text fontWeight="bold" fontSize="lg" color="white">
            Loading Connect Wallet
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingConnectWallet;
