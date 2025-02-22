/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["./src/test/setupTests.ts"],
};
