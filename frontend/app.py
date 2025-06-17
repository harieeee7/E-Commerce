from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data for products
products = [
    {"id": 1, "name": "Darbar Vintage Art Poster", "price": 3599, "rating": 4.5, "image": "url1"},
    {"id": 2, "name": "Annamalai - The rise of the new king", "price": 9999, "rating": 4.7, "image": "url2"},
    {"id": 3, "name": "Thalapathy - The lone warrior", "price": 1599, "rating": 4.2, "image": "url3"},
    # Add more products as needed
]

# Endpoint to get all products
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify({"products": products})

# Endpoint to get product by ID
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

# Endpoint for user authentication (dummy example)
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if username == "admin" and password == "password":
        return jsonify({"message": "Login successful"})
    return jsonify({"error": "Invalid credentials"}), 401

# Endpoint to handle the shopping cart
cart = []

@app.route('/cart', methods=['GET'])
def get_cart():
    return jsonify({"cart": cart})

@app.route('/cart', methods=['POST'])
def add_to_cart():
    product_id = request.json.get("product_id")
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        cart.append(product)
        return jsonify({"message": "Product added to cart", "cart": cart})
    return jsonify({"error": "Product not found"}), 404

@app.route('/cart/<int:product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    global cart
    cart = [p for p in cart if p["id"] != product_id]
    return jsonify({"message": "Product removed from cart", "cart": cart})

if __name__ == "__main__":
    app.run(debug=True)
