const apiBaseUrl = 'https://fakestoreapi.com/carts';

// Add item to cart
function addItemToCart(item) {
    fetch(`${apiBaseUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error adding item:', error));
}

// Get cart items
async function getCartItems() {
    try {
        const response = await fetch(`${apiBaseUrl}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return console.error('Error fetching cart items:', error);
    }
}

// Update item in cart
function updateCartItem(itemId, updatedData) {
    fetch(`${apiBaseUrl}/update/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error updating item:', error));
}

// Remove item from cart
function removeCartItem(itemId) {
    fetch(`${apiBaseUrl}/remove/${itemId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error removing item:', error));
}

// Additional functionalities as needed...

