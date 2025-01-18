const exp = require("express");
const expAsyncHandler = require("express-async-handler");
const appointmentsApp = exp.Router();
const verifyToken = require("../Middleware/authenticate");

const getAllAppointments = expAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");

  let dbUser = req.body.name;
  const user = await usersCollection.findOne({ name: dbUser });
  if (user) {
    const appointmentsArr = user.appointments;
    res.send({ payload: appointmentsArr });
  } else {
    res.send({ status: 400, message: "Invalid Username" });
  }
});

const addNewAppointment = expAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");

  let newApt = req.body;
  let dbUser = newApt.name;

  let update = await usersCollection.updateOne(
    { name: dbUser },
    { $push: { appointments: newApt } }
  );

  if (update.modifiedCount === 1) {
    return res.send({
      status: 200,
      message: "Appointment Added Successfully!",
    });
  }

  return res.send({ status: 501, message: "Internal Server Error." });
});

appointmentsApp.get("/", verifyToken, getAllAppointments);
appointmentsApp.post("/add", verifyToken, addNewAppointment);

module.exports = appointmentsApp;
