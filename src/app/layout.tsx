import ThemeToggle from '@/components/ThemeToggle'; // Import the theme toggle component
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add ThemeToggle at the top of the layout */}
        <div className="flex justify-end p-4 border-b dark:border-neutral-700">
          <ThemeToggle />
        </div>

        {/* Render the children */}
        {children}
      </body>
    </html>
  );
}
