FROM openjdk:18-alpine as stage
WORKDIR /user/src/app
COPY . .
RUN ./gradlew bootJar

FROM openjdk:8u322-jre-buster
COPY --from=stage /user/src/app/build/libs/rakkeri_server-0.0.1-SNAPSHOT.jar /user/src/app/build/libs/rakkeri_server-0.0.1-SNAPSHOT.jar
EXPOSE 8080
WORKDIR /user/src/app
RUN chmod u+x ./build/libs/rakkeri_server-0.0.1-SNAPSHOT.jar && adduser --disabled-password appuser
USER appuser
CMD java -jar ./build/libs/rakkeri_server-0.0.1-SNAPSHOT.jar