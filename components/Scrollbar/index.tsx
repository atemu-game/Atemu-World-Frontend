import { Box, BoxProps, SystemStyleObject } from '@chakra-ui/react';

import React, { PropsWithChildren } from 'react';

export const scrollbarThumb = (rest?: SystemStyleObject) => ({
  '::-webkit-scrollbar-thumb': {
    bg: '#119DF7',
    borderRadius: '1rem',
    ...rest,
  },
});

export const scrollbarWebkit = (rest?: SystemStyleObject) => ({
  '::-webkit-scrollbar': {
    height: '0.1875rem',
    bg: 'inherit',
    ...rest,
  },
});

type ScrollbarProps = PropsWithChildren & BoxProps;
type Props = {
  alway?: boolean;
};

export default function Scrollbar({
  children,
  alway,
  ...rest
}: ScrollbarProps & Props) {
  return (
    <Box
      overflow={{ md: 'auto', base: 'none' }}
      // height="100%"
      _hover={scrollbarThumb({
        bg: '#DFAA6C',
        width: '5px',
      })}
      sx={{
        ...(alway
          ? scrollbarThumb({
              bg: '#DFAA6C',
              width: '5px',
            })
          : {}),
        ...scrollbarWebkit({
          width: '5px',
          height: 2,
        }),
        '::-webkit-scrollbar-corner': {
          display: 'none',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
