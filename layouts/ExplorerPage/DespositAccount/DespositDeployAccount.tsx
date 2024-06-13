import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import { useAuth } from '@/hooks/useAuth';
import {
  Box,
  Button,
  Flex,
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
import React from 'react';
import { UserWalletProps } from '..';
import { useAccount } from '@starknet-react/core';
import { CONTRACT_ADDRESS, RPC_PROVIDER } from '@/utils/constants';
import { CallData, RpcProvider, uint256 } from 'starknet';
import { axiosHandler } from '@/config/axiosConfig';
// Desposit Account Modal
interface IProps {
  userWallet: UserWalletProps;
}
const DespositDeployAccount = ({ userWallet }: IProps) => {
  const { userAddress } = useAuth();
  const { account } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const handleDeployAccount = async () => {
    try {
      if (userAddress && account) {
        const provider = new RpcProvider({
          nodeUrl: RPC_PROVIDER.TESTNET,
        });
        const result = await account.execute({
          contractAddress: CONTRACT_ADDRESS.ETH,
          entrypoint: 'transfer',
          calldata: CallData.compile({
            recipient: userWallet.payerAddress,
            amount: uint256.bnToUint256(userWallet.feeDeploy * 1e18),
          }),
        });
        const txR = await provider.waitForTransaction(result.transaction_hash);
        if (txR.isSuccess()) {
          const data = await axiosHandler.post('/wallet/deploy');
          toast({
            title: 'Success',
            description: `Deploy account success DeployHash: ${data.data.deployHash}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          onClose();
        }
      }
    } catch (error) {
      toast({
        title: ' Rejected ',
        description: 'Transaction rejected by user',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button
        variant="primary"
        minW="200px"
        borderColor="white"
        onClick={() => {
          onOpen();
        }}
      >
        Deploy Account
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />

        <ModalContent background="body" padding={4}>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={5}>
              <Text variant="title" textAlign="center">
                Deposit ETH Fund
              </Text>
              <Text>Please deposit your ETH fund to this account</Text>
              <Text>Your ETH-Fund wallet</Text>
              <HStack
                padding={2}
                border="1px solid"
                borderColor="divider.100"
                flexWrap={{
                  md: 'nowrap',
                  base: 'wrap',
                }}
              >
                <Text
                  textOverflow="ellipsis"
                  maxWidth={{ lg: 'full', base: '300px' }}
                >
                  {userAddress}
                </Text>
                <CopyClipBoard
                  context={userAddress ? userAddress : ''}
                  h={4}
                  w={4}
                  aria-label="Copy Stark Address"
                />
              </HStack>
              <Text>Estimated ETH to deposit</Text>
              <HStack justifyContent="space-between">
                <Text>Fees to deploy account:</Text>
                <Text fontWeight="bold" color="white">
                  {userWallet.feeDeploy}
                </Text>
              </HStack>
              <Text>
                NOTE: Deposited ETH fund is used for deploy account (at the
                first time) auto generate from your wallet.
              </Text>
              <HStack justifyContent="space-around">
                <Button variant="primary" flexGrow={1} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  flexGrow={1}
                  width="fit-content"
                  variant="primary"
                  color="black"
                  background="secondary.100"
                  onClick={async () => {
                    await handleDeployAccount();
                  }}
                >
                  Deploy Account
                </Button>
              </HStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DespositDeployAccount;
