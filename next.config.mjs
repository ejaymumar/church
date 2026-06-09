/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone/server.js) for the
  // Docker `prod` stage.
  output: "standalone",
  // Allow the dev server's /_next/* assets to be fetched when the app is opened
  // from another host on the LAN (e.g. accessing the server by its IP). Without
  // this, Next.js logs a cross-origin warning and will block it in a future major.
  allowedDevOrigins: ["192.168.68.104", "ejaymumar.org", "*.ejaymumar.org"],
};

export default nextConfig;
