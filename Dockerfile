###################################################
# Stage: base
#
# Common base for all stages: pins the Node image and the working directory.
###################################################
FROM node:25-alpine AS base
WORKDIR /usr/local/app

###################################################
# Stage: deps
#
# Installs dependencies once so the dev and build stages can share the cached
# node_modules layer (only re-runs when package.json/lockfile change).
###################################################
FROM base AS deps
# package-lock.json is optional (it is gitignored) — the wildcard copies it when present.
COPY package.json package-lock.json* ./
RUN npm install

###################################################
# Stage: dev
#
# Runs the Next.js dev server with HMR. `-H 0.0.0.0` binds it to all interfaces
# so it is reachable from outside the container; the port (5174) is set in the
# package.json "dev" script. Source is bind-synced in via compose `develop.watch`.
###################################################
FROM deps AS dev
COPY . .
EXPOSE 5174
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]

###################################################
# Stage: build
#
# Produces the standalone production output (.next/standalone + .next/static),
# enabled by `output: "standalone"` in next.config.mjs.
###################################################
FROM deps AS build
COPY . .
RUN npm run build

###################################################
# Stage: prod
#
# Serves the standalone server. Build/run this stage for production:
#   docker build --target prod -t ecc-church-web:prod .
###################################################
FROM base AS prod
ENV NODE_ENV=production
ENV PORT=5174
ENV HOSTNAME=0.0.0.0
# The standalone output bundles a minimal node_modules + server.js at the root.
COPY --from=build /usr/local/app/.next/standalone ./
COPY --from=build /usr/local/app/.next/static ./.next/static
COPY --from=build /usr/local/app/public ./public
EXPOSE 5174
CMD ["node", "server.js"]
