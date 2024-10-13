import type { Metadata } from "next";
import localFont from "next/font/local";
import { cx } from "../../utils";
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kishore's Portfolio",
  description: "Modern and Minimalistic Next Js Portfolio and Blog website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cx(`${geistSans.variable} ${geistMono.variable} antialiased`)}
      >
        {children}
      </body>
    </html>
  );
}
