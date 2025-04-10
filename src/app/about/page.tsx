"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Trigger animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fadeIn');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Interactive Background */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        {/* Interactive Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900">
          {/* Animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
              style={{ 
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` 
              }}
            ></div>
            <div 
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
              style={{ 
                transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` 
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
              style={{ 
                transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) translate(-50%, -50%)` 
              }}
            ></div>
          </div>
          
          {/* Code particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute text-xs text-white/30 font-mono"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                  transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                }}
              >
                {['const', 'let', 'function', 'return', 'import', 'export', 'async', 'await', 'class', 'interface'][Math.floor(Math.random() * 10)]}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight animate-on-scroll">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-on-scroll">
              Building innovative solutions since 2025
            </p>
            <div className="flex justify-center space-x-4 animate-on-scroll">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse animation-delay-300"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse animation-delay-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Skills Showcase */}
      <section className="py-20 bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white animate-on-scroll">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-on-scroll">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Technical Excellence</h3>
              <p className="text-lg mb-8 text-white/90">
                Our team brings together decades of combined experience in software development, 
                with expertise spanning the entire technology stack.
              </p>
              <div className="space-y-4">
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300">Frontend Development</h4>
                    <p className="text-white/80">React, Next.js, TypeScript, Tailwind CSS</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 group-hover:text-cyan-400 transition-colors duration-300">Backend Development</h4>
                    <p className="text-white/80">Node.js, Python, GraphQL, REST APIs</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 group-hover:text-indigo-400 transition-colors duration-300">Cloud & DevOps</h4>
                    <p className="text-white/80">AWS, Azure, Docker, Kubernetes</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300">Mobile & IoT</h4>
                    <p className="text-white/80">React Native, Flutter, IoT Solutions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border border-gray-700 animate-on-scroll">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 z-10"></div>
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
              {/* Interactive code snippets */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
                <div className="font-mono text-xs text-white/70 overflow-hidden">
                  <div className="animate-typing whitespace-nowrap">
                    <span className="text-blue-400">const</span> <span className="text-yellow-400">project</span> = <span className="text-green-400">new</span> <span className="text-indigo-400">Project</span>({'{'}
                    <br />
                    &nbsp;&nbsp;<span className="text-orange-400">name:</span> <span className="text-green-400">&apos;Your Vision&apos;</span>,
                    <br />
                    &nbsp;&nbsp;<span className="text-orange-400">tech:</span> [<span className="text-green-400">&apos;React&apos;</span>, <span className="text-green-400">&apos;Node.js&apos;</span>, <span className="text-green-400">&apos;AWS&apos;</span>],
                    <br />
                    &nbsp;&nbsp;<span className="text-orange-400">success:</span> <span className="text-blue-400">true</span>
                    <br />
                    {'}'});
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-on-scroll">Who We Are</h2>
          
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center mb-12 animate-on-scroll">
            <button 
              onClick={() => setActiveTab('mission')}
              className={`px-6 py-3 text-lg font-medium rounded-lg mr-4 mb-4 transition-all ${
                activeTab === 'mission' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              Our Mission
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-6 py-3 text-lg font-medium rounded-lg mr-4 mb-4 transition-all ${
                activeTab === 'team' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              Our Team
            </button>
            <button 
              onClick={() => setActiveTab('approach')}
              className={`px-6 py-3 text-lg font-medium rounded-lg mr-4 mb-4 transition-all ${
                activeTab === 'approach' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              Our Approach
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'mission' && (
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  At Cresolva, our mission is to transform ideas into digital reality. We believe in the power of technology to solve complex problems and create new opportunities for businesses of all sizes.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Founded in 2025, we&apos;re a new company with a fresh perspective on technology and innovation. Our team brings together experienced professionals who are passionate about creating cutting-edge solutions.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We&apos;re committed to staying at the forefront of technological advancement, continuously learning and adapting to new technologies and methodologies to provide our clients with innovative solutions.
                </p>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Our Team</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Our diverse team brings together expertise from various fields, including software development, UI/UX design, cloud architecture, and project management. We&apos;re passionate about technology and committed to staying at the forefront of industry trends.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6 text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Development Team</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Expert coders and problem solvers</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6 text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Design Team</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Creative minds and UX experts</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6 text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Project Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Efficient coordinators and planners</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'approach' && (
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Our Approach</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  We believe in a collaborative, iterative approach to software development. Our process begins with understanding your business needs and goals, followed by careful planning and design, and then implementation with regular feedback and adjustments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6 group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h4 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors duration-300">Discovery & Planning</h4>
                    <p className="text-gray-600 dark:text-gray-300">We start by understanding your requirements and creating a detailed project plan.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6 group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h4 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors duration-300">Design & Architecture</h4>
                    <p className="text-gray-600 dark:text-gray-300">We design the system architecture and user interfaces based on best practices.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6 group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h4 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors duration-300">Development & Testing</h4>
                    <p className="text-gray-600 dark:text-gray-300">We develop the solution with regular testing and quality assurance.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6 group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h4 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors duration-300">Deployment & Support</h4>
                    <p className="text-gray-600 dark:text-gray-300">We deploy the solution and provide ongoing support and maintenance.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vision & Future Section (Replacing Journey) */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-on-scroll">Our Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Innovation</h3>
              <p className="text-white/80">
                We&apos;re committed to pushing the boundaries of what&apos;s possible with technology, creating innovative solutions that solve real-world problems.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Partnership</h3>
              <p className="text-white/80">
                We believe in building strong, collaborative relationships with our clients, working together to achieve shared goals and drive success.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-indigo-400">Excellence</h3>
              <p className="text-white/80">
                We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations and drive business growth.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center animate-on-scroll">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Our Future</h3>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              As a new company founded in 2025, we&apos;re excited about the future and the opportunities ahead. We&apos;re building a team of talented professionals who share our vision and are committed to delivering exceptional results.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse animation-delay-300"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse animation-delay-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-on-scroll">
            Let&apos;s discuss how we can help bring your ideas to life with our technical expertise and innovative solutions.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-on-scroll"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
} 