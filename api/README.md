# C7 Cinema API

## Prerequisites
1. JDK 21 installed
2. Postgres / MySQL server running locally
3. Database `cinema` exists

## Setting up Database
### MySQL
1. Create the database
```bash
mysql -h localhost -u user -p password < db/mysql/create-db.sql
```
2. Execute schema.sql file to create all tables
```bash
mysql -h localhost -u user -p password cinema < db/mysql/schema.sql
```
3. Set db config in application.properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cinema
spring.datasource.username=user
spring.datasource.password=password
```

### Postgres
TBA

## Running Locally
```bash
./gradlew bootRun
```