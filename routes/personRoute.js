const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

//Post route to add a person

// router.post("/person", (req, res) => {
//   const data = req.body; //Assuming the request body contains the person data

//create a new Person document using the Mongoose model
// const newPerson = new Person();
// newPerson.name = data.name;
// newPerson.age = data.age;
// newPerson.work = data.work;
// newPerson.mobile = data.mobile;
// newPerson.email = data.email;
// newPerson.address = data.address;
// newPerson.salary = data.salary;
// const newPerson = new Person(data);

//Save the new person to the database
// newPerson.save((error, savedPerson) => {
//   if (error) {
//     console.log("Error saving person", error);
//     res.status(500).json({ error: "Internal server error" });
//   } else {
//     console.log("Data saved successfully");
//     res.status(200).json(savedPerson);
//   }
// });

//MongooseError: Model.prototype.save() no longer accepts a callback
//so we use async ans await
// });

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the work type from the url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter

    //Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Person Deleted Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
