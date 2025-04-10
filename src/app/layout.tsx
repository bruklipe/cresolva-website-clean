import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cresolva - Professional Coding Solutions",
  description: "Transform your ideas into digital reality with our professional coding solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 w-full">
            <nav className="w-full">
              <div className="flex justify-between items-center h-32 backdrop-blur-sm px-10 mx-2">
                <Link href="/" className="flex items-center">
                  <Image 
                    src="/assets/logo.png" 
                    alt="CreSolva Logo" 
                    width={180} 
                    height={55} 
                    className="mr-2"
                    priority
                  />
                </Link>
                
                <div className="hidden md:flex items-center space-x-16">
                  <Link
                    href="/"
                    className="text-white text-2xl font-semibold hover:text-blue-400 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-white text-2xl font-semibold hover:text-blue-400 transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white text-2xl font-semibold hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </div>

                <button className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </nav>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Cresolva</h3>
                  <p className="text-gray-400">
                    Professional coding solutions for projects of all sizes. From small applications to enterprise-level systems.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>Email: cresolvami@gmail.com</li>
                    <li>Phone: (313) 686-1358</li>
                    <li>Location: Detroit, MI</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Cresolva. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
