import React from 'react';

import { HStack, Text, TextProps } from '@chakra-ui/react';
interface IProps {
  value: number;
  type: string;
  isDanger?: boolean;
  style?: TextProps;
}
const DateTimeDisplay = ({ value, type, isDanger, style }: IProps) => {
  return (
    <HStack gap={0}>
      <Text
        variant="gradient_text"
        bg={isDanger ? 'red.400' : 'gradient.100'}
        {...style}
      >
        {value}
      </Text>
      <Text
        variant="gradient_text"
        bg={isDanger ? 'red.400' : 'gradient.100'}
        {...style}
      >
        {type}
      </Text>
    </HStack>
  );
};

export default DateTimeDisplay;
