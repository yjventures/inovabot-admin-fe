/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rfqbucket.s3-website-ap-southeast-2.amazonaws.com']
  },
  reactStrictMode: false, //fix react strict mode -abrar
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
    typescript: { ignoreBuildErrors: true, }
  }
}

export default nextConfig
