# build environment
FROM node:12.16.1 as build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . /app
ENV REACT_APP_API_BASE_URL=http://replace-this-url
ENV REACT_APP_LOGO=replace-this-logo-name
RUN env
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY start.sh /

EXPOSE 80
CMD /bin/sh -c "/start.sh"