import React from 'react';

import { HStack, Text } from '@chakra-ui/react';
interface IProps {
  value: number;
  type: string;
  isDanger: boolean;
}
const DateTimeDisplay = ({ value, type, isDanger }: IProps) => {
  return (
    <HStack gap={0}>
      <Text variant="gradient_text" bg={isDanger ? 'red.400' : 'gradient.100'}>
        {value}
      </Text>
      <Text variant="gradient_text" bg={isDanger ? 'red.400' : 'gradient.100'}>
        {type}
      </Text>
    </HStack>
  );
};

export default DateTimeDisplay;
