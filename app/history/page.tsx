import HistoryPage from '@/layouts/HistoryPage';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Atemu | History Fuel',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs.',
};
const History = () => {
  return <HistoryPage />;
};

export default History;
