import { DAO } from "./db-api";
import { testDAO } from "./test-db-api";
import { AppConfig } from "./types";

export const getConfig = (isProd: Boolean): AppConfig => {
    const config = { dbApi: isProd ? DAO : testDAO };
    return config;
};
