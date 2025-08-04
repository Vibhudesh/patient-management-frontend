# Use the official OpenJDK image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from target directory to the container
COPY target/*.jar newspring-0.0.1-SNAPSHOT.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "newspring-0.0.1-SNAPSHOT.jar"]