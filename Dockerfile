FROM node:lts-alpine AS build
WORKDIR /usr/src/app
# Install Python on alpine
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g
RUN npm install typescript@latest -g
COPY package*.json ./
RUN npm install --only=production
RUN apk del native-deps
COPY src ./
COPY tsconfig.json ./
RUN tsc

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
EXPOSE 8080
CMD ["node", "dist/server.js"]
