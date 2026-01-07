const express = require("express");
const app = express();

const inventory = [
  { sku: "coffee", available: 120 },
  { sku: "tea", available: 80 }
];

app.get("/health", (req, res) => res.json({ status: "ok", service: "inventory-service" }));
app.get("/inventory", (req, res) => res.json({ inventory }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`order-service listening on ${PORT}`));
