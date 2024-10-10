import FuelPage from '@/layouts/FuelPage';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Atemu | Fuel',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs.',
};
const Fuel = () => {
  return <FuelPage />;
};

export default Fuel;
