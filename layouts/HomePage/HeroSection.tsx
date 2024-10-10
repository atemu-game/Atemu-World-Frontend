import { Box, Center, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import LogoLongIcon from '@/public/assets/logo/atemu_logo_long.svg';
import UnionIcon from '@/public/assets/arts/common/union_art.svg';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <Box position="relative">
      <Flex
        position="absolute"
        top={{ md: 100, base: '60%' }}
        left={{ md: 20, base: 0 }}
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
          mb={{ md: '34px', base: '1rem' }}
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
      <Image
        src="/assets/arts/common/banner_hero.gif"
        width={1374.8}
        priority={true}
        style={{
          width: '100%',
        }}
        unoptimized
        height={773.3}
        aria-label=""
        alt="Picture Atemu"
      />

      <Image
        src="/assets/arts/common/tester_art.svg"
        height={386}
        style={{ position: 'absolute', bottom: '-20%', left: 20 }}
        priority
        width={578}
        alt="Tester Art"
      />
      <Center>
        <Image
          src="/assets/arts/common/home_art_intro.svg"
          width={1269}
          height={721}
          alt="Home Art"
          priority={true}
          style={{
            position: 'absolute',
            bottom: '-80%',

            zIndex: -1,
          }}
        />
      </Center>
      <VStack position="absolute" right={{ md: 10, base: 0 }} bottom={'-15%'}>
        <Text
          variant="gradient_text"
          fontSize="32px"
          display={{ md: 'block', base: 'none' }}
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
