import theme from "@/themes";
import { ChakraProvider } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

const ProviderChakra = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};

export default ProviderChakra;
