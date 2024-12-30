const jwt = require("jsonwebtoken");
require("dotenv").config();
const tkn = process.env.TOKEN;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, tkn, (err, decoded) => {
      if (err) {
        res.send({ status: 403, message: "Unauthorized Access!" });
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = verifyToken;
