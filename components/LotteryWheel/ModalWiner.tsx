import { Modal, ModalBody, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
interface ModalWinerProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  pointTotal: number;
}
const ModalWiner = ({
  isOpen,
  onClose,
  address,
  pointTotal,
}: ModalWinerProps) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalBody></ModalBody>
    </Modal>
  );
};

export default ModalWiner;
