const express = require("express");
const { createCategoryController,
    getCategoriesController,
    deleteCategoryController,
    updateCategoryController
} = require("../controllers/categoryController");
const router = express.Router();

//create category
router.post("/create", createCategoryController);

//get category
router.get("/:id", getCategoriesController);

//update category
router.put("/:id", updateCategoryController);

//delete category
router.delete("/:id", deleteCategoryController);

module.exports = router;