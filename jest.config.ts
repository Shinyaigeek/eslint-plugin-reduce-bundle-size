import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
  };
};
