const express = require("express");
const Razorpay = require("razorpay");
require('dotenv').config();

const razorApp = express.Router();
razorApp.use(express.json());

const client = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

razorApp.post("/create-order",async(req, res)=>{
    try {
        const amount=req.body.amount;

        const order=await client.orders.create({
            amount:amount*100,
            currency: "INR",
        });

        return res.status(200).json({ "status": true, "orderId": order.id });

    } catch (err) {
        console.error("Error creating order:", err);
        return res.status(500).json({ "status": false, "message": "Failed to create order" });
    }
});

module.exports = razorApp;
