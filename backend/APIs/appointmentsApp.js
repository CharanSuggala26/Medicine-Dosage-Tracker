const exp = require("express");
const expAsyncHandler = require("express-async-handler");
const appointmentsApp = exp.Router();
const verifyToken = require("../Middleware/authenticate");
const nodemailer = require("nodemailer");
require("dotenv").config();

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

  const recipient = process.env.RECIPIENT;
  const subject = "Appointment Booked!";
  const { name, email, phone, date, time, doctorName, specialty, symptoms } = newApt;

  const message = `
    Subject: Appointment Confirmation – ${doctorName} (${specialty})

    Dear ${name},

    Your appointment has been successfully booked. Below are the details of your appointment:

    📅 Date: ${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    ⏰ Time: ${time}
    👨‍⚕️ Doctor: ${doctorName}
    🏥 Specialty: ${specialty}
    📝 Symptoms: ${symptoms}

    📞 Contact: ${phone}

    Looking forward to serving you!

    PillPlanner © 2025. All rights reserved.
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject,
      text: message,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }

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
