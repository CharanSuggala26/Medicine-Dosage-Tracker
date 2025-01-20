const exp = require("express");
const expAsyncHandler = require("express-async-handler");
const appointmentsApp = exp.Router();
const verifyToken = require("../Middleware/authenticate");

const getAllAppointments = expAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  let dbUser = req.headers.curr_user_name;
  const user = await usersCollection.findOne({ name: dbUser });
  if (user) {
    const appointmentsArr = user.appointments;
    res.send({ status: 200, payload: appointmentsArr });
  } else {
    res.send({ status: 400, message: "Invalid Username" });
  }
});

const addNewAppointment = expAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");

  console.log("Here");

  let newApt = req.body.appointment;
  let dbUser = newApt.name;

  console.log(newApt, dbUser);

  let update = await usersCollection.updateOne(
    { name: dbUser },
    { $push: { appointments: newApt } }
  );

  console.log("Count: ", update);

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
