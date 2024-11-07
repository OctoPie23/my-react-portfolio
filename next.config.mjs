/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // TODO: Remove this after having a self photo to put
      {
        protocol: 'https',
        hostname: 'placehold.jp',
        port: '',
        pathname: '/**',
      },
      // These are where images are hosted on Hashnode and Dev.to
      // NOTE: These needs to be updated in the future if they change.
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev-to-uploads.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
