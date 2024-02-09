import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { checkPassword } from "../repository/authRepository";

export async function login(req: Request, res: Response) {
  const { login_id, password } = req.body;
  const hasUser = await checkPassword(req);
  console.log("hasUser: ", hasUser);

  if (hasUser || isGuestUser(req)) {
    const token = createJwtToken(login_id);
    res.status(200).json({
      success: true,
      login_id,
      token,
    });
  } else {
    res.status(401).json({ error: "패스워드가 틀립니다." });
  }
}

function createJwtToken(id: string) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function isGuestUser(req: Request) {
  const { login_id, password } = req.body;
  return (
    login_id === config.authKey.daebang.id &&
    password === config.authKey.daebang.password
  );
}
