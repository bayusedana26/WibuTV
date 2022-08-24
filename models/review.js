const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");

const reviewSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    rating: {
      type: Number,
      default: 1,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: "movie",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true },
  }
);

reviewSchema.plugin(mongoosePaginate);
reviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", reviewSchema);
