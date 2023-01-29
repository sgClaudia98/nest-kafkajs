FROM node:latest as dev

RUN apt install -y git

WORKDIR /usr/src

RUN mkdir temp

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install glob rimraf

COPY . .

RUN npm run build

FROM node:latest as prod

RUN apt install -y git

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src

RUN mkdir temp

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]