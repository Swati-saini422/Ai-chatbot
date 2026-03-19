
const express = require("express");
const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const reply = "AI Reply: " + message;

    res.json({
      reply: reply
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;