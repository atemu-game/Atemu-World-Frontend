'use client';
import React, { PropsWithChildren } from 'react';
import ProviderChakra from './ProviderChakra';
import ProviderScript from './ProviderScript';
import DefaultLayout from '@/layouts';

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderChakra>
      <DefaultLayout>{children}</DefaultLayout>
      <ProviderScript />
    </ProviderChakra>
  );
};

export default ProviderApp;
