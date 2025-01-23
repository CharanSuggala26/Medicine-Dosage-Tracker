const jwt = require("jsonwebtoken");
require("dotenv").config();
const tkn = process.env.TOKEN;

const verifyToken = (req, res, next) => {
  const tokenString = req.headers.authorization;
  const token = tokenString.split(" ")[1];
  if (token) {
    jwt.verify(token, tkn, (err, decoded) => {
      if (err) {
        return res.send({ status: 403, message: "Unauthorized Access!" });
      } else {
        next();
      }
    });
  } else {
    return res.send({ status: 401, message: "Please login!" });
  }
};

module.exports = verifyToken;
