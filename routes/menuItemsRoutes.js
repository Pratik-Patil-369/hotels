const express = require("express");
const router = express.Router();
const MenuItems = require("../models/MenuItems");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItems = new MenuItems(data);

    const response = await newMenuItems.save();
    console.log("data saved");
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Get method to get the menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItems.find();
    console.log("data fetched");
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; //Extract the work type from the url parameter
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItems.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the id from the URL parameter
    const updatedMenuData = req.body; // Updated data for the person

    const response = await MenuItems.findByIdAndUpdate(
      menuId,
      updatedMenuData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
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
    const menuId = req.params.id; // Extract the id from the URL parameter

    //Assuming you have a Person model
    const response = await MenuItems.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Menu Deleted Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
