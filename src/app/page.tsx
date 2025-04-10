"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Video Background */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/coding-bg-compressed.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Transforming Ideas into Digital Reality
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Professional coding solutions for modern businesses
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Frontend */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Redux & Context API</li>
                </ul>
              </div>
            </div>
            
            {/* Backend */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Backend</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Node.js & Express</li>
                  <li>Python & Django</li>
                  <li>GraphQL & REST APIs</li>
                  <li>MongoDB & PostgreSQL</li>
                </ul>
              </div>
            </div>
            
            {/* Cloud & DevOps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Cloud & DevOps</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>AWS & Azure</li>
                  <li>Docker & Kubernetes</li>
                  <li>CI/CD Pipelines</li>
                  <li>Infrastructure as Code</li>
                </ul>
              </div>
            </div>
            
            {/* Mobile & IoT */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Mobile & IoT</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>React Native</li>
                  <li>Flutter</li>
                  <li>IoT Solutions</li>
                  <li>Embedded Systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Showcase */}
      <section className="py-20 bg-gray-900 overflow-hidden border-t border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Innovative Solutions for Modern Challenges</h2>
              <p className="text-lg mb-8 text-white/90">
                We combine cutting-edge technologies with creative problem-solving to deliver solutions that drive business growth and technological advancement.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Custom Software Development</h3>
                    <p className="text-white/80">Tailored solutions designed to meet your specific business needs and challenges.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Secure & Scalable Architecture</h3>
                    <p className="text-white/80">Robust systems built with security and scalability as core principles.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Collaborative Development</h3>
                    <p className="text-white/80">Working closely with clients to ensure solutions align with business goals.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-300"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-900/20 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* E-commerce Platform */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="w-full h-40 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image 
                  src="/assets/pexels-shvetsa-5614119.jpg" 
                  alt="E-commerce Platform" 
                  width={400} 
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">E-commerce Platform</h3>
              <p className="text-white/70 mb-4">A modern e-commerce solution with advanced filtering, search, and payment integration.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">MongoDB</span>
              </div>
            </div>
            {/* Mobile Application */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="w-full h-40 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image 
                  src="/assets/pexels-mediamodifier-61455177-8066712.jpg" 
                  alt="Mobile Application" 
                  width={400} 
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Mobile Application</h3>
              <p className="text-white/70 mb-4">A secure and intuitive mobile application with modern UI/UX and real-time functionality.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">React Native</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Firebase</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">AWS</span>
              </div>
            </div>
            {/* Cloud Analytics Dashboard */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="w-full h-40 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image 
                  src="/assets/pexels-goumbik-577195.jpg" 
                  alt="Cloud Analytics Dashboard" 
                  width={400} 
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Cloud Analytics Dashboard</h3>
              <p className="text-white/70 mb-4">A comprehensive analytics platform that processes and visualizes data from multiple sources in real-time.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Vue.js</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">AWS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 overflow-hidden border-t border-b border-black">
        <div className="container mx-auto px-4">
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Build Something Amazing?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help bring your innovative ideas to life with our technical expertise.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-black"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
