import { axiosHandler } from '@/config/axiosConfig';
import { CONTRACT_ADDRESS } from '@/utils/constants';
import { ResClaimFuelRewardResult } from '@/utils/typeResponse';
import Image from 'next/image';
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useAccount } from '@starknet-react/core';
import React from 'react';
import { CallData, num, uint256 } from 'starknet';
interface IProps {
  dataClaim: any;
}
const ModalClaimFuel = ({ dataClaim }: IProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const { address, account } = useAccount();
  const handleClaim = async () => {
    if (address && account) {
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
            poolId: dataClaim.id,
            poolContract: dataClaim.address,
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
    <React.Fragment>
      <Button onClick={onOpen} variant="primary">
        Claim Data
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} variant="primary" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton top="5%" right="5%" />
          <ModalBody>
            <Text variant="title" textAlign="center">
              Congratulations!
            </Text>
            <HStack mt={6} justifyContent="space-between" color="primary.100">
              <Box>
                <Text textAlign="center" fontWeight={700}>
                  Trading Card:
                </Text>
                <Image
                  src="/assets/arts/card/card_test.svg"
                  alt=""
                  height={200}
                  width={200}
                />
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
              <Button onClick={handleClaim} variant="primary">
                Claim Reward
              </Button>
              <Button onClick={onClose} variant="primary">
                Close
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ModalClaimFuel;
