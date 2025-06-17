import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const { products } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: products.map(p => ({
      price_data: {
        currency: 'usd',
        product_data: { name: p.name },
        unit_amount: p.price * 100, // Stripe expects cents
      },
      quantity: p.quantity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:5500/success.html', // or your deployed site!
    cancel_url: 'http://localhost:5500/cart.html',
  });

  res.json({ url: session.url });
});

export default router;
