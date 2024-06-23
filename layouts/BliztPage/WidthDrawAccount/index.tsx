import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';

// WidthDrawAccount Payer component Modal
const WidthDrawAccount = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="primary">Width Draw (Payer Account)</Button>
    </>
  );
};

export default WidthDrawAccount;
