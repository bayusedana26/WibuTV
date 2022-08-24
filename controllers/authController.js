const jwt = require("jsonwebtoken");

class AuthController {
  async getToken(req, res) {
    try {
      const body = {
        id: req.user._id,
      };

      const token = jwt.sign(body, process.env.JWT_SECRET);

      return res.status(200).json({
        message: "Success",
        token,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new AuthController();
