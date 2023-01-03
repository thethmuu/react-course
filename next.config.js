/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/canceled',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // for using with cloudinary image src and Next Image component
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
