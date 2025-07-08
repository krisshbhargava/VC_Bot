import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BuildingOffice2Icon, UserIcon } from "@heroicons/react/24/outline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Due Diligence Platform",
  description: "Professional-grade due diligence and analysis platform.",
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
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <BuildingOffice2Icon className="w-7 h-7 text-blue-600" />
              <span className="text-2xl font-extrabold text-gray-900">VentureScope</span>
            </Link>
            <span className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm font-medium">Due Diligence Platform</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/pipelines" className="text-gray-700 font-semibold hover:text-blue-600 transition">Pipelines</Link>
            <Link href="/settings" className="text-gray-700 font-semibold hover:text-blue-600 transition">Settings</Link>
          </div>
          <Link href="/account" className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 font-semibold hover:bg-gray-50 transition">
            <UserIcon className="w-5 h-5" />
            Account
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
