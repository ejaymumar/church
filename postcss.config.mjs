/**
 * PostCSS configuration for Tailwind CSS v4 under Next.js.
 * The Vite plugin (@tailwindcss/vite) no longer applies — Next processes CSS
 * through PostCSS, so Tailwind is wired in via its dedicated PostCSS plugin.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
