import LeaderPage from '@/layouts/LeaderBoardPage';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Atemu | LeaderBoard',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs.',
};
const LeaderBoard = () => {
  return <LeaderPage />;
};

export default LeaderBoard;
