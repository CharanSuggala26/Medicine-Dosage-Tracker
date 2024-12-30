const exp = require("express");
const expAsyncHandler = require("express-async-handler");
const storeApp = exp.Router();

const fetchMedicines = expAsyncHandler(async (req, res) => {
  const medicinesCollection = req.app.get("medicinesCollection");
  let resData = await medicinesCollection.find().toArray();
  console.log(resData);
  return res.send({ status: 200, payload: resData });
});

storeApp.get("/", fetchMedicines);

module.exports = storeApp;
