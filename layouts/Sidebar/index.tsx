import { Box, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import HomeIcon from '@/public/assets/icons/home.svg';
import IncentiveIcon from '@/public/assets/icons/incentive_token.svg';
import LanguageIcon from '@/public/assets/icons/language.svg';
import LeaderIcon from '@/public/assets/icons/leaderboard.svg';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
      link: '/trade-zone',
      icon: LanguageIcon,
      label: 'Trade-zone',
    },
    {
      link: '/leaderboard',
      icon: LeaderIcon,
      label: 'Incentives',
    },
  ];
  const path = usePathname();
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
        const pageActive = (): boolean => {
          if (item.link === '/') {
            //home
            return item.link === path;
          } else {
            if (path.includes(item.link)) {
              return path.includes(item.link);
            }
          }
          return false;
        };
        return (
          <Link href={item.link} key={index}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              transition="all 0.3s"
              opacity={pageActive() ? 1 : 0.5}
              _hover={{
                opacity: 1,
              }}
            >
              <Icon as={item.icon} height={6} width={6} />
              <Text fontSize="lg" fontWeight={700}>
                {item.label}
              </Text>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default Sidebar;
