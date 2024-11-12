module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional: for global setup
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript and JSX with ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Ensure Jest recognizes TypeScript and JSX
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Support path aliases if needed
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@mui/material|@testing-library/)", // Ignore transformation for some node_modules if needed
  ],
};
