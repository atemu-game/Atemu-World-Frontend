import type { Metadata } from 'next';

import ProviderApp from '@/providers';
import localFont from 'next/font/local';
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
  title: 'Flex Game | The HomePage ',
  description: 'Generated by create next app',
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
