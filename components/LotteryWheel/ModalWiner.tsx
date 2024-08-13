import { useAuth } from '@/hooks/useAuth';
import { WinerProps } from '@/utils/constants';
import { ellipseMiddle } from '@/utils/formatAddress';
import {
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalOverlay,
  Text,
  Image,
  ModalContent,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

import React from 'react';
interface ModalWinerProps {
  isOpen: boolean;
  onClose: () => void;
  dataWiner: WinerProps;
}
const ModalWiner = ({ isOpen, onClose, dataWiner }: ModalWinerProps) => {
  const { userAddress } = useAuth();
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="primary" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text variant="title" textAlign="center">
            Congratulations!
          </Text>
          <Text textAlign="center">
            {userAddress === dataWiner.winner.address
              ? `You have won this round`
              : `${ellipseMiddle(
                  dataWiner.winner.address,
                  5
                )} has won this round`}
          </Text>
          <HStack mt={6} justifyContent="space-between" color="primary.100">
            <Box>
              <Text textAlign="center" fontWeight={700}>
                Trading Card:
              </Text>
              <Image
                src="/assets/arts/card/card_test.svg"
                alt=""
                height="174px"
              />
              <Text fontWeight={300}>Trading Card #{dataWiner.cardId}</Text>
            </Box>

            <Box textAlign="center">
              <Text>Points can be claimed:</Text>
              <Text fontSize="6xl" fontWeight={700}>
                25000
              </Text>
              <Text>Points</Text>
            </Box>
          </HStack>
          <HStack>
            <Button onClick={onClose} variant="primary">
              Close
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWiner;
