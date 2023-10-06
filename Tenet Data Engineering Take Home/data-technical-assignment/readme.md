
# Prototype ETL Platform 

This prototype ETL platform captures events, stores them in a source database, and then transforms and loads that data into a destination database for analytics.
Table of Contents

    Components
    Event Structure
    Design Decisions
    Setup Steps
        Database Setups
        Project Setup
    Sample CURL Requests

## Components ##
### 1. Router ###

    Receives events and directs them to the analytics service.
    Pre-built in the project template.

### 2. Event Service ### 

    Determines supported events and stores data in the source database.
    Implemented using the EventService class (eventService.ts).

### 3. Source Database (PostgreSQL) ### 

    Built with Prisma (schema.prisma).

### 4. ETL ### 

    Extracts, transforms, and loads data from source to destination databases.
    Found in etl.ts inside the scripts folder.

### 5. Destination Database ### 

    Optimized for data analysts to provide insights like conversion, task completion, and credit profiles.

## Event Structure ## 

Events sent should adhere to:

json

{
  "eventType": "string",
  "userId": "number",
  "activity": "object"
}

## Design Decisions ##

    Event-Based Architecture: Built around individual events for flexibility.

    ETL Modularity: ETL logic is isolated (etl.ts) for clarity.

    Database Separation: Ensures raw data collection and analytics are independent.

## Setup Steps ##
### Database Setups ### 

    Install Prisma CLI:

    bash

npm install -g prisma

### Configure Connection:### 

    Update DATABASE_URL in .env with your PostgreSQL connection string.

## Run Migrations: ##

bash

    npx prisma migrate dev --name init

## Project Setup ##

    Install Dependencies:

    bash

npm install

## Start the Service:##

bash

    npm start

## Sample CURL Requests ##
### Create a New User ###

bash

curl -X POST http://localhost:3000/users \
-H 'Content-Type: application/json' \
-d '{
    "email": "john.doe@example.com",
    "name": "John Doe",
    "ficoScore": 720
}'

## Get All Users ##

bash

curl -X GET http://localhost:3000/users



