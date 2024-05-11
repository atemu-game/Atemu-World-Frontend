'use client';
import React, { PropsWithChildren } from 'react';
import ProviderChakra from './ProviderChakra';
import ProviderScript from './ProviderScript';
import DefaultLayout from '@/layouts';
import ProviderStarknet from './ProviderStarknet';
import ProviderWalletContext from './ProviderContext';

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderChakra>
      <ProviderStarknet>
        <ProviderWalletContext>
          <DefaultLayout>{children}</DefaultLayout>
        </ProviderWalletContext>
      </ProviderStarknet>

      <ProviderScript />
    </ProviderChakra>
  );
};

export default ProviderApp;
