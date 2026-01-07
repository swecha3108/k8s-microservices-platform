const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "user-service running" });
});

app.listen(3000, () => console.log("User service running on port 3000"));
