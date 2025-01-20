const exp = require("express");
const expAsyncHandler = require("express-async-handler");
const doctorsApp = exp.Router();

const fetchAllDoctors = expAsyncHandler(async (req, res) => {
  const doctorsCollection = req.app.get("doctorsCollection");
  let resData = await doctorsCollection.find().toArray();
  return res.send({ status: 200, payload: resData });
});

doctorsApp.get("/", fetchAllDoctors);

module.exports = doctorsApp;
