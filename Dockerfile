# build environment
FROM node:12.16.1 as build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . /app
ARG REACT_APP_API_BASE_URL=http://wrong:9000
RUN env
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]