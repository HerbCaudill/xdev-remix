import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  transform: {
    "\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.test.ts"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/test/"],
}

export default config
