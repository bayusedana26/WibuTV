// const crypto = require("crypto"); // Import crypto
// const path = require("path");
const mongoose = require("mongoose"); // Import Mongoose
const validator = require("validator"); // Import Validator
const { cast, review, movie, user, category } = require("../../models"); // Import Models

exports.getOne = async (req, res, next) => {
  const errors = [];
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "Category ID is not valid and must be 24 character & hexadecimal"
      );
    }
    // If params error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    const findData = await category.findOne({
      _id: req.params.id,
    });

    if (!findData) {
      errors.push("Data Not Found");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error in Validator",
      error: e,
    });
  }
};

exports.create = async (req, res, next) => {
  const errors = [];
  try {
    // Validate must be alphabet
    if (!validator.isAlpha(req.body.category, ["en-US"], { ignore: " " })) {
      errors.push("Category name must be alphabet");
    }
    for (let i = 0; i < req.body.length; i++) {
      if (req.body[i] == req.body[i + 1]) {
        errors.push("Category name already exist");
      }
    }
    // If error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal Server Error in Validator",
    });
  }
};

exports.update = async (req, res, next) => {
  const errors = [];
  try {
    // Check Parameter
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "Category ID is not valid and must be 24 character & hexadecimal"
      );
    }
    // If params error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    // Validate must be alphabet
    if (!validator.isAlpha(req.body.category, ["en-US"], { ignore: " " })) {
      errors.push("Category name must be alphabet");
    }
    for (let i = 0; i < req.body.category.length; i++) {
      if (req.body.category[i] == req.body.category[i + 1]) {
        errors.push("Category name already exist");
      }
    }
    // If error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal Server Error in Validator",
    });
  }
};

exports.delete = async (req, res, next) => {
  const errors = [];
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "Category ID is not valid and must be 24 character & hexadecimal"
      );
    }
    // If params error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    const findData = await category.findOne({
      _id: req.params.id,
    });

    if (!findData) {
      errors.push("Data Not Found");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error in Validator",
      error: e,
    });
  }
};
