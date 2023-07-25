/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@colors": path.resolve(__dirname, "src/app/styles/_colors.scss"),
      "@typography": path.resolve(__dirname, "src/app/styles/_typography.scss"),
    };
    return config;
  },
  sassOptions: {
    logger: {
      warn: function (message) {
        console.warn(message);
      },
    },
  },
};

module.exports = nextConfig;
