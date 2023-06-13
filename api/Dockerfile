FROM --platform=$BUILDPLATFORM docker.tangerie.xyz/node-docker

ARG OPENAI_KEY
ENV OPENAI_KEY=$OPENAI_KEY

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 80

ENTRYPOINT ["npm", "start"]