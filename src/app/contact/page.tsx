'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LiveChat from '../../components/LiveChat';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeTab, setActiveTab] = useState('email');
  const [showDemo, setShowDemo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState('');

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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDemo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    console.log('Sending form data:', formData);
    
    // API URL - use environment variable if available or default to Render/Railway URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cresolva-email-server.onrender.com';
    
    // Use the external API server for both development and production
    fetch(`${API_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        console.log('Response status:', response.status);
        
        // Get the text response first, then try to parse as JSON
        return response.text().then(text => {
          if (!text) return { ok: response.ok };
          
          try {
            const data = JSON.parse(text);
            return { 
              ok: response.ok, 
              data,
              status: response.status
            };
          } catch (error) {
            console.warn('Response is not valid JSON:', text, error);
            return { 
              ok: response.ok, 
              data: { message: text },
              status: response.status
            };
          }
        });
      })
      .then((result) => {
        if (!result.ok) {
          console.error('Server error:', result);
          throw new Error(
            result.data?.error || 
            result.data?.details || 
            'Failed to send message. Please try again later.'
          );
        }
        
        console.log('Success:', result.data);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setIsSubmitting(false);
        setSubmitError(error.message || 'Failed to send message. Please try again later.');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Sample project data for the demo
  const projectData = {
    name: "E-commerce Website Redesign",
    progress: 65,
    status: "In Progress",
    dueDate: "June 15, 2025",
    tasks: [
      { id: 1, name: "Homepage Design", status: "Completed", assignee: "Sarah" },
      { id: 2, name: "Product Catalog", status: "In Progress", assignee: "Michael" },
      { id: 3, name: "Shopping Cart", status: "In Progress", assignee: "David" },
      { id: 4, name: "Payment Integration", status: "Pending", assignee: "Lisa" },
      { id: 5, name: "User Authentication", status: "Completed", assignee: "John" }
    ],
    timeline: [
      { date: "May 1, 2025", event: "Project Kickoff" },
      { date: "May 15, 2025", event: "Design Phase Complete" },
      { date: "June 1, 2025", event: "Development Phase Complete" },
      { date: "June 15, 2025", event: "Testing & Launch" }
    ]
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section with Video Background */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source src="/assets/12920674-hd-compressed.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Image 
              src="/assets/logo.png" 
              alt="Cresolva Logo" 
              width={300} 
              height={90}
              className="mx-auto mb-6"
            />
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-on-scroll">
              Professional coding solutions for projects of all sizes. From small applications to enterprise-level systems.
            </p>
            <div className="flex justify-center space-x-4 animate-on-scroll">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse animation-delay-300"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse animation-delay-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Email</h3>
              <p className="text-white/70 mb-4">cresolvami@gmail.com</p>
            </div>
            {/* Phone */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Phone</h3>
              <p className="text-white/70 mb-4">(313) 686-1358</p>
            </div>
            {/* Location */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Location</h3>
              <p className="text-white/70 mb-4">Detroit, MI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8 animate-on-scroll">
                <div>
                  <h2 className="text-2xl font-bold mb-8 text-blue-400">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start group">
                      <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-blue-400 transition-colors duration-300">Email</h3>
                        <p className="text-white/80">cresolvami@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-cyan-400 transition-colors duration-300">Phone</h3>
                        <p className="text-white/80">+1 (313) 686-1358</p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="w-12 h-12 bg-indigo-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-indigo-400 transition-colors duration-300">Location</h3>
                        <p className="text-white/80">Remote - Worldwide</p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-blue-400 transition-colors duration-300">Hours</h3>
                        <p className="text-white/80">Mon-Fri, 9am-5pm PST</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-blue-400">Connect With Us</h2>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500/40 transition-all duration-300 group">
                      <svg className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-500/40 transition-all duration-300 group">
                      <svg className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-indigo-500/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-indigo-500/40 transition-all duration-300 group">
                      <svg className="h-6 w-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500/40 transition-all duration-300 group">
                      <svg className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700 animate-on-scroll">
                <h2 className="text-2xl font-bold mb-8 text-blue-400">Send us a Message</h2>
                
                {submitSuccess ? (
                  <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-6 text-center border border-green-500/30 animate-fadeIn">
                    <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-green-400">Message Sent!</h3>
                    <p className="text-white/80">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                  </div>
                ) : submitError ? (
                  <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-6 text-center border border-red-500/30 animate-fadeIn mb-6">
                    <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-red-400">Error</h3>
                    <p className="text-white/80">{submitError}</p>
                    <button 
                      onClick={() => setSubmitError('')}
                      className="mt-4 px-4 py-2 bg-red-500/30 text-red-300 rounded-lg hover:bg-red-500/40 transition-colors duration-300"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    name="contact" 
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
                    </p>
                    
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1 group-focus-within:text-blue-400 transition-colors duration-300">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                          placeholder="Your name"
                          required
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1 group-focus-within:text-blue-400 transition-colors duration-300">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                          placeholder="your.email@example.com"
                          required
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-1 group-focus-within:text-blue-400 transition-colors duration-300">
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                          placeholder="What&apos;s this about?"
                          required
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1 group-focus-within:text-blue-400 transition-colors duration-300">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                          placeholder="Tell us about your project..."
                          required
                        ></textarea>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Office Section */}
      <section className="py-20 bg-gray-800 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-blue-400 animate-on-scroll">Our Virtual Workspace</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Virtual Meeting */}
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-blue-500/50 transition-all duration-300 group animate-on-scroll">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Virtual Meetings</h3>
                <p className="text-white/70 mb-4">Schedule a video call with our team to discuss your project in detail.</p>
                <button className="text-blue-400 hover:text-blue-300 flex items-center transition-colors duration-300">
                  <span>Schedule a call</span>
                  <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Collaboration Tools */}
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-cyan-500/50 transition-all duration-300 group animate-on-scroll">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">Collaboration Tools</h3>
                <p className="text-white/70 mb-4">We use modern collaboration tools to work seamlessly with clients worldwide.</p>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"/>
                    </svg>
                  </div>
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"/>
                    </svg>
                  </div>
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Project Management */}
              <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-indigo-500/50 transition-all duration-300 group animate-on-scroll">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors duration-300">Project Management</h3>
                <p className="text-white/70 mb-4">Track your project&apos;s progress in real-time through our client portal.</p>
                <button 
                  onClick={() => setShowDemo(true)}
                  className="text-indigo-400 hover:text-indigo-300 flex items-center transition-colors duration-300"
                >
                  <span>View demo</span>
                  <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Contact Methods Tabs */}
            <div className="mt-16 bg-gray-700/30 backdrop-blur-sm rounded-xl p-8 border border-gray-600 animate-on-scroll">
              <h3 className="text-2xl font-bold mb-6 text-center text-white">Preferred Contact Method</h3>
              
              <div className="flex flex-wrap justify-center mb-8">
                <button 
                  className={`px-6 py-2 rounded-lg mr-2 mb-2 transition-all duration-300 ${activeTab === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white/70 hover:bg-gray-500'}`}
                  onClick={() => setActiveTab('email')}
                >
                  Email
                </button>
                <button 
                  className={`px-6 py-2 rounded-lg mr-2 mb-2 transition-all duration-300 ${activeTab === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white/70 hover:bg-gray-500'}`}
                  onClick={() => setActiveTab('phone')}
                >
                  Phone
                </button>
                <button 
                  className={`px-6 py-2 rounded-lg mr-2 mb-2 transition-all duration-300 ${activeTab === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white/70 hover:bg-gray-500'}`}
                  onClick={() => setActiveTab('chat')}
                >
                  Live Chat
                </button>
              </div>
              
              <div className="text-center">
                {activeTab === 'email' && (
                  <div className="animate-fadeIn">
                    <p className="text-white/80 mb-4">Send us an email at <span className="text-blue-400">cresolvami@gmail.com</span></p>
                    <p className="text-white/60 text-sm">We typically respond within 24 hours</p>
                  </div>
                )}
                
                {activeTab === 'phone' && (
                  <div className="animate-fadeIn">
                    <p className="text-white/80 mb-4">Call us at <span className="text-blue-400">+1 (313) 686-1358</span></p>
                    <p className="text-white/60 text-sm">Available Monday-Friday, 9am-5pm PST</p>
                  </div>
                )}
                
                {activeTab === 'chat' && (
                  <div className="animate-fadeIn">
                    <p className="text-white/80 mb-4">Chat directly with our team! Messages are instantly forwarded to our support line for quick responses.</p>
                    {!showChat ? (
                      <div className="max-w-md mx-auto">
                        <div className="mb-4">
                          <label htmlFor="chat-name" className="sr-only">Your Name</label>
                          <input
                            type="text"
                            id="chat-name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 mb-4"
                          />
                        </div>
                        <button 
                          onClick={() => setShowChat(true)}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Start Chat
                        </button>
                        <p className="text-gray-400 text-sm mt-2 text-center">Our team typically responds within minutes during business hours.</p>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Management Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white">Project Management Dashboard</h3>
              <button 
                onClick={() => setShowDemo(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto">
              {/* Project Overview */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white">{projectData.name}</h4>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">{projectData.status}</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>Progress</span>
                    <span>{projectData.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      style={{ width: `${projectData.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-white/70">
                  <span>Due Date: </span>
                  <span className="text-white">{projectData.dueDate}</span>
                </div>
              </div>
              
              {/* Tasks */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Tasks</h4>
                <div className="space-y-3">
                  {projectData.tasks.map(task => (
                    <div key={task.id} className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h5 className="text-white font-medium">{task.name}</h5>
                        <p className="text-sm text-white/60">Assigned to: {task.assignee}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        task.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                        task.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Timeline */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Timeline</h4>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                  <div className="space-y-6">
                    {projectData.timeline.map((item, index) => (
                      <div key={index} className="relative pl-10">
                        <div className="absolute left-3 top-1 w-3 h-3 rounded-full bg-indigo-500"></div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <p className="text-white font-medium">{item.event}</p>
                          <p className="text-sm text-white/60">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-700 flex justify-end">
              <button 
                onClick={() => setShowDemo(false)}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Component */}
      {showChat && <LiveChat onClose={() => setShowChat(false)} userName={userName} />}
    </div>
  );
} 