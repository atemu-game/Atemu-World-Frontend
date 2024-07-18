import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { UserWalletProps } from '..';
import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import { useAccount } from '@starknet-react/core';
import { CallData, RpcProvider, uint256 } from 'starknet';
import { CONTRACT_ADDRESS } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';

import systemConfig from '@/config/systemConfig';
import Card from '@/components/Card';
import { ellipseMiddle } from '@/utils/formatAddress';

interface IProps {
  userWallet: UserWalletProps;
  refetchBalance: () => void;
}

const DespositMoneyAccount = ({ userWallet, refetchBalance }: IProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleSetStatus, status } = useCreatorAccount();
  const [amountDesposit, setAmountDesposit] = React.useState<number>(0);
  const toast = useToast({
    position: 'top-right',
    isClosable: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { userAddress } = useAuth();
  const { account } = useAccount();

  return (
    <>
      <Button
        variant="primary"
        borderColor="white"
        w={{ md: 'inherit', base: 'full' }}
        onClick={onOpen}
        isLoading={isLoading}
      >
        Deposit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered variant="primary">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex flexDirection="column" gap={5}>
              <Box>
                <Text variant="title" textAlign="center" mb={2}>
                  Deposit ETH Fund
                </Text>
                <Text textAlign="center">
                  Please deposit your ETH fund to this account
                </Text>
              </Box>

              <Box>
                <Text variant="sub_title" mb={2}>
                  Your ETH-Fund wallet
                </Text>
                <HStack
                  as={Card}
                  variant="content"
                  padding={2}
                  justifyContent="space-between"
                  flexWrap={{
                    md: 'nowrap',
                    base: 'wrap',
                  }}
                >
                  <Text
                    textOverflow="ellipsis"
                    maxWidth={{ lg: 'full', base: '300px' }}
                  >
                    {ellipseMiddle(userWallet.payerAddress, 14, 14)}
                  </Text>
                  <CopyClipBoard
                    ml={3}
                    context={
                      userWallet.payerAddress ? userWallet.payerAddress : ''
                    }
                    h={4}
                    w={4}
                    aria-label="Copy Stark Address"
                  />
                </HStack>
              </Box>

              <Box>
                <Text variant="sub_title" mb={2}>
                  Desposit Amount
                </Text>
                <Input
                  isDisabled={isLoading}
                  type="number"
                  placeholder="Type Amount you want (ETH)"
                  defaultValue={amountDesposit}
                  onChange={e => {
                    setAmountDesposit(() => Number(e.target.value));
                  }}
                />
              </Box>

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
                    const despositPromise = new Promise((resolve, reject) => {
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
                                amountDesposit * 1e18
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
                            refetchBalance();

                            onClose();
                            if (status === 'balance_low') {
                              handleSetStatus('stopped');
                            }
                            setIsLoading(() => false);
                            resolve(res);
                          })
                          .catch(err => {
                            setIsLoading(() => false);
                            reject(err);
                          });
                      }
                    });
                    toast.promise(despositPromise, {
                      success: {
                        title: 'Deposit resolved',
                        description: 'Deposit Success',
                      },
                      error: {
                        title: 'Deposist rejected',
                        description: 'Something wrong',
                      },
                      loading: {
                        title: 'Deposist pending',
                        description: 'Please wait',
                      },
                    });
                  }}
                >
                  Deposit
                </Button>
              </HStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DespositMoneyAccount;
