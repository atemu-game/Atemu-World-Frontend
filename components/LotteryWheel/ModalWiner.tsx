import { axiosHandler } from '@/config/axiosConfig';
import { useAuth } from '@/hooks/useAuth';
import { CONTRACT_ADDRESS, WinerProps } from '@/utils/constants';
import { ellipseMiddle, formattedContractAddress } from '@/utils/formatAddress';
import { ResClaimFuelRewardResult } from '@/utils/typeResponse';
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
import { useAccount } from '@starknet-react/core';

import React, { useEffect, useState } from 'react';
import { CallData, uint256 } from 'starknet';
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
  const { account } = useAccount();
  const toast = useToast();

  // State to store pool data when user is the winner
  const [claimablePool, setClaimablePool] = useState<{
    poolId: string;
    address: string;
    cardId: string;
    totalPoints: string;
    userAddressWiner: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setClaimablePool(null);
        onClose();
      }, 3 * 60 * 1000); // 3 minutes

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!userAddress) return;
    const formatAddress = formattedContractAddress(userAddress);
    if (dataWiner && formatAddress == dataWiner.winner.address) {
      setClaimablePool({
        poolId: currentPool.id,
        address: currentPool.address,
        cardId: dataWiner.winner.cardId,
        userAddressWiner: dataWiner.winner.address,
        totalPoints: dataWiner.winner.totalPoints,
      });
    }
  }, [userAddress, dataWiner]);

  const handleClaim = async () => {
    if (!claimablePool) return;

    if (userAddress && account) {
      try {
        toast({
          title: 'Claiming reward...',
          status: 'loading',
          duration: 5000,
          isClosable: true,
          id: 'claiming-reward',
        });
        const data = await axiosHandler.post<ResClaimFuelRewardResult>(
          '/fuel/claim-reward',
          {
            poolId: claimablePool.poolId,
            poolContract: claimablePool.address,
          }
        );
        const response = data.data;

        const { transaction_hash } = await account.execute([
          {
            contractAddress: CONTRACT_ADDRESS.FUEL,
            entrypoint: 'claimReward',
            calldata: CallData.compile({
              poolId: uint256.bnToUint256(response.poolId),
              cardId: uint256.bnToUint256(response.cardId),
              amountCards: uint256.bnToUint256(response.amountOfCards),
              proof: response.proof,
            }),
          },
        ]);

        toast.closeAll();
        toast({
          title: 'Claim reward successfully',
          description: `Claim Success with transaction hash: ${transaction_hash}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } catch (error: any) {
        toast.closeAll();
        toast({
          title: 'Claim reward failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
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
          {userAddress &&
          claimablePool &&
          formattedContractAddress(userAddress) ==
            claimablePool.userAddressWiner ? (
            <Text textAlign="center">You have won this round</Text>
          ) : (
            <Text
              color="#FFFFFFBF"
              textAlign="center"
              textDecoration="underline"
            >
              {dataWiner &&
                `${ellipseMiddle(
                  dataWiner.winner.address,
                  5
                )} has won this round`}
            </Text>
          )}
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
              {claimablePool && (
                <Text fontWeight={300}>
                  Trading Card #{claimablePool.cardId}
                </Text>
              )}
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
