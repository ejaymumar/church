###################################################
# Stage: base
#
# This base stage ensures all other stages are using the same base image
# and provides common configuration for all stages, such as the working dir.
###################################################
FROM node:25-alpine AS base
WORKDIR /usr/local/app

################## CLIENT STAGES ##################

###################################################
# Stage: client-base
#
# This stage is used as the base for the client-dev and client-build stages,
# since there are common steps needed for each.
###################################################
FROM base AS client-base
# package-lock.json is optional (it is gitignored) — the wildcard copies it when present.
COPY package.json package-lock.json* ./
RUN npm install
# This project's config files (no eslint/tsconfig/public folder here).
COPY index.html vite.config.ts postcss.config.mjs ./
COPY src ./src

###################################################
# Stage: client-dev
#
# This stage is used for development of the client application. It starts the
# Vite dev server bound to 0.0.0.0 so it is reachable from outside the container.
###################################################
FROM client-base AS client-dev
# host/port/strictPort are configured in vite.config.ts.
EXPOSE 5173
CMD ["npm", "run", "dev"]

###################################################
# Stage: client-build
#
# Produces the optimised static build in /usr/local/app/dist.
###################################################
FROM client-base AS client-build
RUN npm run build

###################################################
# Stage: client-prod
#
# Serves the static build with nginx. Build/run this stage for production:
#   docker build --target client-prod -t ecc-church-web:prod .
###################################################
FROM nginx:alpine AS client-prod
COPY --from=client-build /usr/local/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
