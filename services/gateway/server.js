const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// In Kubernetes these names will work automatically
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://order-service:3000";
const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || "http://inventory-service:3000";

app.get("/health", (req, res) => res.json({ status: "ok", service: "gateway" }));

app.get("/orders", async (req, res) => {
  const r = await axios.get(`${ORDER_SERVICE_URL}/orders`);
  res.json(r.data);
});

app.post("/orders", async (req, res) => {
  const r = await axios.post(`${ORDER_SERVICE_URL}/orders`, req.body);
  res.json(r.data);
});

app.get("/inventory", async (req, res) => {
  const r = await axios.get(`${INVENTORY_SERVICE_URL}/inventory`);
  res.json(r.data);
});

app.listen(3000, () => console.log("gateway listening on 3000"));
