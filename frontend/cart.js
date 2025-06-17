const API_BASE = 'http://localhost:5000'; // Change to Render URL in production

const cart = JSON.parse(localStorage.getItem('cart')) || [];

fetch(`${API_BASE}/api/products`)
  .then(res => res.json())
  .then(products => {
    const cartItemsContainer = document.getElementById('cart-items');
    let total = 0;

    cart.forEach(item => {
      const product = products.find(p => p._id === item.id);
      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${itemTotal}</p>
      `;
      cartItemsContainer.appendChild(div);
    });

    document.getElementById('total').innerText = `Total: $${total}`;
  });

// Checkout: call backend Stripe route
function checkout() {
  // Get full product data to send to backend
  fetch(`${API_BASE}/api/products`)
    .then(res => res.json())
    .then(products => {
      const productsToCheckout = cart.map(item => {
        const product = products.find(p => p._id === item.id);
        return {
          name: product.name,
          price: product.price,
          quantity: item.quantity
        };
      });

      // Call backend checkout API
      fetch(`${API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: productsToCheckout })
      })
      .then(res => res.json())
      .then(data => {
        window.location.href = data.url; // Redirect to Stripe
      })
      .catch(err => console.error(err));
    });
}
