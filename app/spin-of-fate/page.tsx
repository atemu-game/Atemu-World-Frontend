import SpinOfFatePage from '@/layouts/SpinOfFate';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Atemu | Spin Of Fate',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs.',
};
const SpinOfFate = () => {
  return <SpinOfFatePage />;
};

export default SpinOfFate;
