const router = require("express").Router();

const { User } = require("../models/User");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

module.exports = router;
