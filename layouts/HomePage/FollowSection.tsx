import { Button, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import UnionIcon from '@/public/assets/arts/common/union_art.svg';

import Link from 'next/link';
const FollowSection = () => {
  return (
    <VStack textAlign="center" width="full" gap={0}>
      <Text width="850px" variant="title_home">
        Be Part of the Next Big Thing in Fully On-chain Gaming
      </Text>
      <Text mt={4} mb="40px">
        Join the movement
      </Text>

      <Link href="https://x.com/Atemu_world" target="_blank">
        <Button variant="long_btn">Follow on X</Button>
      </Link>
      <Icon as={UnionIcon} height={4} w="auto" />
    </VStack>
  );
};

export default FollowSection;
