/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Cette configuration permet à Next.js de s'exécuter dans un environnement conteneurisé
    output: 'standalone',
    // Configuration pour les variables d'environnement
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8500/api',
    }
  }
  
module.exports = nextConfig