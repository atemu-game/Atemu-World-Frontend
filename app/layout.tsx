import type { Metadata } from 'next';

import ProviderApp from '@/providers';
import localFont from 'next/font/local';
import Favicon from './favicon.ico';
import './custom.css';
const PixelMono = localFont({
  src: [
    {
      path: './fonts/PixelOperatorMono.ttf',
      weight: '400',
    },
    {
      path: './fonts/PixelOperatorMono-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-family-pixel-mono',
});
export const metadata: Metadata = {
  title: 'Atemu | Fully On-Chain Strategy Card Game ',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs ',
  metadataBase: new URL('https://www.atemu.xyz/'),
  icons: {
    icon: Favicon.src,
    shortcut: Favicon.src,
    apple: Favicon.src,
    other: { rel: 'apple-touch-icon-precomposed', url: Favicon.src },
  },
  keywords: ['Atemu'],
  openGraph: {
    title: 'Atemu',
    description: 'Atemu Game of RYG Labs',
    images: [
      {
        url: './public/assets/arts/home_bg.svg',
        width: 1200,
        height: 600,
        type: 'image/png',
      },
    ],
    locale: 'en_US',

    type: 'website',
    emails: 'karasbuilder@gmail.com',
    siteName: 'Atemu',
  },
  twitter: {
    title: 'Atemu | Fully On-Chain Strategy Card Game ',
    description:
      'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .Powered by RYG Labs.',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${PixelMono.className}`}>
        <ProviderApp>{children}</ProviderApp>
      </body>
    </html>
  );
}
