const express = require("express");

// const transaksiValidator = require("../middlewares/validators/reviewValidator");

const reviewController = require("../controllers/reviewController");
const reviewValidator = require("../middlewares/validators/reviewValidator");

// const auth = require("../middlewares/auth");

const router = express.Router();

router
  .route("/:id")
  .get(reviewValidator.share, reviewController.share)
  .post(reviewValidator.create, reviewController.create)
  .put(reviewValidator.update, reviewController.update)
  .delete(reviewValidator.delete, reviewController.delete);

router.route("/").get(reviewValidator.show, reviewController.show);

module.exports = router;
