'use client'

import { Inter } from "next/font/google";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBox from '@/components/SearchBox'
import OrderCall from '../components/OrderCall'
import MobileMenu from '../components/MobileMenu'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/next.svg" type="image/x-icon" />
      </head>
      
      <body className={inter.className}>
          <Header />
              <SearchBox />
              <OrderCall />
              <MobileMenu />
              <main className='main-content'>{children}</main>
            <Footer />
      </body>

      
    </html>
  );
}
