const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

const movie = require("./movie");
const review = require("./review");
const user = require("./user");
const cast = require("./cast");
const category = require("./category");

module.exports = { movie, review, user, cast, category };
