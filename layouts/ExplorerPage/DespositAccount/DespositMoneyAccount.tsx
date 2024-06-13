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
import React from 'react';
import { UserWalletProps } from '..';
import CopyClipBoard from '@/components/CopyClipboard/CopyClipBoard';
import { useAccount } from '@starknet-react/core';
import { CallData, RpcProvider, uint256 } from 'starknet';
import { CONTRACT_ADDRESS, RPC_PROVIDER } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';

interface IProps {
  userWallet: UserWalletProps;
  refetchBalance: () => void;
}
const DespositMoneyAccount = ({ userWallet, refetchBalance }: IProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [amountDesposit, setAmountDesposit] = React.useState<number>(0);
  const toast = useToast({
    position: 'top-right',
  });
  const { userAddress } = useAuth();
  const { account } = useAccount();
  //   const handleDepositMoney = async () => {
  //     try {
  //       if (userAddress && account) {
  //         const provider = new RpcProvider({
  //           nodeUrl: RPC_PROVIDER.TESTNET,
  //         });
  //         const result = await account.execute({
  //           contractAddress: CONTRACT_ADDRESS.ETH,
  //           entrypoint: 'transfer',
  //           calldata: CallData.compile({
  //             recipient: userWallet.payerAddress,
  //             amount: uint256.bnToUint256(amountDesposit * 1e18),
  //           }),
  //         });
  //         const txR = await provider.waitForTransaction(result.transaction_hash);
  //         if (txR.isSuccess()) {
  //           toast({
  //             title: 'Success',
  //             description: `Deposit Success`,
  //             status: 'success',
  //             duration: 9000,
  //             isClosable: true,
  //           });
  //           await refetch();
  //           onClose();
  //         }
  //       }
  //     } catch (error) {
  //       toast({
  //         title: ' Rejected ',
  //         description: 'Transaction rejected by user',
  //         status: 'error',
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //     }
  //   };
  return (
    <>
      <Button
        variant="primary"
        minW="200px"
        borderColor="white"
        onClick={onOpen}
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
                </Text>
                <CopyClipBoard
                  context={
                    userWallet.payerAddress ? userWallet.payerAddress : ''
                  }
                  h={4}
                  w={4}
                  aria-label="Copy Stark Address"
                />
              </HStack>

              <Input
                type="number"
                placeholder="Type Amount you want"
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
                  onClick={() => {
                    const despositPromise = new Promise((resolve, reject) => {
                      try {
                        if (userAddress && account) {
                          const provider = new RpcProvider({
                            nodeUrl: RPC_PROVIDER.TESTNET,
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
                            });
                        }
                      } catch (error) {
                        reject(error);
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
