'use client';

import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full">
        <nav className="w-full bg-black/60 backdrop-blur-md">
          <div className="flex justify-between items-center h-32 px-6 md:px-12">
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

            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-white hover:text-blue-400 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-900/90 backdrop-blur-md">
              <div className="px-4 pt-2 pb-6 space-y-4">
                <Link
                  href="/"
                  className="block text-white text-xl font-semibold hover:text-blue-400 transition-colors py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block text-white text-xl font-semibold hover:text-blue-400 transition-colors py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block text-white text-xl font-semibold hover:text-blue-400 transition-colors py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
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
  );
};

export default ClientLayout; 