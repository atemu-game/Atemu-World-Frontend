import React from 'react';
import LogoLong from '@/public/assets/logo/atemu_logo_long.svg';
import LogoShort from '@/public/assets/logo/atemu_logo.svg';
import { Icon, VStack, Text } from '@chakra-ui/react';
const DescriptionSection = () => {
  const ListContent = [
    "In the ancient land of Kemet, Pharaoh Atemu ruled with wisdom and might. Renowned as a master beast summoner, Atemu's prowess was unparalleled. Yet, his ambition led him to seek eternal life. One fateful night, he journeyed into the underworld to strike a deal with Anubis, the God of Death.Atemu reached Anubis's throne and boldly proposed, Grant me eternal life and rule, and I shall best you in any fight with my beasts.Intrigued by the pharaoh's reputation, Anubis agreed, conjuring a game of summoning beasts through enchanted cards. Defeat me, and your wish is granted. Lose, and you serve me eternally, Anubis declared.",
    "The game began, with Atemu and Anubis summoning legendary creatures that they know. Anubis's beasts proved formidable, pushing Atemu to the brink of defeat. Desperate, Atemu played a hidden card, trapping Anubis within it so he cannot continue playing.",
    '"You have lost, Anubis. Honor our deal," Atemu demanded. Bound by his own rules, Anubis restored Atemu\'s life but added a curse. "You shall rule forever, but within the Card World. Only summoned by a Card Master will you walk the living world."',
    "Thus, Atemu's soul was sealed in the game, his power unleashed only when summoned. The game of summoning cards spread across Kemet, becoming known as Atemu, honoring the first summoner who dared to play a game with Death.",
    'Generations later, the legend of Atemu and his powerful game endured. Card Masters, individuals who mastered the summoning arts, battled each other using the enchanted cards. Each duel was a test of strategy and might, with the ultimate goal of harnessing the legendary power of Atemu and other mythical beasts.Winning the game granted treasures hidden within the cards, but losing meant the Summoner soul would be trapped in the Card World, joining those who had lost before them. These trapped souls could only be freed by winning against Atemu himself in there',
    'For thousands of years, the legacy of Atemu continued, his soul eternally battling within the game, shaping the fates of those who dared to summon him.',
  ];
  return (
    <VStack>
      <Icon as={LogoShort} height={{ md: '86px', base: '42px' }} width="auto" />
      <Icon as={LogoLong} height={{ md: '180px', base: '90px' }} width="auto" />
      <VStack gap={6}>
        {ListContent.map((item, index) => (
          <Text
            textAlign="center"
            key={`Content Description ${index}`}
            variant="secondary"
          >
            {item}
          </Text>
        ))}
      </VStack>
    </VStack>
  );
};

export default DescriptionSection;
