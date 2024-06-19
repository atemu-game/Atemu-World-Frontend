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
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const SettingRpc = () => {
  const [currentRPC, setCurrentRPC] = useState(ListPublicRPC[0]);
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
            {ListPublicRPC.map((rpc, index) => {
              return (
                <Radio
                  variant="primary"
                  key={`RPC-Select-${index}`}
                  value={rpc}
                  gap={2}
                >
                  {ellipseMiddle(rpc, 15, 15)}
                </Radio>
              );
            })}
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
