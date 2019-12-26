FROM node AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .

FROM node
RUN npm install typescript@latest -g
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app
RUN tsc
EXPOSE 8080
CMD ["dist/server.js"]
