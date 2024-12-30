require("dotenv").config();
const exp = require("express");
const cors = require("cors");
const doctorsApp = require("./APIs/DoctorsData.js");
const storeApp = require("./APIs/StoreData.js");
const userApp = require("./APIs/usersApp.js");
const client = require("mongodb").MongoClient;
const app = exp();
const port = process.env.PORT || 3500;
app.use(cors());
app.use(exp.json());

client
  .connect(process.env.DB_URI)
  .then((client) => {
    const dbObj = client.db("medicineDB");
    const doctorsCollection = dbObj.collection("doctors");
    app.set("doctorsCollection", doctorsCollection);
    const medicinesCollection = dbObj.collection("medicines");
    app.set("medicinesCollection", medicinesCollection);
    const usersCollection = dbObj.collection("users");
    app.set("usersCollection", usersCollection);
    console.log("DB Connected Successfully.");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send({ message: "Test for CORS." });
});

app.use("/doctors", doctorsApp);
app.use("/store", storeApp);
app.use("/users", userApp);

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});
