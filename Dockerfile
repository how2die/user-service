FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./

# When compiling alpine on Windows:
#run apk --no-cache add --virtual native-deps \
#  g++ gcc libgcc libstdc++ linux-headers make python && \
#  npm install --quiet node-gyp -g &&\
#  npm install --quiet && \
#  apk del native-deps

RUN npm install --only=production
COPY . .

FROM node:lts-alpine
RUN npm install typescript@latest -g
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app
RUN tsc
EXPOSE 8080
CMD ["node", "dist/server.js"]
