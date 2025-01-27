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
    for (let i = 0; i < appointmentsArr.length; i++) {
      const dateObj = new Date(appointmentsArr[i].date);
      const currDate = new Date();
      if (dateObj < currDate) {
        appointmentsArr[i] = null;
      }
    }

    const newAppointments = [];
    for (let i = 0; i < appointmentsArr.length; i++) {
      if (appointmentsArr[i]) {
        newAppointments.push(appointmentsArr[i]);
      }
    }

    await usersCollection.updateOne(
      { name: dbUser },
      { $set: { appointments: newAppointments } }
    );

    res.send({ status: 200, payload: newAppointments });
  } else {
    res.send({ status: 400, message: "Invalid Username" });
  }
});

const addNewAppointment = expAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");

  let newApt = req.body.appointment;
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
