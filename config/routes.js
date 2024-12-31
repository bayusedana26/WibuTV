const movieRoutes = require("../routes/movieRoutes");
const reviewRoutes = require("../routes/reviewRoutes");
const authRoutes = require("../routes/authRoutes");
const castRoutes = require("../routes/castRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const userRoutes = require("../routes/userRoutes");

const configureRoutes = (app) => {
  app.use("/movie", movieRoutes);
  app.use("/review", reviewRoutes);
  app.use("/cast", castRoutes);
  app.use("/", authRoutes);
  app.use("/category", categoryRoutes);
  app.use("/user", userRoutes);
};

module.exports = configureRoutes; 