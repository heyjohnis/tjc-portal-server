import { Request, Response } from "express";
import { db } from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { User } from "../model/user";

export async function checkPassword(req: Request) {
  const { login_id, password } = req.body;
  return db.execute(
    ` SELECT
		  * 
		  FROM 
			tjc_login_table 
		  WHERE 
			pass = PASSWORD(?) 
			AND id = ?`,
    [password, login_id]
  );
}
