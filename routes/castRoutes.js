// Import Express
const express = require("express");

// Make a router
const router = express.Router();

// Cast Validator
const CastValidator = require("../middlewares/validators/castValidator");

// Add Auth
const auth = require("../middlewares/auth/index");

// Cast Controller
const CastController = require("../controllers/castController");

// Create
router.post("/", auth.admin, CastValidator.create, CastController.create);

// Get All
router.get("/", CastController.getAll);

// Get One
router.get("/:id", CastValidator.getOne, CastController.getOne);

// Update
router.put("/:id", auth.admin, CastValidator.update, CastController.update);

// Delete
router.delete("/:id", auth.admin, CastValidator.delete, CastController.delete);

module.exports = router;
