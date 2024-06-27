import React from 'react';
import HomeIcon from '@/public/assets/icons/home.svg';
import IncentiveIcon from '@/public/assets/icons/incentive_token.svg';
import LanguageIcon from '@/public/assets/icons/language.svg';
import FuelIcon from '@/public/assets/icons/gas.svg';
import BliztIcon from '@/public/assets/icons/explore.svg';
import LeaderIcon from '@/public/assets/icons/leaderboard.svg';
import { usePathname } from 'next/navigation';

import { Box, BoxProps, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface ListPageProps {
  link: string;
  label: string;
  icon: any;
  isDisabled?: boolean;
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
      link: '/blizt',
      icon: BliztIcon,
      label: 'Blizt',
    },
    {
      link: '/fuel',
      icon: FuelIcon,
      label: 'Fuel',
    },
    {
      link: '/incentives',
      icon: IncentiveIcon,
      label: 'Incentives',
      isDisabled: true,
    },
    {
      link: '/trade-zone',
      icon: LanguageIcon,
      label: 'Trade-zone',
      isDisabled: true,
    },
    {
      link: '/leaderboard',
      icon: LeaderIcon,
      label: 'Upcoming',
      isDisabled: true,
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
          <>
            {item.isDisabled ? (
              <Box
                key={`${item.label}-${index}`}
                display="flex"
                alignItems="center"
                flexDirection="column"
                transition="all 0.3s"
                cursor="not-allowed"
                {...sx}
              >
                <Icon as={item.icon} height={6} width={6} />
                <Text fontSize="lg" fontWeight={700}>
                  {item.label}
                </Text>
              </Box>
            ) : (
              <Link href={item.link} key={item.label}>
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
            )}
          </>
        );
      })}
    </>
  );
};

export default ListPage;
