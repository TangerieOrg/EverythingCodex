FROM --platform=$BUILDPLATFORM docker.tangerie.xyz/node-docker AS build

ARG FONT_AWESOME_KEY
ENV FONT_AWESOME_KEY=$FONT_AWESOME_KEY


WORKDIR /app

COPY package*.json ./

RUN echo NPM Auth $FONT_AWESOME_KEY

RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" $FONT_AWESOME_KEY

RUN npm config ls

RUN npm i

COPY . .

RUN npm run build-prod

FROM node:18.3.0

WORKDIR /app

COPY --from=build /app/dist /app

EXPOSE 3000

ENTRYPOINT ["npx", "serve", "-s", "."]