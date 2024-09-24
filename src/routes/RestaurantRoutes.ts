import { Router } from "express";
import { param } from "express-validator";

const router = Router();

// api/restaurant/search/city
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string")
);
