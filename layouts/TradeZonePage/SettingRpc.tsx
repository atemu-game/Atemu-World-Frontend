import { ListPublicRPC } from '@/utils/constants';
import { ellipseMiddle } from '@/utils/formatAddress';
import {
  AbsoluteCenter,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';
interface IProps {
  onSelectRPC: (rpc: string) => void;
}
const SettingRpc = () => {
  return (
    <>
      <Box
        padding={4}
        border="1px solid"
        borderColor="divider.100"
        maxW="400px"
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
        <Flex flexDirection="column" gap={4}>
          {ListPublicRPC.map((rpc, index) => {
            return (
              <Checkbox key={`RPC-Select-${index}`}>
                {ellipseMiddle(rpc, 15, 8)}
              </Checkbox>
            );
          })}
        </Flex>
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
          <Text variant="sub_title">Your Custom RPC</Text>
          <Input my={4} placeholder="Import RPC here" variant="primary" />
          <Button variant="primary" width="full" borderColor="secondary.100">
            Add RPC
          </Button>
        </Box>
        <Box>
          <Text variant="sub_title">Restore RPC list</Text>
          <Button variant="primary" width="full" borderColor="secondary.100">
            Restore
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SettingRpc;
