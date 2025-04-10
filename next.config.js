/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // When building for static export, disable image optimization
  images: {
    unoptimized: true
  },
  // Base path for GitHub Pages (comment out for custom domain)
  // basePath: '/cresolva-website',
};

module.exports = nextConfig; 