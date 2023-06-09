FROM node:18.3.0

ARG OPENAI_KEY
ENV OPENAI_KEY=$OPENAI_KEY

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 80

ENTRYPOINT ["npm", "start"]