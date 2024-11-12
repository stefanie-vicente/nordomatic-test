# Backend

This project is a backend server that uses **Apollo Server** for handling GraphQL requests, **Prisma** for database management, and **SQLite** as the database engine. The server is written in **TypeScript** and includes various scripts for managing development, migrations, testing, and seeding the database.

## Table of Contents

- [Backend](#backend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Scripts](#scripts)
    - [Development](#development)
    - [Build](#build)
    - [Prisma Migrations](#prisma-migrations)
    - [Seeding](#seeding)
    - [Testing](#testing)
  - [Environment Configuration](#environment-configuration)
  - [Database](#database)
    - [Seeding](#seeding-1)
  - [Testing](#testing-1)
  - [Development](#development-1)
  - [Production](#production)
  - [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/stefanie-vicente/nordomatic-test.git
   ```

2. Navigate to the project directory:

   ```bash
   cd backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Ensure that you have **Prisma** and **SQLite** set up for your project. The database is set up via **Prisma** migrations, which you can run with the provided scripts.

## Scripts

The following npm scripts are available for use:

### Development

- **`npm run dev`**: Runs the server in development mode with hot-reloading using **`nodemon`** and **`ts-node`**.

  ```bash
  npm run dev
  ```

  This will start the server and automatically restart it whenever changes are made to the `src` directory.

### Build

- **`npm run build`**: Compiles the TypeScript code into JavaScript using **`tsc`**.

  ```bash
  npm run build
  ```

  This will generate compiled files in the `dist` folder.

### Prisma Migrations

- **`npm run prisma:migrate`**: Runs Prisma migration in **development** mode.

  ```bash
  npm run prisma:migrate
  ```

- **`npm run prisma:generate`**: Generates Prisma Client based on the schema.

  ```bash
  npm run prisma:generate
  ```

- **`npm run prisma:reset`**: Resets the database, re-applies migrations, and skips seeding.

  ```bash
  npm run prisma:reset
  ```

### Seeding

- **`npm run seed`**: Seeds the database with initial data using **`ts-node`**.

  ```bash
  npm run seed
  ```

  This runs a `prisma/seed.ts` file to populate the database with test or initial data.

### Testing

- **`npm run test`**: Runs tests using **Jest** with the test database.

  ```bash
  npm run test
  ```

  This runs Jest in the test environment with a separate test database.

- **`npm run test:reset`**: Resets the database and runs tests after reapplying migrations.

  ```bash
  npm run test:reset
  ```

  This is useful for running tests in an isolated environment after a fresh migration.

## Environment Configuration

Make sure to set up your environment variables for different environments (development, test, production). This is typically done through a `.env` file in the project root.

Example `.env` file:

```env
DATABASE_URL="file:./dev.db"
NODE_ENV=development
```

In the **test environment**, the `DATABASE_URL` will point to a test database (e.g., `file:./test.db`) to avoid polluting your development database.

## Database

This project uses **Prisma** for database management with **SQLite** as the database engine. The schema is defined in the `prisma/schema.prisma` file.

To apply migrations:

1. Run:

   ```bash
   npm run prisma:migrate
   ```

2. To generate Prisma Client after migrations are applied:

   ```bash
   npm run prisma:generate
   ```

### Seeding

To seed the database with sample data:

```bash
npm run seed
```

This will populate the database with initial data defined in `prisma/seed.ts`.

## Testing

The project uses **Jest** for testing, along with **Supertest** for HTTP assertions. 

To run the tests:

```bash
npm run test
```

Tests are executed against a test database defined in the `.env` file.

To reset the database and rerun tests:

```bash
npm run test:reset
```

## Development

1. **Start the development server** using:

   ```bash
   npm run dev
   ```

   This will start the server on **http://localhost:4000** (or any other port specified).

2. During development, the **GraphQL Playground** will be available for testing queries and mutations. Make sure `NODE_ENV` is set to `development` for this feature to be enabled.

## Production

For production use, you should build and start the server:

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Start the server**:

   After building, you can start the server:

   ```bash
   node dist/server.js
   ```

Make sure to set `NODE_ENV` to `production` in your production environment for better performance and security.

## License

This project is licensed under the **ISC** License.
