require("dotenv").config();
const exp = require("express");
const app = exp();
const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});
