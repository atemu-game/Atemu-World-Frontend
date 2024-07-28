'use client';
import { Box, Flex, VStack } from '@chakra-ui/react';
import React from 'react';

import DescriptionSection from './DescriptionSection';

import FadeInVisible from '@/components/Animation/FadeInVisible';

import HeroSection from './HeroSection';
import FollowSection from './FollowSection';
import HowToPlay from './HowToPlay';

const HomePage = () => {
  return (
    <Flex
      flexDirection="column"
      gap={{ lg: '100px', md: '40px', base: '24px' }}
    >
      <FadeInVisible>
        <HeroSection />
      </FadeInVisible>

      <FadeInVisible>
        <DescriptionSection />
      </FadeInVisible>
      <FadeInVisible>
        <HowToPlay />
      </FadeInVisible>
      <FadeInVisible>
        <FollowSection />
      </FadeInVisible>
    </Flex>
  );
};

export default HomePage;
