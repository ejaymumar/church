/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone/server.js) for the
  // Docker `prod` stage.
  output: "standalone",
};

export default nextConfig;
