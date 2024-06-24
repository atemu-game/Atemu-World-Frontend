import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import { useAuth } from '@/hooks/useAuth';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
  Flex,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { useAccount } from '@starknet-react/core';
import React, { useEffect, useState } from 'react';
import { UserWalletProps } from '..';
import { CallData, RpcProvider, uint256 } from 'starknet';
import { CONTRACT_ADDRESS, RPC_PROVIDER } from '@/utils/constants';
import { axiosHandler } from '@/config/axiosConfig';
import systemConfig from '@/config/systemConfig';

// WidthDrawAccount Payer component Modal
interface IProps {
  userWallet: UserWalletProps;
  refetchWallet: () => void;
}
const WidthDrawAccount = ({ userWallet, refetchWallet }: IProps) => {
  const { userAddress } = useAuth();
  const { account } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast({
    position: 'top-right',
    isClosable: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={onOpen}>
        Width Draw (Payer Account)
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent background="body">
          <ModalBody>
            <Flex flexDirection="column" gap={5}>
              <Text variant="title" textAlign="center">
                WidthDraw ETH Fund
              </Text>
              <Text>
                Please WidthDraw from your private Account fund to this account
              </Text>
              <Text>Your wallet (creator wallet)</Text>
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
                  <CopyClipBoard
                    ml={3}
                    context={userAddress ? userAddress : ''}
                    h={4}
                    w={4}
                    aria-label="Copy Stark Address"
                  />
                </Text>
              </HStack>
              <Text>Estimated ETH to WidthDraw</Text>
              {/* <HStack justifyContent="space-between">
                <Text>Fees to deploy account:</Text>
                <Text fontWeight="bold" color="white">
                  {userWallet.feeDeploy}
                </Text>
              </HStack> */}
              <Text>NOTE: Deposited ETH fund to your Creator Account.</Text>
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
                  isLoading={isLoading}
                  onClick={() => {
                    const deployPromise = new Promise((resolve, rejects) => {
                      if (userAddress && account) {
                        setIsLoading(() => true);
                        const provider = new RpcProvider({
                          nodeUrl: systemConfig().RPC,
                        });
                      }
                    });

                    toast.promise(deployPromise, {
                      success: {
                        title: 'WidthDraw resolved',
                        description: 'WidthDraw Success',
                      },
                      error: {
                        title: 'WidthDraw rejected',
                        description: 'Something wrong',
                      },
                      loading: {
                        title: 'WidthDraw pending',
                        description: 'Please wait.....',
                      },
                    });
                  }}
                >
                  WidthDraw
                </Button>
              </HStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WidthDrawAccount;
