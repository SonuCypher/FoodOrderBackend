import express from "express";
import { createUser, updateUser } from "../controllers/UserControllers";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", jwtCheck, createUser);
router.put("/", jwtCheck, jwtParse,validateUserRequest, updateUser);

export default router;
