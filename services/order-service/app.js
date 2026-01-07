const express = require("express");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", service: "order-service" }));

app.get("/orders", (req, res) => {
  res.json([{ id: "ord-1001", item: "sample", status: "created" }]);
});

app.post("/orders", (req, res) => {
  const order = req.body || {};
  res.status(201).json({ id: "ord-1002", ...order, status: "created" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`order-service running on ${PORT}`));
