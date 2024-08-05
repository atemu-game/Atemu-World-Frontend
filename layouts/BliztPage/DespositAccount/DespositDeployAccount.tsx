import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import { useAuth } from '@/hooks/useAuth';
import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { UserWalletProps } from '..';
import { useAccount } from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/utils/constants';
import { CallData, RpcProvider, uint256 } from 'starknet';
import { axiosHandler } from '@/config/axiosConfig';
import systemConfig from '@/config/systemConfig';

import { ellipseMiddle } from '@/utils/formatAddress';

interface IProps {
  userWallet: UserWalletProps;
  refetchWallet: () => void;
}
const DespositDeployAccount = ({ userWallet, refetchWallet }: IProps) => {
  const { userAddress } = useAuth();
  const { account } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast({
    position: 'top-right',
    isClosable: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = React.useRef(null);
  return (
    <>
      <Button
        variant="primary"
        // minW="200px"

        borderColor="white"
        w={{ md: 'inherit', base: 'full' }}
        isLoading={isLoading}
        onClick={() => {
          onOpen();
        }}
      >
        Deploy To Start
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="lg"
        variant="primary"
        initialFocusRef={initialRef}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalBody>
            <Flex flexDirection="column" gap={5}>
              <Text variant="title" textAlign="center">
                Deposit ETH Fund
              </Text>
              <Text>Please deposit your ETH fund to this account</Text>
              <Text color="primary.100" fontWeight="bold">
                Your ETH-Fund wallet
              </Text>
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
                  ref={initialRef}
                >
                  {ellipseMiddle(userWallet.payerAddress, 24, 24)}
                  <CopyClipBoard
                    ml={3}
                    color="primary.100"
                    context={
                      userWallet.payerAddress ? userWallet.payerAddress : ''
                    }
                    h={5}
                    w={5}
                    aria-label="Copy Stark Address"
                  />
                </Text>
              </HStack>
              <Text>Estimated ETH to deposit</Text>
              <HStack justifyContent="space-between">
                <Text color="primary.100" fontWeight="bold">
                  Fees to deploy account:
                </Text>
                <Text fontWeight="bold" color="white">
                  {Number(userWallet.feeDeploy).toFixed(7)}
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
                  isLoading={isLoading}
                  onClick={() => {
                    const deployPromise = new Promise((resolve, rejects) => {
                      if (userAddress && account) {
                        setIsLoading(() => true);
                        const provider = new RpcProvider({
                          nodeUrl: systemConfig().RPC,
                        });
                        account
                          .execute({
                            contractAddress: CONTRACT_ADDRESS.ETH,
                            entrypoint: 'transfer',
                            calldata: CallData.compile({
                              recipient: userWallet.payerAddress,
                              amount: uint256.bnToUint256(
                                userWallet.feeDeploy * 1e18
                              ),
                            }),
                          })
                          .then(result => {
                            const txR = provider.waitForTransaction(
                              result.transaction_hash
                            );
                            return txR;
                          })
                          .then(res => {
                            if (res.isSuccess()) {
                              const data = axiosHandler.post('/wallet/deploy');
                              return data;
                            }
                          })
                          .then(res => {
                            refetchWallet();
                            setIsLoading(() => false);
                            onClose();
                            resolve(res);
                          })
                          .catch(res => {
                            setIsLoading(() => false);
                            console.log('Error', res);
                            rejects(res);
                          });
                      }
                    });

                    toast.promise(deployPromise, {
                      success: {
                        title: 'Deploy resolved',
                        description: 'Deploy Success',
                      },
                      error: error => ({
                        title: 'Deploy Error',
                        description: error.message,
                      }),
                      loading: {
                        title: 'Deploy pending',
                        description: 'Please wait.....',
                      },
                    });
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
