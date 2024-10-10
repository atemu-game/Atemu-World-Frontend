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
import ProviderSocket from './ProviderSocket';
import ProviderFuelSocket from './ProviderFuelSocket';

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderChakra>
      <ProviderStarknet>
        <ProviderQueryClient>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ProviderSocket>
                <ProviderFuelSocket>
                  <DefaultLayout>{children}</DefaultLayout>
                </ProviderFuelSocket>
              </ProviderSocket>
            </PersistGate>
          </Provider>
        </ProviderQueryClient>
      </ProviderStarknet>
      <ProviderScript />
    </ProviderChakra>
  );
};

export default ProviderApp;
