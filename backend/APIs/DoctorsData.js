// const exp = require("express");
// const expAsyncHandler = require("express-async-handler");
// const doctorsApp = exp.Router();

// const fetchAllDoctors = expAsyncHandler(async (req, res) => {
//   const doctorsCollection = req.app.get("doctorsCollection");
//   let resData = await doctorsCollection.find().toArray();
//   return res.send({ status: 200, payload: resData });
// });

// doctorsApp.get("/", fetchAllDoctors);

// module.exports = doctorsApp;

const express = require("express");
const { ObjectId } = require("mongodb");

const doctorsApp = express.Router();

// Middleware to access the collection from `req.app`
const getDoctorsCollection = (req) => req.app.get("doctorsCollection");

// Fetching all the doctors
doctorsApp.get("/", async (req, res) => {
  try {
    const doctorsCollection = getDoctorsCollection(req);
    const doctors = await doctorsCollection.find().toArray();
    res.status(200).send({ status: 200, payload: doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
});

// Adding a new doctor
doctorsApp.post("/add", async (req, res) => {
  try {
    const doctorsCollection = getDoctorsCollection(req);
    const newDoctor = req.body;
    const result = await doctorsCollection.insertOne(newDoctor);
    res.status(201).send({
      status: 201,
      message: "Doctor added successfully",
      payload: result,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).send({ status: 500, message: "Error adding doctor", error });
  }
});

// Updating a doctor
doctorsApp.put("/:id", async (req, res) => {
  try {
    const doctorsCollection = getDoctorsCollection(req);
    const { id } = req.params;
    const updatedDoctor = req.body;
    const result = await doctorsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedDoctor }
    );
    if (result.modifiedCount === 1) {
      res.status(200).send({ status: 200, message: "Doctor updated successfully" });
    } else {
      res.status(404).send({ status: 404, message: "Doctor not found" });
    }
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).send({ status: 500, message: "Error updating doctor", error });
  }
});

// Deleting a doctor
doctorsApp.delete("/:id", async (req, res) => {
  try {
    const doctorsCollection = getDoctorsCollection(req);
    const { id } = req.params;
    const result = await doctorsCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).send({ status: 200, message: "Doctor deleted successfully" });
    } else {
      res.status(404).send({ status: 404, message: "Doctor not found" });
    }
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).send({ status: 500, message: "Error deleting doctor", error });
  }
});

module.exports = doctorsApp;
