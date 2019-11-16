FROM node:10.15.3-alpine

WORKDIR /
COPY package.json yarn.lock ./
RUN yarn install > /dev/null

COPY ./utils/docker/entrypoint.sh /entrypoint.sh
COPY . ./
COPY ./src/schemas ./build/schemas
RUN yarn build

EXPOSE 3000
ENV NODE_ENV=production

ENTRYPOINT ["/entrypoint.sh"]
