const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization || "";
  token = token.split(" ")[1];
  console.log(token);

  if (token) {
    try {
      const result = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(result);

      req.user = result;
    } catch (error) {
      console.log(error);
    }
  }

  next();
};

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.profile._id;

  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};
