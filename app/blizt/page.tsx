import BliztPage from '@/layouts/BliztPage';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Atemu | Explorer',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs.',
};

const Explorer = () => {
  return <BliztPage />;
};

export default Explorer;
