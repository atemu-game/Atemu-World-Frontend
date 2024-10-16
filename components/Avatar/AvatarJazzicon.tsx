import { BoxProps } from '@chakra-ui/react';
import React from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';

interface AccountJazziconProps {
  address: string;
  sx?: BoxProps;
}

export default function AccountJazzicon({ address, sx }: AccountJazziconProps) {
  return (
    <Jazzicon
      paperStyles={{
        border: '0.09375rem solid',
        borderColor: 'currentColor',
        color: 'transparent',
        borderRadius: '100%',
        width: '2rem',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      svgStyles={{
        width: '100%',
        height: '100%',
      }}
      seed={jsNumberForAddress(address)}
    />
  );
}
