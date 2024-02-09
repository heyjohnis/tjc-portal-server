import express, { NextFunction, Request, Response } from "express";
import https from "https";
import http from "http";
import fs from "fs";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";
import { config } from "./config";
import memberRouter from "./router/memberRouter";
import authRouter from "./router/authRouter";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent'
  )
);

app.use("/member", memberRouter);
app.use("/auth", authRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, TypeScript with Express!");
// });

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
