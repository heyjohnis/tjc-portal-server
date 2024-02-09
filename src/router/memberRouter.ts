import express from "express";
import { isAuth } from "../middleware/auth";
import * as controller from "../controller/memberController";

const router = express.Router();

router.get("/daebang/pic", controller.getDaebangPic);

router.get("/list", controller.getMemberData);

export default router;
