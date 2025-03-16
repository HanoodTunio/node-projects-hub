const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController,
    getRestaurantController,
    getRestaurantByIDController,
    deleteRestaurantByIDController
} = require("../controllers/resturantController");
const router = express.Router();

//create a Resturant || POST
router.post("/create", authMiddleware, createRestaurantController)

//get all Resturants || GET
router.get("/all", authMiddleware, getRestaurantController)

//get Restaurant by ID
router.get("/:id", authMiddleware, getRestaurantByIDController)

//delete a Restaurant by ID
router.delete("/:id", authMiddleware, deleteRestaurantByIDController)

module.exports = router;