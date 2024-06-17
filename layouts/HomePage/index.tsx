'use client';
import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import IncentiveSection from './IncentiveSection';
import DescriptionSection from './DescriptionSection';
import HowToPlaySection from './HowToPlaySection';
import CardTypeSection from './CardTypeSection';
import BettingSection from './BettingSection';
import FadeInVisible from '@/components/Animation/FadeInVisible';

const HomePage = () => {
  return (
    <Flex
      flexDirection="column"
      gap={{ lg: '100px', md: '40px', base: '24px' }}
    >
      <Image
        src="/assets/arts/home_bg.svg"
        objectFit="cover"
        width={1374.8}
        height={773.3}
        aria-label=""
        alt=""
      />
      <IncentiveSection />
      <FadeInVisible>
        <DescriptionSection />
      </FadeInVisible>
      <FadeInVisible>
        <VStack width="full">
          <video width="full" height="auto" controls>
            <source src="/assets/videos/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VStack>
      </FadeInVisible>
      <FadeInVisible>
        <HowToPlaySection />
      </FadeInVisible>
      <FadeInVisible>
        <BettingSection />
      </FadeInVisible>

      <FadeInVisible>
        <CardTypeSection />
      </FadeInVisible>
    </Flex>
  );
};

export default HomePage;
