import React from 'react';

import { usePathname } from 'next/navigation';

import { Box, BoxProps, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { colors } from '@/themes';
import Image from 'next/image';

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
      icon: '/assets/arts/sidebar/home.svg',
      label: 'Home',
    },
    {
      link: '/blitz',
      icon: '/assets/arts/sidebar/blitz.svg',
      label: 'Blitz',
    },
    {
      link: '/fuel',
      icon: '/assets/arts/sidebar/fuel.svg',
      label: 'Fuel',
      // isDisabled: true,
    },
    {
      link: '/leaderboard',
      icon: '/assets/arts/sidebar/leaderboard.svg',
      label: 'Leaderboard',
    },
    {
      link: '/spin-of-fate',
      icon: '/assets/arts/sidebar/spin.svg',
      label: 'Spin Of Fate',
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
          <React.Fragment key={`link-page-${item.label}-${index}`}>
            {item.isDisabled ? (
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                transition="all 0.3s"
                cursor="not-allowed"
                textAlign="center"
                opacity={0.5}
                {...sx}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  height={48}
                  width={48}
                />
                <Text fontWeight={700}>{item.label}</Text>
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
                  <Image
                    src={item.icon}
                    alt={item.label}
                    height={48}
                    width={48}
                  />
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
