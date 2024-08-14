import { axiosHandler } from '@/config/axiosConfig';
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
  Button,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
interface ModalWinerProps {
  isOpen: boolean;
  onClose: () => void;
  dataWiner: WinerProps;
  currentPool: any;
}
const ModalWiner = ({
  isOpen,
  onClose,
  dataWiner,
  currentPool,
}: ModalWinerProps) => {
  const { userAddress } = useAuth();
  const toast = useToast();

  // State to store pool data when user is the winner
  const [claimablePool, setClaimablePool] = useState<{
    id: string;
    address: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3 * 60 * 1000); // 3 minutes

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (userAddress === dataWiner.winner.address) {
      setClaimablePool({
        id: currentPool.id,
        address: currentPool.address,
      });
    }
  }, [userAddress, dataWiner, currentPool]);

  const handleClaim = () => {
    if (!claimablePool) return;

    const claimPromise = new Promise((resolve, reject) => {
      if (userAddress) {
        try {
          const data = axiosHandler.post('claim-reward', {
            poolId: claimablePool.id,
            poolContract: claimablePool.address,
          });
          return resolve(data);
        } catch (error) {
          reject(error);
        }
      }
    });
    toast.promise(claimPromise, {
      success: {
        title: 'Claim Success',
        description: 'You have claimed the reward',
      },
      error: error => ({
        title: 'Claim Error',
        description: error.message,
      }),
      loading: {
        title: 'Claim pending',
        description: 'Please wait.....',
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="primary" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton top="5%" right="5%" />
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
            <Button
              onClick={handleClaim}
              variant="primary"
              isDisabled={!claimablePool}
            >
              Claim Reward
            </Button>
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
