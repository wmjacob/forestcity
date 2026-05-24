FROM node:18-slim AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN chmod +x node_modules/@angular/cli/bin/ng
ENV PATH="/usr/src/app/node_modules/.bin:/usr/src/app/node_modules/@angular/cli/bin:${PATH}"
RUN npm run build
RUN npm prune --omit=dev

FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/sitemap.xml ./sitemap.xml
COPY app.js robots.txt ./
COPY bin ./bin
COPY lib ./lib
COPY routes ./routes
EXPOSE 3000
CMD ["bin/www"]
