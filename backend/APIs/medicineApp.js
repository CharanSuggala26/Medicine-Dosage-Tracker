const exp = require("express");
const expAsyncHandler = require("express-async-handler");
const verifyToken = require("../Middleware/authenticate");
const medicineApp = exp.Router();

const fetchMedicines = expAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const username = req.headers.curr_user_name;
  const dbUser = await usersCollection.findOne({ name: username });
  if (dbUser) {
    const medicines = dbUser.medicineData;
    res.send({ status: 200, payload: medicines });
  } else {
    res.send({ status: 400, message: "Invalid Username" });
  }
});

const addNewMedicine = expAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");

  let newMed = req.body.medicine;
  let dbUser = newMed.uname;

  let update = await usersCollection.updateOne(
    { name: dbUser },
    { $push: { medicineData: newMed } }
  );

  if (update.modifiedCount === 1) {
    return res.send({
      status: 200,
      message: "Appointment Added Successfully!",
    });
  }

  return res.send({ status: 501, message: "Internal Server Error." });
});

medicineApp.get("/", verifyToken, fetchMedicines);
medicineApp.post("/add", verifyToken, addNewMedicine);

module.exports = medicineApp;
