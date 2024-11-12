# Frontend Project

This is a frontend application built using Next.js with React and TypeScript. The project is designed to interact with GraphQL APIs using Apollo Client and GraphQL Request. It also incorporates Material UI for the UI components and Jest for testing.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Ensure that you have the following tools installed:
- Node.js (>= 14.x.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stefanie-vicente/nordomatic-test.git
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Available Scripts

You can run the following commands using `npm run <script>`:

### `npm run dev`

Starts the development server using Next.js.

```bash
npm run dev
```
This will run the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm run build`

Builds the application for production.

```bash
npm run build
```
This will create an optimized production build in the `.next` folder.

### `npm run start`

Starts the application in production mode after building it.

```bash
npm run start
```
This command should be run after building the application (`npm run build`).

### `npm run lint`

Lints the code using ESLint to enforce code quality.

```bash
npm run lint
```

### `npm run test`

Runs tests using Jest.

```bash
npm run test
```

## Dependencies

### Core Libraries

- **Next.js**: React framework for building server-side rendered and statically generated web applications.
- **React**: JavaScript library for building user interfaces.
- **React-DOM**: The React package for DOM manipulation.
- **Apollo Client**: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- **Material UI**: A popular React UI framework that provides a set of components following Google's Material Design guidelines.
- **Emotion**: A library designed for writing CSS styles with JavaScript.

### Development Dependencies

- **Jest**: A testing framework for running unit and integration tests.
- **Testing Library**: A set of utilities to help you test React components in a user-centric way.
- **ESLint**: A tool for identifying and reporting on patterns in JavaScript, ensuring a consistent coding style.
- **TypeScript**: A superset of JavaScript that adds static typing, improving the development experience.

## Environment Variables

If you are using environment variables in your project, you can set them in a `.env` file at the root of the project. 

Example:
```
NEXT_PUBLIC_GRAPHQL_API_URL=http://localhost:4000/graphql
```

Make sure to restart the server after adding or modifying environment variables.

## Testing

The project uses Jest and the React Testing Library for unit and integration testing.

To run tests, use the command:
```bash
npm run test
```

### Running Tests in Watch Mode

You can run tests in watch mode for faster feedback while developing:
```bash
npm run test -- --watch
```

### TypeScript Support

This project uses TypeScript for type safety. Type definitions are automatically included for React, Node, Jest, and other libraries.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.