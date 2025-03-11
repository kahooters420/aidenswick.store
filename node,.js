const express = require('express');
const Stripe = require('stripe');
const app = express();
const stripe = Stripe('sk_test_51R10hpFQNTPtHURMlWANgTINee88PEk9Mx78OV8habhtZUcmb4HrqFofwBc6m1ChhReWd7VmYT6q7j8qywHy6gjc00K6m5aYLo'); // Replace with your Stripe secret key

app.use(express.json());

// Endpoint to create a Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
