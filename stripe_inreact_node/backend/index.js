require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY)
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = 8080;


app.post("/checkout", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(items => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: items.name
                        },
                        unit_amount: (items.price) * 100
                    },
                    quantity: items.quantity
                }
            }),
            success_url: "http://localhost:8080/success",
            cancel_url: "http://localhost:8080/cancel",
        })
        res.json({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/success", (req, res) => {
    res.send("Payment successful! 🎉 Thank you for your purchase.");
});

app.get("/cancel", (req, res) => {
    res.send("Payment was cancelled. Try again.");
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})