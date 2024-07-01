'use client';
import React, { PropsWithChildren } from 'react';
import ProviderChakra from './ProviderChakra';
import ProviderScript from './ProviderScript';
import DefaultLayout from '@/layouts';
import ProviderStarknet from './ProviderStarknet';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProviderQueryClient from './ProviderQueryClient';

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderChakra>
      <ProviderStarknet>
        <ProviderQueryClient>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <DefaultLayout>{children}</DefaultLayout>
            </PersistGate>
          </Provider>
        </ProviderQueryClient>
      </ProviderStarknet>
      <ProviderScript />
    </ProviderChakra>
  );
};

export default ProviderApp;
