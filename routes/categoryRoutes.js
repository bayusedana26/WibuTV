// Import Express
const express = require("express");

// Make a router
const router = express.Router();

// Category Validator
const CategoryValidator = require("../middlewares/validators/categoryValidator");

// Add Authorization
const auth = require("../middlewares/auth/index");

// Category Controller
const CategoryController = require("../controllers/categoryController");

// Create
router.post(
  "/",
  auth.admin,
  CategoryValidator.create,
  CategoryController.create
);

// Get All
router.get("/", CategoryController.getAll);

// Get One
router.get("/:id", CategoryValidator.getOne, CategoryController.getOne);

// Update
router.put(
  "/:id",
  auth.admin,
  CategoryValidator.update,
  CategoryController.update
);

// Delete
router.delete(
  "/:id",
  auth.admin,
  CategoryValidator.delete,
  CategoryController.delete
);

module.exports = router;
