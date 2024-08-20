import { ChakraNextImage } from '@/components/Image/ChakraNextImage';
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Image as ChakraImage,
} from '@chakra-ui/react';
import React from 'react';
import LogoLongIcon from '@/public/assets/logo/atemu_logo_long.svg';
import UnionIcon from '@/public/assets/arts/common/union_art.svg';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <Box position="relative">
      <Flex
        position="absolute"
        top={100}
        left={20}
        flexDir="column"
        zIndex="modal"
        textAlign="center"
      >
        <Icon as={LogoLongIcon} width="full" height="138px" />
        <Text
          fontSize="24px"
          fontWeight="bold"
          color="primary.400"
          textTransform="uppercase"
          mb="34px"
          style={{
            textShadow:
              '-1px -1px 0 #B27122, 1px -1px 0 #B27122, -1px 1px 0 #B27122, 1px 1px 0 #B27122',
          }}
        >
          Collect, battle, dominate
        </Text>
        <Text
          textAlign="center"
          color="primary.400"
          fontWeight="medium"
          textShadow="0px 0px 2px #1E1E1E"
        >
          The First Fully On-Chain Card Game on Starknet
          <br /> Where Strategy Meets Legends and Your Cards fuel Battles
        </Text>
      </Flex>
      <ChakraNextImage
        src="/assets/arts/banner/home_banner.svg"
        width={1374.8}
        height={773.3}
        aria-label=""
        alt="Picture Atemu"
      />
      {/* <ChakraImage
        src="/assets/arts/banner/home_banner.svg"
        aria-label=""
        width="100%"
        alt="Picture Atemu"
      /> */}

      <Image
        src="/assets/arts/common/tester_art.svg"
        height={386}
        style={{ position: 'absolute', bottom: '-20%', left: 20 }}
        priority
        width={578}
        alt="Tester Art"
      />
      <Image
        src="/assets/arts/common/home_art_intro.svg"
        width={1269}
        height={721}
        alt="Home Art"
        style={{ position: 'absolute', bottom: '-100%', left: 20, zIndex: -1 }}
      />
      <VStack position="absolute" right={10} bottom={-20}>
        <Text
          variant="gradient_text"
          fontSize="32px"
          fontWeight="semibold"
          textTransform="uppercase"
        >
          OG Collection is launching soon
        </Text>
        <Icon as={UnionIcon} height={4} w="auto" />
      </VStack>
    </Box>
  );
};

export default HeroSection;
