# Project Title

## Description

This project involves setting up a database using PostgreSQL and managing database migrations with Goose in a Go environment. The goal is to create and migrate three tables while documenting the process through an AI-assisted research conversation.

## Steps to Complete the Project

### Step 1: Install Go

Ensure Go is installed on your local machine. You can download and install it from the official Go website:
[https://go.dev/dl/](https://go.dev/dl/)

### Step 2: Install Goose

Goose is a lightweight database migration tool. Install it using the following command:

```sh
go install github.com/pressly/goose/v3/cmd/goose@latest
```

### Step 3: Install PostgreSQL

Download and install PostgreSQL from:
[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

After installation, start the PostgreSQL service and create a database.

### Step 4: Research Database Design

Use an AI tool such as ChatGPT or Gemini to research and design three database tables. Ensure the conversation link is recorded for documentation.

### Step 5: Define the Tables

Based on research, finalize three database tables and their relationships.

### Step 6: Generate Migration Files

Use Goose to create migration files for each table:

```sh
goose -dir migrations create create_table_name sql
```

Modify the generated SQL files to define the schema.

### Step 7: Save Research Documentation

Save the conversation link with ChatGPT or Gemini in a text file (`ai_research.txt`).

### Step 8: Package and Submit

Create a zip file containing:

- `migrations/` (directory with migration files)
- `ai_research.txt`

Submit the zip file before midnight.

## License

This project is open-source and available under the MIT License.

