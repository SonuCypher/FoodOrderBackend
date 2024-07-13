"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserControllers_1 = require("../controllers/UserControllers");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
// /api/user
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, UserControllers_1.getUser);
router.post("/", auth_1.jwtCheck, UserControllers_1.createUser);
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateUserRequest, UserControllers_1.updateUser);
exports.default = router;
