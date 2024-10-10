import ProviderFuelSocket from '@/providers/ProviderFuelSocket';
import React, { PropsWithChildren } from 'react';

const LayoutFuel = ({ children }: PropsWithChildren) => {
  return <ProviderFuelSocket>{children}</ProviderFuelSocket>;
};

export default LayoutFuel;
