// const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
// const Stripe = require("stripe");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
// app.use(cors({ origin: true }));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  if (total > 0) {
    //     console.log('payment resieved',total)
    //     res.send(total)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
