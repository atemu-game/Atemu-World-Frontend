import type { Metadata } from 'next';

import ProviderApp from '@/providers';
import localFont from 'next/font/local';
import Favicon from './icon.ico';
import './custom.css';

const CrimsonPro = localFont({
  src: [
    {
      path: './fonts/CrimsonPro-ExtraLight.ttf',
      weight: '300',
    },
    {
      path: './fonts/CrimsonPro-Light.ttf',
      weight: '400',
    },
    {
      path: './fonts/CrimsonPro-Regular.ttf',
      weight: '500',
    },
    {
      path: './fonts/CrimsonPro-SemiBold.ttf',
      weight: '600',
    },
    {
      path: './fonts/CrimsonPro-ExtraBold.ttf',
      weight: '800',
    },
  ],
  variable: '--font-family-crimson-pro',
});
export const metadata: Metadata = {
  title: 'Atemu | Fully On-Chain Strategy Card Game ',
  description:
    'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .',
  metadataBase: new URL('https://www.atemu.xyz'),
  icons: {
    icon: Favicon.src,
    shortcut: Favicon.src,
    apple: Favicon.src,
    other: { rel: 'apple-touch-icon-precomposed', url: Favicon.src },
  },
  keywords: ['Atemu', 'CardGame on Starknet'],
  openGraph: {
    title: 'Atemu',
    description:
      'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .',
    images: [
      {
        url: './public/assets/arts/banner/home_banner.svg',
        width: 1200,
        height: 600,
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    url: 'https://www.atemu.xyz',
    type: 'website',
    emails: 'karasbuilder@gmail.com',
    siteName: 'Atemu',
  },
  twitter: {
    title: 'Atemu | Fully On-Chain Strategy Card Game ',
    description:
      'Collect, Battle & Conquer in the Fully On-Chain Strategy Card Game on @Starknet🎮 .',
    images: {
      url: './public/assets/arts/banner/home_banner.svg',
      width: 1200,
      height: 600,
      type: 'image/png',
      alt: 'Atemu Banner',
    },
    card: 'player',
    creator: '@ryglabs',
    players: {
      playerUrl: 'https://www.atemu.xyz',
      streamUrl: 'https://www.atemu.xyz',
      width: 600,
      height: 600,
    },
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
      <body className={`${CrimsonPro.className}`}>
        <ProviderApp>{children}</ProviderApp>
      </body>
    </html>
  );
}
