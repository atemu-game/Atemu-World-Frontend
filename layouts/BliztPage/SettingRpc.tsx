import Card from '@/components/Card';
import { axiosHandler, axiosHandlerNoBearer } from '@/config/axiosConfig';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
import { colors } from '@/themes';
import { ListPublicRPC } from '@/utils/constants';
import { convertHex } from '@/utils/convertHex';
import { ellipseMiddle, isValidURL } from '@/utils/formatAddress';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Skeleton,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import DeleteIcon from '@/public/assets/icons/delete.svg';
const SettingRpc = () => {
  const [currentRPC, setCurrentRPC] = useState(ListPublicRPC[0]); // Choice of RPC Minting
  const { handleChangeRPC, currentRPC: currentRPCAccount } =
    useCreatorAccount();
  const [ownerRPC, setOwnerRPC] = useState('');

  const toast = useToast();

  const { data, isLoading } = useQuery({
    queryKey: 'default-rpc',
    queryFn: async () => {
      const { data } = await axiosHandlerNoBearer.get('/system/defaultRPC');
      if (data.data.value.length > 0) {
        setCurrentRPC(() => data.data.value[0]);
      }
      return data.data;
    },
  });
  const {
    data: dataOwnerRPC,
    isLoading: isLoadingOwnerRPC,
    refetch: refetchOwnerRPC,
  } = useQuery({
    queryKey: 'owner-rpc',
    queryFn: async () => {
      const { data } = await axiosHandler.get('/user/setting/customRPC');
      if (data.data && data.data.rpcPublicStore.length > 0)
        return data.data.rpcPublicStore;
      return [];
    },
  });
  const hanldeAddRPC = useMutation({
    mutationFn: async (rpc: string) => {
      const { data } = await axiosHandler.post('/user/setting/customRPC', {
        rpc,
      });
      setOwnerRPC('');
      return data;
    },
    onSuccess: () => {
      refetchOwnerRPC();

      toast({
        title: 'Success',
        description: 'RPC has been added',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleRestoreRPC = useMutation({
    mutationFn: async () => {
      const { data } = await axiosHandler.delete('/user/setting/customRPC/all');
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'RPC has been restored',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetchOwnerRPC();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'RPC has not been restored',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const handleDeleteRPCSpecific = useMutation({
    mutationKey: 'delete-rpc',
    mutationFn: async (rpc: string) => {
      const { data } = await axiosHandler.delete(
        '/user/setting/customRPC/specific',
        {
          data: { rpc },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'RPC has been deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetchOwnerRPC();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'RPC has not been deleted. Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    if (currentRPC.length > 0 && currentRPCAccount !== currentRPC) {
      handleChangeRPC(currentRPC);
    }
  }, [currentRPC]);
  return (
    <Card w={{ md: '500px', base: 'full' }}>
      <Box padding={4} display="flex" flexDirection="column" gap={6}>
        <Text variant="sub_title">RPCs</Text>
        <Box>
          <Text mb={8}>
            You can choose which RPCs to use for minning transactions.
          </Text>
          <Text>
            The app rotates between enabled RPCs to avoid hitting rate limits
          </Text>
        </Box>
        <RadioGroup onChange={setCurrentRPC} value={currentRPC}>
          <Flex flexDirection="column" gap={4}>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={`RPC-Select-${index}`}>
                  <Radio variant="primary" value={ListPublicRPC[index]} gap={2}>
                    {ellipseMiddle(ListPublicRPC[index], 15, 15)}
                  </Radio>
                </Skeleton>
              ))}

            {!isLoading &&
              data &&
              data.value.map((rpc: string, index: number) => (
                <Radio
                  variant="primary"
                  value={rpc}
                  gap={2}
                  width="full"
                  key={`RPC-Select-${index}-${rpc}`}
                >
                  <Tooltip hasArrow label={rpc} placement="top">
                    <Text
                      fontWeight={600}
                      color={
                        rpc == currentRPC
                          ? 'primary.100'
                          : convertHex(colors.primary[100], 0.5)
                      }
                    >
                      {ellipseMiddle(rpc, 15, 15)}
                    </Text>
                  </Tooltip>
                </Radio>
              ))}
          </Flex>

          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter px="4" bg="body" fontWeight="bold">
              or
            </AbsoluteCenter>
          </Box>
          <Flex flexDirection="column" gap={4}>
            {!isLoadingOwnerRPC &&
              dataOwnerRPC &&
              dataOwnerRPC.map((rpc: string, index: number) => (
                <HStack key={`RPC-Select-${index}-${rpc}`}>
                  <Radio width="full" variant="primary" value={rpc} gap={2}>
                    {ellipseMiddle(rpc, 15, 15)}
                  </Radio>
                  <Icon
                    as={DeleteIcon}
                    cursor="pointer"
                    transition="all ease-in-out 0.4s"
                    color="secondary.300"
                    _hover={{
                      color: 'white',
                    }}
                    onClick={() => {
                      handleDeleteRPCSpecific.mutate(rpc);
                    }}
                  />
                </HStack>
              ))}
          </Flex>
        </RadioGroup>
        <Box>
          <Text variant="sub_title">Your Custom RPC (max 5)</Text>
          <Input
            my={4}
            placeholder="Import RPC here"
            variant="primary"
            onChange={event => {
              setOwnerRPC(() => event.target.value);
            }}
            value={ownerRPC}
          />
          <Button
            variant="long_btn"
            width="full"
            height={12}
            borderColor="secondary.100"
            onClick={() => {
              if (!isValidURL(ownerRPC)) {
                toast({
                  title: 'Error',
                  description: 'Invalid URL',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }
              if (dataOwnerRPC && dataOwnerRPC.length > 5) {
                toast({
                  title: 'Error',
                  description: 'Max 5 RPCs',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }
              if (dataOwnerRPC && dataOwnerRPC.includes(ownerRPC)) {
                toast({
                  title: 'Error',
                  description: 'RPC already exist in UserConfig',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }
              if (data && data.value.includes(ownerRPC)) {
                toast({
                  title: 'Error',
                  description: 'RPC already exist in DefaultConfig',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }

              hanldeAddRPC.mutate(ownerRPC);
            }}
          >
            Add RPC
          </Button>
        </Box>
        <Box>
          <Text variant="sub_title">Restore RPC list (Default)</Text>
          <Button
            variant="long_btn"
            my={4}
            width="full"
            borderColor="secondary.100"
            onClick={() => {
              handleRestoreRPC.mutate();
            }}
          >
            Restore
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default SettingRpc;
