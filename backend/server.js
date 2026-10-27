const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ================= CONNECT DB =================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ================= ORDER MODEL =================
const Order = mongoose.model("Order", {
  customer: Object,
  items: Array,
  total: Number,
  reference: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("API is working");
});

// CREATE ORDER
app.post("/create-order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.json({ message: "Order saved", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VERIFY PAYMENT
app.post("/verify-payment", async (req, res) => {
  const { reference } = req.body;

  try {
    const order = await Order.findOne({ reference });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "paid";
    await order.save();

    res.json({ message: "Payment verified" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL ORDERS (admin view)
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// ================= START SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});