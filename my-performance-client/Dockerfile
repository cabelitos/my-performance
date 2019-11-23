FROM nginx:alpine

RUN apk add --no-cache nodejs yarn
COPY . /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /app
RUN yarn install && yarn build && rm -rf /usr/share/nginx/html/* && mv build/* /usr/share/nginx/html
EXPOSE 80
