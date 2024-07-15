import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useNumberInput,
} from '@chakra-ui/react';
import React from 'react';

const NumberSpinder = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 600,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack border="1px solid" borderColor="divider.100" gap={0}>
      <Button variant="secondary" fontWeight="bold" {...inc}>
        +
      </Button>
      <Input variant="primary" {...input} type="number" />

      <Button variant="secondary" fontWeight="bold" {...dec}>
        -
      </Button>
    </HStack>
  );
};

export default NumberSpinder;
