FROM node:18

WORKDIR /usr/src/app

COPY my-app/package*.json ./

RUN npm install

COPY my-app .

EXPOSE 3000

CMD ["npm", "run", "dev"]
