const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const setup = (app) => {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, "../logs/access.log"),
      {
        flags: "a",
      }
    );
    app.use(morgan("combined", { stream: accessLogStream }));
  }
};

module.exports = { setup }; 