# Create image based on the official Node 6 image from dockerhub
FROM node:12.16.1-alpine as node

ARG ENV=prod
ARG APP=spotiapp
# Create a directory where our app will be placed
# RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
# COPY package.json /app

# Get all the code needed to run the app
COPY ./ /app/

# Install dependecies
RUN npm ci
RUN npm run build
RUN mv /app/dist/${APP}/* /app/dist/

# Angular app construida, la vamos a hostear un server production, este es Nginx

FROM nginx:1.18.0-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=node /app/dist /usr/share/nginx/html
COPY --from=node /app/entrypoint.sh /usr/share/nginx/
RUN chmod +x /usr/share/nginx/entrypoint.sh
CMD ["/bin/sh", "/usr/share/nginx/entrypoint.sh"]

# VERSION PARA AZURE

# FROM nginx
# COPY dist /usr/share/nginx/html
# EXPOSE 80