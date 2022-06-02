# Local environment setup

Unfortunately, docker-compose works only for production.

## Database

Create a postgres database, for example with docker:

```
docker run -d -p 5432:5432 --name rak-postgres -e POSTGRES_PASSWORD=test -v /home/USERNAME/psql/rakkeri/data:/var/lib/postgresql/data postgres:14.2-alpine3.15
```

## Spring Boot REST API server

Requires at least Java 8 (unless you start with Docker)

Choose any of options 1-3

Then test the server by opening `localhost:8080/hello` in your browser

All commands are executed in path `/server`

### Option 1: local build

Build the backend server with

```
./gradlew build
```

Start the backend server with your favourite Java IDE. Use `develop` profile for local builds.

### Option 2: build jar

If you just want to run the backend, you can build the executable jar

```
./gradlew bootJar
java -jar ./build/libs/rakkeri_server-0.0.1-SNAPSHOT.jar --spring.profiles.active=develop
```

### Option 3: Docker

Build the docker image in /server and run, exposing port 8080. By default it will use the `production` profile, so you must edit the last command in the Dockerfile to

```
CMD java -jar ./build/libs/rakkeri_server-0.0.1-SNAPSHOT.jar --spring.profiles.active=develop
```

## React.js frontend

Requires at least Node version 16

in `/client` run

```
npm install
npm run dev
```

Frontend is served in `localhost:3000/rakkeri`

There is also a Dockerfile, but it is only used for production. A lot of configuration is required to make it work for development purposes.
