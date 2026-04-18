FROM node:19

WORKDIR /app/backend

COPY backend/package.json .

RUN npm install

COPY backend/ .

EXPOSE 4000

CMD ["npm", "start"]

