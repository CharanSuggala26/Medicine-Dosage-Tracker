const jwt = require("jsonwebtoken");
require("dotenv").config();
const tkn = process.env.TOKEN;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, tkn, (err, decoded) => {
      if (err) {
        return res.send({ status: 403, message: "Unauthorized Access!" });
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = verifyToken;
