FROM node:16.14.2-alpine3.14 as stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm run build && chmod -R o+r build

FROM node:16.14.2-alpine3.14
COPY --from=stage /usr/src/app/build /usr/src/app/build
WORKDIR /usr/src/app
RUN npm install -g serve && adduser -D appuser
USER appuser
EXPOSE 3000
CMD ["serve", "-s", "-l", "3000", "build"]