/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Mengizinkan build tetap selesai meskipun ada error TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // Mengizinkan build tetap selesai meskipun ada peringatan ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;