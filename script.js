// ✅ Use your backend URL (localhost for dev)
const API_URL = 'http://localhost:5000/api/products';

// ✅ Fetch products from backend
fetch(API_URL)
  .then(response => response.json())
  .then(products => {
    console.log(products); // see real data

    // ✅ Example: insert products into HTML
    const productsContainer = document.getElementById('products');

    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product-card';

      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart('${product._id}')">Add to Cart</button>
      `;

      productsContainer.appendChild(productElement);
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });

// ✅ Example: basic add to cart (expand later!)
function addToCart(productId) {
  console.log('Added to cart:', productId);
  // You can store to localStorage or send to backend
}

// Save to localStorage
function addToCart(productId) {
  // Get current cart or empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if product already in cart
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    // If yes, increase quantity
    existing.quantity += 1;
  } else {
    // If not, add new
    cart.push({ id: productId, quantity: 1 });
  }

  // Save updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert('Added to cart!');
}

// To check current cart in browser:
console.log(JSON.parse(localStorage.getItem('cart')));

