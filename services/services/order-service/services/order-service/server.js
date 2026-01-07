const express = require("express");
const app = express();
app.use(express.json());

let orders = [{ id: 1, item: "coffee", qty: 1 }];

app.get("/health", (req, res) => res.json({ status: "ok", service: "order-service" }));

app.get("/orders", (req, res) => res.json({ orders }));

app.post("/orders", (req, res) => {
  const { item, qty } = req.body || {};
  const id = orders.length + 1;
  const order = { id, item: item || "unknown", qty: qty || 1 };
  orders.push(order);
  res.json({ created: order });
});

app.listen(3000, () => console.log("order-service listening on 3000"));
