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

const updateTaken = expAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const username = req.body.name;
  const medID = req.body.id;

  let user = await usersCollection.findOne({ name: username });
  let medData = user.medicineData;
  for (let i = 0; i < medData.length; i++) {
    if (medData[i].id === medID) {
      medData[i].taken = !medData[i].taken;
      break;
    }
  }

  console.log(medData);

  let update = await usersCollection.updateOne(
    { name: username },
    { $set: { medicineData: medData } }
  );

  if (update.modifiedCount === 1) {
    return res.send({
      status: 200,
      message: "Success!",
    });
  }

  return res.send({ status: 501, message: "Internal Server Error." });
});

medicineApp.get("/", verifyToken, fetchMedicines);
medicineApp.post("/add", verifyToken, addNewMedicine);
medicineApp.post("/update", verifyToken, updateTaken);

module.exports = medicineApp;
