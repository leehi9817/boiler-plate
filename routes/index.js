const router = require("express").Router();

const { User } = require("../models/User");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

module.exports = router;
