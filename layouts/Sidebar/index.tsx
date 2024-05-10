import { Box, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import HomeIcon from '@/public/assets/icons/home.svg';
import IncentiveIcon from '@/public/assets/icons/incentive_token.svg';
import LanguageIcon from '@/public/assets/icons/language.svg';
import LeaderIcon from '@/public/assets/icons/leaderboard.svg';

interface ListPageProps {
  link: string;
  label: string;
  icon: any;
}
const Sidebar = () => {
  const ListPage: ListPageProps[] = [
    {
      link: '/',
      icon: HomeIcon,
      label: 'Home',
    },
    {
      link: '/incentives',
      icon: IncentiveIcon,
      label: 'Incentives',
    },
    {
      link: '/incentives',
      icon: LanguageIcon,
      label: 'Trade-zone',
    },
    {
      link: '/leaderboard',
      icon: LeaderIcon,
      label: 'Incentives',
    },
  ];
  return (
    <Box
      display="flex"
      flexDir="column"
      gap={6}
      padding={6}
      borderRight="1px solid"
      minH="100vh"
      borderRightColor="divider.100"
    >
      {ListPage.map((item, index) => {
        return (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Icon as={item.icon} height={6} width={6} />
            <Text fontSize="lg" fontWeight={700}>
              {item.label}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Sidebar;
