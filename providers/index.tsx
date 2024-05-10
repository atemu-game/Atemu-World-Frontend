'use client';
import React, { PropsWithChildren } from 'react';
import ProviderChakra from './ProviderChakra';
import ProviderScript from './ProviderScript';

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderChakra>
      {children}
      <ProviderScript />
    </ProviderChakra>
  );
};

export default ProviderApp;
