/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      //{
      //  protocol: 'https',
      //  hostname: 'github.com',
      //  port: '',
      //  pathname: '/shricodev.png',
      //},

      // NOTE: Using this wildcard entry is not recommended.
      // However, the images come from thousands of sources within the MDX content,
      // making it impractical to include them all explicitly.
      // Every image on the site is something I've approved while writing the content,
      // whether it's inside a blog post or in a project README. So, it should be fairly safe.
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
      // These are where images are hosted on Hashnode and Dev.to
      // NOTE: These needs to be updated in the future if they change.
      //{
      //  protocol: 'https',
      //  hostname: 'cdn.hashnode.com',
      //  port: '',
      //  pathname: '/**',
      //},
      //{
      //  protocol: 'https',
      //  hostname: 'media.dev.to',
      //  port: '',
      //  pathname: '/**',
      //},
      //{
      //  protocol: 'https',
      //  hostname: 'www.freecodecamp.org',
      //  port: '',
      //  pathname: '/**',
      //},
      //{
      //  protocol: 'https',
      //  hostname: 'dev-to-uploads.s3.amazonaws.com',
      //  port: '',
      //  pathname: '/**',
      //},
    ],
  },
}

export default nextConfig
