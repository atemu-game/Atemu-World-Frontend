import { useAuth } from '@/hooks/useAuth';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from '../ConnectWallet';
import CopyClipBoard from '../CopyClipboard/CopyClipBoard';
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalInviteCode = ({ isOpen, onClose }: IProps) => {
  const { userAddress } = useAuth();
  return (
    <Modal variant="primary" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody textAlign="center">
          <Text
            fontSize="24px"
            fontWeight="bold"
            color="primary.100"
            textTransform="uppercase"
          >
            Invite code
          </Text>
          <Text mb={6}>Valid invite code will boost your Blitz x2</Text>
          <HStack>
            <InputGroup>
              <Input
                variant="primary"
                value={userAddress ? '' : 'Please Connect To View'}
                mb={6}
              />
            </InputGroup>
          </HStack>

          {userAddress ? (
            <HStack>
              <Button flexGrow={1} variant="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button flexGrow={1} variant="primary">
                Enter
              </Button>
            </HStack>
          ) : (
            <ConnectWallet />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalInviteCode;
