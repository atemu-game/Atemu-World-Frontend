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
  Input,
} from '@chakra-ui/react';
import { useAccount } from '@starknet-react/core';
import React, { useState } from 'react';

import { axiosHandler } from '@/config/axiosConfig';
import Card from '@/components/Card';

// WidthDrawAccount Payer component Modal
interface IProps {
  refetchBalance: () => void;
}
const WidthDrawAccount = ({ refetchBalance }: IProps) => {
  const { userAddress } = useAuth();
  const { account } = useAccount();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast({
    position: 'top-right',
    isClosable: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [amountWidthDraw, setAmountWidthDraw] = React.useState<number>(0);

  return (
    <>
      <Button variant="primary" onClick={onOpen} height="64px">
        Width Draw
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
              <Card
                variant="content"
                display="flex"
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
              </Card>
              <Text>Estimated ETH to WidthDraw</Text>
              {/* <HStack justifyContent="space-between">
                <Text>Fees to deploy account:</Text>
                <Text fontWeight="bold" color="white">
                  {userWallet.feeDeploy}
                </Text>
              </HStack> */}
              <Input
                isDisabled={isLoading}
                type="number"
                placeholder="Type Amount you want WidthDraw (ETH)"
                defaultValue={amountWidthDraw}
                onChange={e => {
                  setAmountWidthDraw(() => Number(e.target.value));
                }}
              />
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
                  isDisabled={amountWidthDraw === 0}
                  onClick={() => {
                    const deployPromise = new Promise((resolve, rejects) => {
                      if (userAddress && account) {
                        setIsLoading(() => true);
                        axiosHandler
                          .post('/wallet/withdrawCreatorAccount', {
                            reciverAddress: userAddress,
                            amount: amountWidthDraw,
                            tokenType: 'ETH',
                          })
                          .then((res: any) => {
                            setIsLoading(() => false);
                            onClose();
                            refetchBalance();
                            resolve(true);
                          })
                          .catch(err => {
                            setIsLoading(() => false);
                            rejects(err.response.data.message);
                          });
                      }
                    });

                    toast.promise(deployPromise, {
                      success: {
                        title: 'WidthDraw resolved',
                        description: 'WidthDraw Success',
                      },
                      error: error => ({
                        title: 'WidthDraw rejected',
                        description: `${error}`,
                      }),
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
