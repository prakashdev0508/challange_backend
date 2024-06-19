const Category = require("../modals/categoryModal");
const { createError } = require("../utils/responses");

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const { slug, label } = req.body;

    const newCategory = new Category({ slug, label });
    await newCategory.save();

    res.status(201).json({ message: "Category Created", newCategory });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Read all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Read a single category by ID
exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return next(createError(404, "Category not found"));
    }

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Update a category by ID
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { slug, label } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { slug, label },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return next(createError(404, "Category not found"));
    }

    res.status(200).json({ message: "Category Updated", updatedCategory });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return next(createError(404, "Category not found"));
    }

    res.status(200).json({ message: "Category Deleted", deletedCategory });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};
