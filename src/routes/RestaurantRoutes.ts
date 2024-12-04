import { Router } from "express";
import { param } from "express-validator";
import { getRestaurant, searchRestaurant } from "../controllers/RestaurantController";

const router = Router();

// api/restaurant/:restaurantId
router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId parameter must be a valid string"),
    getRestaurant
);
// api/restaurant/search/:city
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchRestaurant
);

export default router;
