FROM node:lts-alpine
WORKDIR /usr/src/app
# Install Python on alpine
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g
RUN npm install typescript@latest -g
COPY package*.json ./
RUN npm install --only=production
RUN apk del native-deps
RUN tsc
EXPOSE 8080
CMD ["node", "dist/server.js"]
