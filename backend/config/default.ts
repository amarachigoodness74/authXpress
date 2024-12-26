import dotenv from "dotenv-safe";

dotenv.config();

export default {
  environment: {
    port: Number(String(process.env.PORT)) || 5000,
  },
  dbConfig: {
    url: process.env.DBURL || "",
    saltWorkFactor: Number(String(process.env.SALTWORKFACTOR)) || 10,
  },
  jwt: {
    accessTokenSecret:
      process.env.ACCESS_TOKEN_SECRET || "ZfqQuxIS+7/J6VfbWT+7/btX",
    refreshTokenSecret:
      process.env.REFRESH_TOKEN_SECRET || "SsqQuxISJ6sZf+7/J6VfSWTtX",
  },
};