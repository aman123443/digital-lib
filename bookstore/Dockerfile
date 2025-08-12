# --- Single-Stage Dockerfile to avoid image pull errors on Render ---

# Stage 1: Use the Maven image to build the application
FROM maven:3.8-openjdk-17

# Set the working directory
WORKDIR /app

# Copy the project files
COPY pom.xml .
COPY src ./src

# Build the application and create the .jar file
RUN mvn clean package -DskipTests

# Expose the port the application runs on
EXPOSE 8080

# Run the application directly from this same image
# NOTE: We are NOT using a second "FROM" command.
# We use the full, exact name of the JAR file here.
ENTRYPOINT ["java", "-jar", "target/bookstore-0.0.1-SNAPSHOT.jar"]