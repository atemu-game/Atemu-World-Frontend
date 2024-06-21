import ExplorerPage from '@/layouts/ExplorerPage';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Atemu | Explorer',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs.',
};

const Explorer = () => {
  return <ExplorerPage />;
};

export default Explorer;
