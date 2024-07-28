import { Box, Button, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import UnionIcon from '@/public/assets/arts/common/union_art.svg';
const FollowSection = () => {
  return (
    <VStack textAlign="center" width="full" gap={0}>
      <Text
        variant="gradient_text"
        fontSize="52px"
        fontWeight="semibold"
        width="850px"
        lineHeight="normal"
        textTransform="uppercase"
      >
        Be Part of the Next Big Thing in Fully On-chain Gaming
      </Text>
      <Text mt={4} mb="40px">
        Join the movement
      </Text>
      <Button variant="long_btn">Follow on X</Button>
      <Icon as={UnionIcon} height={4} w="auto" />
    </VStack>
  );
};

export default FollowSection;
