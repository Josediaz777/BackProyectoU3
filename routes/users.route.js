const express = require("express");
const Users = require("../models/Users");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const users = await Users.findById(req.params.id);
      if(users == null) return res.status(404).json({message: "No existe este currículum"})
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;