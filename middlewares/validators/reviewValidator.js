const mongoose = require("mongoose");
const { review, user, movie } = require("../../models");

exports.show = async (req, res, next) => {
  try {
    let errors = [];

    if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
      errors.push(
        "id_movie is not valid and must be 24 character & hexadecimal"
      );
    }

    let findReview = await movie.findOne({ _id: req.body.movieId });

    if (!findReview) {
      errors.push("no review exist");
    }

    const obj = await review.aggregate([
      {
        $match: { movie: findReview._id },
      },
      {
        $group: {
          _id: "$movie",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    req.body.movieRate = obj[0];
    req.body.movie = findReview;
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    console.log("validator", e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
//===================================================================================================================================================
exports.share = async (req, res, next) => {
  try {
    let errors = [];

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "id_user is not valid and must be 24 character & hexadecimal"
      );
    }

    let findReview = await user.findOne({ _id: req.params.id });

    if (!findReview) {
      errors.push("user has no review");
    }

    req.body.user = findReview;
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    console.log("validator", e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

//===================================================================================================================================================
exports.create = async (req, res, next) => {
  try {
    let errors = [];

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "id_movie is not valid and must be 24 character & hexadecimal"
      );
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
      errors.push(
        "id_movie is not valid and must be 24 character & hexadecimal"
      );
    }

    let findData = await Promise.all([
      movie.findOne({ _id: req.body.movieId }),
      user.findOne({ _id: req.params.id }),
      review.findOne({
        movie: req.body.movieId,
        user: req.params.id,
      }),
    ]).catch(console.error("start panic", req.params.id));

    if (!findData[0]) {
      errors.push("movie not found");
    }

    if (!findData[1]) {
      errors.push("user not found");
    }

    if (findData[2]) {
      errors.push("user already reviewed ");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    req.body.movie = findData[0];
    req.body.user = findData[1];
    req.body.review = findData[2];

    next();
  } catch (e) {
    console.error(`validator`, e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

//===================================================================================================================================================
exports.update = async (req, res, next) => {
  try {
    let errors = [];

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "id_user is not valid and must be 24 character & hexadecimal"
      );
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
      errors.push(
        "id_movie is not valid and must be 24 character & hexadecimal"
      );
    }

    let findData = await Promise.all([
      movie.findOne({ _id: req.body.movieId }),
      user.findOne({ _id: req.params.id }),
      review.findOne({
        movie: req.body.movieId,
        user: req.params.id,
      }),
    ]).catch(console.error("start panic", req.params.id));

    if (!findData[0]) {
      errors.push("movie not found");
    }

    if (!findData[1]) {
      errors.push("user not found");
    }

    if (!findData[2]) {
      errors.push("user has not reviewed ");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    req.body.movie = findData[0];
    req.body.user = findData[1];
    req.body.review = findData[2]._id;

    next();
  } catch (e) {
    console.error(`validator`, e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    let errors = [];

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "id_user is not valid and must be 24 character & hexadecimal"
      );
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
      errors.push(
        "id_movie is not valid and must be 24 character & hexadecimal"
      );
    }

    let findData = await Promise.all([
      movie.findOne({ _id: req.body.movieId }),
      user.findOne({ _id: req.params.id }),
      review.findOne({
        movie: req.body.movieId,
        user: req.params.id,
      }),
    ]).catch(console.error("start panic", req.params.id));

    if (!findData[0]) {
      errors.push("movie not found");
    }

    if (!findData[1]) {
      errors.push("user not found");
    }

    if (!findData[2]) {
      errors.push("user has not reviewed ");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    req.body.movie = findData[0];
    req.body.user = findData[1];
    req.body.review = findData[2]._id;

    req.body.review = data;

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
