require("dotenv").config();
const exp = require("express");
const cors = require("cors");
const doctorsApp = require("./APIs/DoctorsData");
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
    console.log("DB Connected Successfully.");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send({ message: "Test for CORS." });
});

app.use("/doctors", doctorsApp);

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});
