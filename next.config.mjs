/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rfqbucket.s3-website-ap-southeast-2.amazonaws.com']
  },
  reactStrictMode: false //fix react strict mode -abrar
}

export default nextConfig
