import { Router } from "express";
import { saveAndSend } from "../../controllers/ControllersApi/chats.Controllers.js";
import { extraerUserCookie } from "../../middlewares/cookies.Middlewares.js";
export const chatRouter = new Router();

chatRouter.post("/", extraerUserCookie, saveAndSend);
