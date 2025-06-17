// routes/cart.js

import express from 'express';
import Cart from '../models/cart.js';
import Product from '../models/products.js'; // optional, for validation
import authMiddleware from '../middleware/authMiddleware.js'; // assumes you have JWT auth

const router = express.Router();

// Add product to cart
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Optional: check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if item already in cart
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // If exists, update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Else, create new
      cartItem = new Cart({ userId, productId, quantity });
      await cartItem.save();
    }

    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user.id }).populate('productId');
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update quantity
router.put('/update/:id', authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findOne({ _id: req.params.id, userId: req.user.id });

    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from cart
router.delete('/remove/:id', authMiddleware, async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    res.status(200).json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
