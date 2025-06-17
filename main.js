const API_BASE = 'http://localhost:5000'; // Use your Render URL later

// Fetch products from your backend
fetch(`${API_BASE}/api/products`)
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('products');

    products.forEach(product => {
      // Use your original card HTML structure:
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      productCard.innerHTML = `
        <div class="card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">₹${product.price}</p>
          <button class="view-btn">View</button>
          <button class="add-cart-btn">Add to Cart</button>
        </div>
      `;

      // View -> redirect to product detail page
      productCard.querySelector('.view-btn').addEventListener('click', () => {
        window.location.href = `product.html?id=${product._id}`;
      });

      // Add to Cart
      productCard.querySelector('.add-cart-btn').addEventListener('click', () => {
        addToCart(product._id);
      });

      container.appendChild(productCard);
    });
  })
  .catch(err => console.error('Error fetching products:', err));

// Add to Cart handler
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}
