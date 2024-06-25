import {
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
        minW="200px"
        borderColor="white"
        onClick={onOpen}
        isLoading={isLoading}
      >
        Deposit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
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
                  {userWallet.payerAddress}
                  <CopyClipBoard
                    ml={3}
                    context={
                      userWallet.payerAddress ? userWallet.payerAddress : ''
                    }
                    h={4}
                    w={4}
                    aria-label="Copy Stark Address"
                  />
                </Text>
              </HStack>

              <Input
                isDisabled={isLoading}
                type="number"
                placeholder="Type Amount you want (ETH)"
                defaultValue={amountDesposit}
                onChange={e => {
                  setAmountDesposit(() => Number(e.target.value));
                }}
              />
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
                            resolve(res);
                            onClose();
                            if (status === 'balance_low') {
                              handleSetStatus('stopped');
                            }
                            setIsLoading(() => false);
                          })
                          .catch(err => {
                            reject(err);
                            setIsLoading(() => false);
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
