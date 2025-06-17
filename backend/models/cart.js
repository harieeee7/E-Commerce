// models/Cart.js

import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartItemSchema);

export default Cart;
