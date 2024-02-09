import { Request, Response } from "express";
import * as repository from "../repository/memberRepository";

export function getDaebangPic(req: Request, res: Response) {
  repository.getDaebangPic(req, res).then((data) => {
    res.status(200).json(data);
  });
}

export function getMemberData(req: Request, res: Response) {
  repository.getMemberData(req, res).then((data) => {
    res.status(200).json(data);
  });
}
