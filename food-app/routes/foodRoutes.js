const express = require("express");
const {
    createFoodController,
    getFoodController,
    updateFoodController,
    deleteFoodController
} = require("../controllers/foodController");
const router = express.Router();


//create food
router.post("/create", createFoodController)

//get food
router.get("/:id", getFoodController)

// update food
router.put("/:id", updateFoodController)

//delete food
router.delete("/:id", deleteFoodController)

module.exports = router;