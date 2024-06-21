const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

// Create a new category
router.post("/create-category", categoryController.createCategory);

// Get all categories
router.get("/all-categories", categoryController.getCategories);

// Get a single category by ID
router.get("/:id", categoryController.getCategoryById);

// Update a category by ID
router.put("/:id", categoryController.updateCategory);

// Delete a category by ID
router.delete("/:id", categoryController.deleteCategory);


module.exports = router;
