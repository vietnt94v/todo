# WMS Backend API

Java core backend without frameworks, using only JDK built-in HTTP server.

## Requirements
- Java 17+
- Maven 3.8+
- PostgreSQL database (must be running and configured)

## Dependencies
- PostgreSQL JDBC Driver
- jBCrypt for password hashing
- java-jwt for JWT token generation
- Gson for JSON serialization

## Build and Run

### Build
```bash
mvn clean package
```

### Run
```bash
mvn exec:java -Dexec.mainClass="com.wms.Main"
```

Or run the JAR:
```bash
java -jar target/wms-backend-1.0.0.jar
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username and password

### Users (Protected)
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Configuration

Edit `src/main/resources/application.properties`:
- Database connection settings
- JWT secret and expiration
- Server port and CORS origins

