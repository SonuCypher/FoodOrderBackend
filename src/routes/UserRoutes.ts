import express from "express";
import { createUser, getUser, updateUser } from "../controllers/UserControllers";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

// /api/user
router.get("/", jwtCheck, jwtParse , getUser)
router.post("/", jwtCheck, createUser);
router.put("/", jwtCheck, jwtParse,validateUserRequest, updateUser);

export default router;
