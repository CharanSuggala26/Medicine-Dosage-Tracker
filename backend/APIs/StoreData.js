const exp = require("express");
const expAsyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");
const storeApp = exp.Router();

const fetchMedicines = expAsyncHandler(async (req, res) => {
  const medicinesCollection = req.app.get("medicinesCollection");
  let resData = await medicinesCollection.find().toArray();
  return res.send({ status: 200, payload: resData });
});

storeApp.get("/", fetchMedicines);

storeApp.post("/add",async (req,res) => {
  try {
    const medicinesCollection = req.app.get("medicinesCollection");
    const newMedicine = req.body;
    const result = await medicinesCollection.insertOne(newMedicine);
    res.status(201).send({
      status: 201,
      message: "Medicine added successfully",
      payload: result,
    });
  } catch (error) {
    console.error("Error adding medicine:", error);
    res
      .status(500)
      .send({ status: 500, message: "Error adding medicine", error });
  }
});

storeApp.put("/:id", async (req, res) => {
  try {
    const medicinesCollection = req.app.get("medicinesCollection");
    const { id } = req.params;
    const updatedMedicine = req.body;
    if (!updatedMedicine || Object.keys(updatedMedicine).length === 0) {
      return res
        .status(400)
        .send({ status: 400, message: "No data provided to update" });
    }
    const result = await medicinesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedMedicine }
    );

    if (result.modifiedCount >= 1) {
      res
        .status(200)
        .send({ status: 200, message: "Medicine updated successfully" });
    } else {
      res.status(200).send({ status: 200, message: "No change were made" });
    }
  } catch (error) {
    console.error("Error updating medicine:", error);
    res
      .status(500)
      .send({ status: 500, message: "Error updating medicine", error });
  }
});

storeApp.delete("/:id", async (req, res) => {
  try {
    const medicinesCollection = req.app.get("medicinesCollection");
    const { id } = req.params;

    const objectId = new ObjectId(id);

    const result = await medicinesCollection.deleteOne({ _id: objectId });

    if (result.deletedCount >= 1) {
      res
        .status(200)
        .send({ status: 200, message: "Medicine deleted successfully" });
    } else {
      res.status(200).send({ status: 200, message: "Medicine not deleted" });
    }
  } catch (error) {
    console.error("Error deleting medicine:", error);
    res
      .status(500)
      .send({ status: 500, message: "Error deleting medicine", error });
  }
});

module.exports = storeApp;
