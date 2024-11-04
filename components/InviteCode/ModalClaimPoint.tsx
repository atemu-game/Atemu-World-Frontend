import { useAuth } from '@/hooks/useAuth';
import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import ConnectWallet from '../ConnectWallet';
import CopyClipBoard from '../CopyClipboard/CopyClipBoard';
import { useQuery } from 'react-query';
import { axiosHandler } from '@/config/axiosConfig';
import { useAccount } from '@starknet-react/core';
import { CallData, uint256 } from 'starknet';
import { CONTRACT_ADDRESS } from '@/utils/constants';

const ModalClaimPoint = () => {
  const { userAddress } = useAuth();
  const { account } = useAccount();
  const toast = useToast();
  const {
    data: dataPoint,
    isLoading,
    isError,
  } = useQuery({
    queryKey: `getUserPoint-${userAddress}`,
    queryFn: async () => {
      const data = await axiosHandler.get('/claim/ageWalletPoint');
      return data.data;
    },
  });
  const handleClaimPoint = async () => {
    try {
      toast({
        status: 'loading',
        title: 'Claiming Age Points Wallet...',
      });
      if (userAddress && account) {
        const { data } = await axiosHandler.post('/claim/claimAgeWalletPoint');

        const { transaction_hash } = await account.execute({
          contractAddress: CONTRACT_ADDRESS.BLIZT_POINT,
          entrypoint: 'addPoint',
          calldata: CallData.compile({
            receiver: userAddress,
            amount: uint256.bnToUint256(dataPoint.agePoints),
            timestamp: data.timestampSetup,
            proof: data.formatedSignature,
          }),
        });

        toast.closeAll();
        toast({
          status: 'success',
          title: `Claim successfully ${dataPoint.agePoints} points`,
          isClosable: true,
          duration: 5000,
        });
      }
    } catch (error) {
      console.log('Claim failed', error);
      toast({
        status: 'error',
        title: 'Claim failed',
      });
    }
  };
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <React.Fragment>
      <Button onClick={onOpen} variant="primary">
        Claim Age Point
      </Button>
      <Modal
        variant="primary"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody textAlign="center" as={VStack} color="primary.600">
            <Text
              fontSize="24px"
              fontWeight="bold"
              color="primary.100"
              textTransform="uppercase"
            >
              Claim points
            </Text>
            <Text color="#FFFFFFBF">
              The older your wallet is, the more points you gain
            </Text>
            <Text fontSize="24px" fontWeight="bold">
              You are amazing!
            </Text>
            <Text>Here is your POINT reward</Text>

            {dataPoint && (
              <Text
                variant="gradient_text"
                fontSize="3rem"
                fontWeight="bold"
                bg="gradient.200"
              >
                {dataPoint.agePoints}
              </Text>
            )}
            <Text>POINTS</Text>
            <Text>Thanks for being as a valuable member of Starknet</Text>
            <Flex gap={3}>
              <Button flexGrow={1} variant="primary" onClick={onClose}>
                Close
              </Button>
              {dataPoint && !isLoading ? (
                <Button
                  variant="primary"
                  flexGrow={1}
                  onClick={handleClaimPoint}
                >
                  Claim
                </Button>
              ) : (
                <Button
                  variant="primary"
                  flexGrow={1}
                  onClick={handleClaimPoint}
                >
                  Claim
                </Button>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ModalClaimPoint;
