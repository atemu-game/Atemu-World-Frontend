import Card from '@/components/Card';
import {
  Box,
  Button,
  Divider,
  Icon,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import UnionIcon from '@/public/assets/arts/common/union_art.svg';
import FadeInVisible from '@/components/Animation/FadeInVisible';
import { convertHex } from '@/utils/convertHex';
const HowToPlay = () => {
  const BliztPointSection = [
    'Earn Blitz Points by playing Blitz',
    'Boost your earnings: Invite friends for multiplier bonuses',
  ];

  const AtemuDifferentSection = [
    'Full Ownership: Trade or sell your cards anytime',
    'Free-care Gas Fees: Play as much as you want with the cheapest L2 gas costs on Starknet',
    'Fast Gameplay: Instant battles and transactions',
    'Earn Real Value: Collect, Build your deck and Compete with others',
  ];
  return (
    <Box width="full" position="relative">
      <Box position="absolute" right={0} height="100%" width="40%">
        <Image
          src="/assets/arts/common/home_art_blitz.svg"
          height={1998}
          width={709}
          style={{
            position: 'sticky',
            top: '-100px',
            right: '0px',
            zIndex: -2,
          }}
          alt=""
        />
      </Box>
      <FadeInVisible>
        <Text variant="title_home">Blitz points</Text>
        <Text
          color="#FFFFFFBF"
          textAlign="center"
          textShadow="0px 0px 2px #1E1E1E"
          mb="72px"
        >
          Your gateway to the Atemu Realm. Stack your points and build your deck
        </Text>
        <Card
          width="full"
          variant="shadow"
          padding={4}
          bg={convertHex('#1E1E1E', 0.5)}
        >
          <Box
            padding="60px"
            minH="500px"
            style={{
              border: '2px solid transparent',
              borderImageSlice: 2,
              borderImageSource:
                'linear-gradient(90.73deg, rgba(232, 183, 124, 0.5) -5.34%, rgba(253, 217, 105, 0.5) 51.67%, rgba(178, 113, 34, 0.5) 116.05%)',
            }}
            position="relative"
          >
            <VStack spacing={4} gap={0}>
              {BliztPointSection.map((item, index) => (
                <Box key={`${index}-box`}>
                  <Text
                    fontSize="24px"
                    fontWeight="medium"
                    color=" #FFFFFFBF"
                    textShadow="0px 0px 2px #1E1E1E"
                  >
                    {index + 1}.{item}
                  </Text>
                </Box>
              ))}

              <Box
                position="relative"
                height="300px"
                width="full"
                userSelect="none"
              >
                <VStack textAlign="center">
                  <Text
                    textAlign="center"
                    fontSize="24px"
                    fontWeight="medium"
                    color=" #FFFFFFBF"
                    textShadow="0px 0px 2px #1E1E1E"
                  >
                    3.Use Blitz Points to:
                  </Text>
                  <Divider
                    h={48}
                    borderWidth={1}
                    orientation="vertical"
                    borderColor="primary.100"
                  />
                  <Text position="relative" color="primary.100" fontSize="20px">
                    Join the Fuel - Wheel Of Fortune to Spin for rare OG cards
                  </Text>
                </VStack>
                <Box
                  position="absolute"
                  width="fit-content"
                  bottom="30%"
                  left="5%"
                >
                  <Text
                    position="relative"
                    color="primary.100"
                    fontSize="20px"
                    _after={{
                      content: "''",
                      position: 'absolute',
                      width: '400px',
                      top: '-80px',
                      height: '2px',
                      left: '50%',
                      background: 'primary.100',
                      transform: 'rotate(-20deg)',
                    }}
                  >
                    Enter tournaments with big prize pools
                  </Text>
                </Box>

                <Box
                  position="absolute"
                  width="fit-content"
                  bottom="30%"
                  right="5%"
                >
                  <Text
                    position="relative"
                    color="primary.100"
                    fontSize="20px"
                    _after={{
                      content: "''",
                      position: 'absolute',
                      width: '400px',
                      top: '-80px',
                      height: '2px',
                      right: '50%',
                      background: 'primary.100',
                      transform: 'rotate(20deg)',
                    }}
                  >
                    Buy exclusive Atemu items
                  </Text>
                </Box>
              </Box>
              <Button variant="primary">Enter</Button>
            </VStack>
          </Box>
        </Card>
      </FadeInVisible>
      <VStack mt="240px">
        <Text variant="title_home">Atemu is different</Text>
        <Text>Buy, Trade, Sell and Fight</Text>
        {AtemuDifferentSection.map((item, index) => (
          <Card
            width="full"
            variant="shadow"
            key={`${index}-card diff`}
            padding={4}
          >
            <Box
              py={6}
              style={{
                border: '2px solid transparent',
                borderImageSlice: 2,
                borderImageSource:
                  'linear-gradient(90.73deg, rgba(232, 183, 124, 0.5) -5.34%, rgba(253, 217, 105, 0.5) 51.67%, rgba(178, 113, 34, 0.5) 116.05%)',
              }}
              textAlign="center"
            >
              <Text fontSize="24px" fontWeight="medium">
                {item}
              </Text>
            </Box>
          </Card>
        ))}
      </VStack>
      <VStack textAlign="center" width="full" gap={0} py="240px">
        <Text
          width={{ lg: '850px', md: '600px', base: '300px' }}
          variant="title_home"
        >
          Be Part of the Next Big Thing in Fully On-chain Gaming
        </Text>
        <Text mt={4} mb="40px">
          Join the movement
        </Text>

        <Link href="https://x.com/Atemu_world" target="_blank">
          <Button variant="long_btn">Follow on X</Button>
        </Link>
        <Icon as={UnionIcon} height={4} w="auto" />
      </VStack>
    </Box>
  );
};

export default HowToPlay;
