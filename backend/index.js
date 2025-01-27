require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// Import routers
const doctorsApp = require("./APIs/DoctorsData.js");
const storeApp = require("./APIs/StoreData.js");
const userApp = require("./APIs/usersApp.js");
const appointmentsApp = require("./APIs/appointmentsApp.js");
const modelApp = require("./APIs/modelRequest.js");
const medicineApp = require("./APIs/medicineApp.js");

const app = express();
const port = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.DB_URI);
client
  .connect()
  .then(() => {
    const db = client.db("medicineDB");
    app.set("doctorsCollection", db.collection("doctors"));
    app.set("medicinesCollection", db.collection("medicines"));
    app.set("usersCollection", db.collection("users"));
    app.set("appointmentsCollection", db.collection("appointments"));
    console.log("DB Connected Successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });

// Test route
app.get("/", (req, res) => {
  res.send({ message: "Server is running." });
});

// Routes
app.use("/doctors", doctorsApp);
app.use("/store", storeApp);
app.use("/users", userApp);
app.use("/appointments", appointmentsApp);
app.use("/model", modelApp);
app.use("/medicines", medicineApp);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
