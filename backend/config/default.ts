import dotenv from "dotenv-safe";

dotenv.config();

export default {
  environment: {
    port: Number(String(process.env.PORT)) || 1337,
    clientUrl: Number(String(process.env.CLIENT_URL)) || "localhost:3000",
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
  emailConfig: {
    port: Number(process.env.SMTP_PORT) || 465,
    host: process.env.SMTP_HOST || "localhost:3000",
    user: process.env.SMTP_USER || "test@email.com",
    password: process.env.SMTP_PASS || "ISJSsqQux6s",
  },
};
