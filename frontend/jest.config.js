module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json", // Point Jest to the test-specific tsconfig
    },
  },
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional: for global setup
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript and JSX with ts-jest
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Support path aliases if needed
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@mui/material|@testing-library/)", // Ignore transformation for some node_modules if needed
  ],
};
