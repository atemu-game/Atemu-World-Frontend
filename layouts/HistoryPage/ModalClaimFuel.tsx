import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const ModalClaimFuel = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <React.Fragment>
      <Button onClick={onOpen} variant="primary">
        Claim Data
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text>Claim Fuel</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ModalClaimFuel;
