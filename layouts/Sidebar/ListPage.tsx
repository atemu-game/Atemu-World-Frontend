import React from 'react';
import HomeIcon from '@/public/assets/icons/home.svg';
import IncentiveIcon from '@/public/assets/icons/incentive_token.svg';
import LanguageIcon from '@/public/assets/icons/language.svg';
import LeaderIcon from '@/public/assets/icons/leaderboard.svg';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box, BoxProps, Icon, Text } from '@chakra-ui/react';

interface ListPageProps {
  link: string;
  label: string;
  icon: any;
}
interface IProps {
  sx?: BoxProps;
}
const ListPage = ({ sx }: IProps) => {
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
      label: 'LeaderBoard',
    },
  ];
  const path = usePathname();
  return (
    <>
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
              color={pageActive() ? 'white' : 'inherit'}
              _hover={{
                color: 'white',
              }}
              {...sx}
            >
              <Icon as={item.icon} height={6} width={6} />
              <Text fontSize="lg" fontWeight={700}>
                {item.label}
              </Text>
            </Box>
          </Link>
        );
      })}
    </>
  );
};

export default ListPage;
