# Build
FROM node:8.11.2-alpine as builder

COPY package.json package-lock.json ./
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN $(npm bin)/ng build --prod

# Run
FROM nginx:1.14.0-alpine

COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist/frontend /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
