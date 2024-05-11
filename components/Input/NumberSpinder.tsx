import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
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
    <HStack border="1px solid" borderColor="divider.100">
      <Button variant="unstyled" {...inc}>
        +
      </Button>
      <Input variant="unstyled" {...input} type="number" />
      <Button variant="unstyled" {...dec}>
        -
      </Button>
    </HStack>
  );
};

export default NumberSpinder;
