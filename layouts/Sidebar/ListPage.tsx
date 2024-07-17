import React from 'react';
import HomeIcon from '@/public/assets/arts/sidebar/home.svg';

import FuelIcon from '@/public/assets/arts/sidebar/fuel.svg';
import BlitzIcon from '@/public/assets/arts/sidebar/blitz.svg';
import LeaderboardIcon from '@/public/assets/arts/sidebar/leaderboard.svg';
import SpinIcon from '@/public/assets/arts/sidebar/spin.svg';
import { usePathname } from 'next/navigation';

import { Box, BoxProps, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { colors } from '@/themes';

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
      link: '/blitz',
      icon: BlitzIcon,
      label: 'Blitz',
    },
    {
      link: '/fuel',
      icon: FuelIcon,
      label: 'Fuel',
    },
    {
      link: '/spin-of-fate',
      icon: SpinIcon,
      label: 'Spin Of Fate',
    },
    {
      link: '/leaderboard',
      icon: LeaderboardIcon,
      label: 'Leaderboard',
    },

    // {
    //   link: '/incentives',
    //   icon: IncentiveIcon,
    //   label: 'Incentives',
    //   isDisabled: true,
    // },
    // {
    //   link: '/trade-zone',
    //   icon: LanguageIcon,
    //   label: 'Trade-zone',
    //   isDisabled: true,
    // },
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
          <React.Fragment key={`link-page-${item.label}-${index}`}>
            {item.isDisabled ? (
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                transition="all 0.3s"
                cursor="not-allowed"
                textAlign="center"
                {...sx}
              >
                <Icon as={item.icon} height={6} width={6} />
                <Text fontWeight={600}>{item.label}</Text>
              </Box>
            ) : (
              <Link
                href={item.link}
                style={{
                  width: '100%',
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  py={2}
                  transition="all 0.3s"
                  background={pageActive() ? 'primary.300' : 'transparent'}
                  boxShadow={pageActive() ? colors.boxShadow[100] : 'none'}
                  borderLeft={
                    pageActive() ? '8px solid' : '8px solid transparent'
                  }
                  borderLeftColor={pageActive() ? 'primary.100' : 'transparent'}
                  color={pageActive() ? 'primary.100' : 'inherit'}
                  _hover={{
                    color: 'primary.100',
                  }}
                  {...sx}
                >
                  <Icon as={item.icon} height={12} width={12} />
                  <Text fontWeight={700}>{item.label}</Text>
                </Box>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ListPage;
