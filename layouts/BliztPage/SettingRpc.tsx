import { axiosHandlerNoBearer } from '@/config/axiosConfig';
import { ListPublicRPC } from '@/utils/constants';
import { ellipseMiddle } from '@/utils/formatAddress';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

const SettingRpc = () => {
  const [currentRPC, setCurrentRPC] = useState(ListPublicRPC[0]);
  const { data, isLoading } = useQuery({
    queryKey: 'default-rpc',
    queryFn: async () => {
      const { data } = await axiosHandlerNoBearer.get('/system/defaultRPC');
      return data.data;
    },
  });
  // const { data: dataOwnerRPC, isLoading: isLoadingOwnerRPC } = useQuery({
  //   queryKey: 'owner-rpc',
  //   queryFn: async () => {
  //     const { data } = await axiosHandlerNoBearer.get('/setting/customRPC');
  //     return data.data;
  //   },
  // });

  // console.log(dataOwnerRPC);
  return (
    <>
      <Box
        padding={4}
        border="1px solid"
        borderColor="divider.100"
        maxW={{ lg: '400px', base: 'full' }}
        width={'full'}
        display="flex"
        flexDirection="column"
        gap={6}
      >
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
              data.value.map((rpc: string, index: number) => (
                <Radio
                  variant="primary"
                  key={`RPC-Select-${index}-${rpc}`}
                  value={rpc}
                  gap={2}
                >
                  {ellipseMiddle(rpc, 15, 15)}
                </Radio>
              ))}
          </Flex>
        </RadioGroup>

        <Button variant="primary" width="full" borderColor="secondary.100">
          Save
        </Button>
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter px="4" bg="body" fontWeight="bold">
            or
          </AbsoluteCenter>
        </Box>
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
            data.value.map((rpc: string, index: number) => (
              <Radio
                variant="primary"
                key={`RPC-Select-${index}-${rpc}`}
                value={rpc}
                gap={2}
              >
                {ellipseMiddle(rpc, 15, 15)}
              </Radio>
            ))}
        </Flex>
        <Box>
          <Text variant="sub_title">Your Custom RPC (max 5)</Text>
          <Input my={4} placeholder="Import RPC here" variant="primary" />
          <Button variant="primary" width="full" borderColor="secondary.100">
            Add RPC
          </Button>
        </Box>
        <Box>
          <Text variant="sub_title">Restore RPC list (Default)</Text>
          <Button
            variant="primary"
            my={4}
            width="full"
            borderColor="secondary.100"
          >
            Restore
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SettingRpc;
