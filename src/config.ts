import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  protocol: process.env.PROTOCOL,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    key: process.env.DB_KEY,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET || "",
    expiresInSec: process.env.JWT_EXPIRES_SEC,
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  },
  ssl: {
    path: process.env.SSL_PATH || "",
    key: process.env.SSL_KEY || "",
    cert: process.env.SSL_CERT || "",
    ca: process.env.SSL_CA || "",
  },
  authKey: {
    daebang: {
      id: process.env.DAEBANG_ID,
      password: process.env.DAEBANG_PASSWORD,
    },
  },
};
