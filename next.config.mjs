/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '5000', // This must match the port your backend is running on
        },
      ],
    },
    async redirects() {
      return [
        {
          source: "/profilepage",
          has: [
            {
              type: "cookie",
              key: "token",
              value: "null",
            },
          ],
          destination: "/login",
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  