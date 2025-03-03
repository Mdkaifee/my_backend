// backend/routes/api.js
const express = require("express");
const router = express.Router();

router.get("/data", (_req, res) => {
  res.json({ message: "Data from the backend" });
});

module.exports = router;
