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
    <HStack
      width="full"
      gap={0}
      style={{
        color: 'primary.300',
        cursor: 'pointer',
        background: 'primary.100',
        borderRadius: '0',
        border: '2px solid transparent',
        borderImageSlice: 2,
        borderImageSource: `linear-gradient(90.73deg, #E8B77C -5.34%, #FDD969 51.67%, #B27122 116.05%)`,
      }}
    >
      <Button
        variant="secondary"
        fontWeight="bold"
        border="none"
        fontSize="lg"
        {...inc}
      >
        +
      </Button>
      <Input
        variant="primary"
        type="number"
        border="none"
        textAlign="center"
        {...input}
      />

      <Button
        variant="secondary"
        border="none"
        fontWeight="bold"
        fontSize="lg"
        {...dec}
      >
        -
      </Button>
    </HStack>
  );
};

export default NumberSpinder;
