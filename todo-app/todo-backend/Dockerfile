FROM node:16

WORKDIR /usr/src/app/

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=todo-backend:*
ENV MONGO_URL=mongodb+srv://fullstack:dANiel_092021fullstack@myfirstcluster.r38o8ej.mongodb.net/todo-container-app?retryWrites=true&w=majority

USER node
CMD npm start