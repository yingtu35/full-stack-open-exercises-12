FROM node:16 AS build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm run build

FROM node:16 AS test-stage
COPY --from=build-stage /usr/src/app /usr/src/app
WORKDIR /usr/src/app
RUN CI=true npm test

FROM nginx:1.20-alpine
COPY --from=test-stage /usr/src/app/build /usr/share/nginx/html