import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Web3Provider } from '../context/Web3Context';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DiploChain - Vérification de Diplômes',
  description:
    'DApp de vérification et authentification de diplômes sur blockchain',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
