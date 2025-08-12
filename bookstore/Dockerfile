# #############################################################################
# Stage 1: The "Builder" Stage - Build the application using Maven
# #############################################################################
FROM maven:3.8-openjdk-17 AS builder

WORKDIR /app

COPY pom.xml .
COPY src ./src

# Build the application and create the .jar file
RUN mvn clean package -DskipTests

# #############################################################################
# Stage 2: The "Final" Stage - Create the lightweight production image
# #############################################################################
# THE FIX is on the next line: using a current, valid Java 17 JRE image
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy ONLY the final .jar file from the "builder" stage
# Make sure your JAR file name here is correct, or use a wildcard
COPY --from=builder /app/target/bookstore-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]