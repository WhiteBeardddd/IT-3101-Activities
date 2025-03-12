# IT3101 Activities  

This repository contains my projects, assignments, and exercises for the IT3101 course.  

## Table of Contents  

- [Assignment 1 - Database Migration](#Assignment-1---Database-Migration)  

- [Activity 1 - Microservices with Database Migrations & GraphQL CRUD](#activity-1---microservices-with-database-migrations--graphql-crud)  

## Assignment 1 - Microservices with Database Migrations & GraphQL CRUD  

### Description  

This project involves setting up a database using PostgreSQL and managing database migrations with Goose in a Go environment. The goal is to create and migrate three tables while documenting the process through an AI-assisted research conversation.  

### Requirements  

- Create two separate microservices: `users-service` and `posts-service`.  
- Initialize a Node.js project in each folder with necessary dependencies (e.g., Prisma, Apollo Server, SQLite).  
- Configure a Prisma schema for each service:  
  - `users-service`: Defines a `User` model with an `id` and at least two other fields.  
  - `posts-service`: Defines a `Post` model with an `id` and at least two other fields.  
- Apply database migrations to create the databases and tables.  
- Implement a GraphQL server in each microservice using Apollo Server:  
  - Define schema types and CRUD queries/mutations.  
  - Write resolvers to handle CRUD operations using Prisma.  
- Run each service on a different port (e.g., **4001 for Users, 4002 for Posts**).  
- Test all CRUD endpoints using a GraphQL client (e.g., GraphiQL) to ensure proper functionality.  

### Submission  

Includes:  
- Project files for both microservices.  
- A short reflection (3-5 sentences) addressing:  
  - The purpose and benefits of database migrations.  
  - How GraphQL differs from REST for CRUD operations.  


## Activity 1 - Microservices with Database Migrations & GraphQL CRUD  

### Description  

In this activity, I built two microservices—**Users** and **Posts**—each with its own database. The goal was to apply database migrations and set up GraphQL endpoints for CRUD operations.  

### Requirements  

Steps to Complete the Project

Step 1: Install Go

Ensure Go is installed on your local machine. You can download and install it from the official Go website:
https://go.dev/dl/

Step 2: Install Goose

Goose is a lightweight database migration tool. Install it using the following command:

go install github.com/pressly/goose/v3/cmd/goose@latest

Step 3: Install PostgreSQL

Download and install PostgreSQL from:
https://www.postgresql.org/download/

After installation, start the PostgreSQL service and create a database.

Step 4: Research Database Design

Use an AI tool such as ChatGPT or Gemini to research and design three database tables. Ensure the conversation link is recorded for documentation.

Step 5: Define the Tables

Based on research, finalize three database tables and their relationships.

Step 6: Generate Migration Files

Use Goose to create migration files for each table:

goose -dir migrations create create_table_name sql

Modify the generated SQL files to define the schema.

Step 7: Save Research Documentation

Save the conversation link with ChatGPT or Gemini in a text file (ai_research.txt).

Step 8: Package and Submit

Create a zip file containing:

migrations/ (directory with migration files)

ai_research.txt

### Submission  

Includes:  
- Project files for both microservices.  
- A short reflection (3-5 sentences) addressing:  
  - The purpose and benefits of database migrations.  
  - How GraphQL differs from REST for CRUD operations.  
