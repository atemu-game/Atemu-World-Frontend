import NotFoundPage from '@/layouts/NotFoundPage';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Atemu | NotFound',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs.',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function NotFound() {
  return <NotFoundPage />;
}
