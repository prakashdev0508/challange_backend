const Category = require("../modals/categoryModal");
const HotChallange = require("../modals/hotChallangeModal");
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

//Hot ongoing challanges
// Create a new hot challenge
exports.createHotChallange = async (req, res, next) => {
  try {
    const { name, description, category_id } = req.body;

    const newHotChallange = new HotChallange({
      name,
      description,
      category_id,
    });
    await newHotChallange.save();

    res.status(201).json({ message: "Hot Challenge Created", newHotChallange });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Read all hot challenges
exports.getHotChallanges = async (req, res, next) => {
  try {
    const hotChallanges = await HotChallange.find();
    res.status(200).json(hotChallanges);
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Read a single hot challenge by ID
exports.getHotChallangeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hotChallange = await HotChallange.findById(id);

    if (!hotChallange) {
      return next(createError(404, "Hot Challenge not found"));
    }

    res.status(200).json(hotChallange);
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Update a hot challenge by ID
exports.updateHotChallange = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, category_id } = req.body;

    const updatedHotChallange = await HotChallange.findByIdAndUpdate(
      id,
      { name, description, category_id },
      { new: true, runValidators: true }
    );

    if (!updatedHotChallange) {
      return next(createError(404, "Hot Challenge not found"));
    }

    res
      .status(200)
      .json({ message: "Hot Challenge Updated", updatedHotChallange });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Delete a hot challenge by ID
exports.deleteHotChallange = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedHotChallange = await HotChallange.findByIdAndDelete(id);

    if (!deletedHotChallange) {
      return next(createError(404, "Hot Challenge not found"));
    }

    res
      .status(200)
      .json({ message: "Hot Challenge Deleted", deletedHotChallange });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Search hot challenges
exports.searchHotChallanges = async (req, res, next) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query, "i");

    const hotChallanges = await HotChallange.find({
      $or: [{ name: searchRegex }, { description: searchRegex }],
    });

    res.status(200).json(hotChallanges);
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};
