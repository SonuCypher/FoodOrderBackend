import express from "express";
import multer from "multer";
import { createMyRestaurant } from "../controllers/RestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestauranRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

// /api/my/restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestauranRequest,
  jwtCheck,
  jwtParse,
  createMyRestaurant
);

export default router;
