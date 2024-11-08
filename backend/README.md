# Backend

This is the backend project for managing data and GraphQL API for a Building temperature managment application. It uses **Apollo Server** for GraphQL API, **Prisma** as the ORM, and **SQLite** as the database. The project is developed using **TypeScript**.

## Table of Contents
- [Backend](#backend)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Scripts](#scripts)
  - [Database Management](#database-management)
  - [Technologies](#technologies)
  - [License](#license)

## Requirements

To run this project, make sure you have the following installed:
- Node.js (>=16.x.x)
- npm or yarn (>=7.x.x)

## Installation

Clone this repository and navigate into the project directory:

```bash
git clone https://github.com/stefanie-vicente/nordomatic-test.git
cd backend
```

Then install the required dependencies:

```bash
npm install
```

## Scripts

You can use the following npm scripts for various tasks during development:

- **`dev`**: Starts the server in development mode using `nodemon` and `ts-node`. The server automatically restarts on file changes.
  ```bash
  npm run dev
  ```

- **`build`**: Compiles the TypeScript code to JavaScript using `tsc` and stores it in the `dist` directory.
  ```bash
  npm run build
  ```

- **`prisma:migrate`**: Runs the Prisma migrations for the database. Use this whenever there are new migrations.
  ```bash
  npm run prisma:migrate
  ```

- **`prisma:generate`**: Regenerates the Prisma client, which is necessary if there are any schema changes.
  ```bash
  npm run prisma:generate
  ```

- **`prisma:reset`**: Resets the database by applying all migrations from scratch. Use this with caution, as it will delete existing data.
  ```bash
  npm run prisma:reset
  ```

## Database Management

This project uses **SQLite** as the database for easy setup. **Prisma** is configured to handle database migrations and data access.

To create or update the database schema, use the following commands:

1. **Generate Migration Files**:
   ```bash
   npm run prisma:migrate
   ```

2. **Generate Prisma Client**:
   ```bash
   npm run prisma:generate
   ```

3. **Reset the Database** (drops all tables and re-applies migrations):
   ```bash
   npm run prisma:reset
   ```

## Technologies

The following main technologies are used in this project:

- **[Apollo Server](https://www.apollographql.com/docs/apollo-server/)**: A GraphQL server that is responsible for handling GraphQL requests and responses.
- **[Prisma](https://www.prisma.io/)**: An ORM for database management and migrations, enabling seamless interaction with the SQLite database.
- **[SQLite](https://www.sqlite.org/index.html)**: A lightweight, serverless SQL database engine.
- **[TypeScript](https://www.typescriptlang.org/)**: TypeScript is used for type safety and modern JavaScript features.
- **[Nodemon](https://nodemon.io/)**: A tool that helps develop Node.js applications by automatically restarting the application when file changes in the directory are detected.

## License

This project is licensed under the ISC License. 

---

