const apiBaseUrl = 'https://fakestoreapi.com/products/category/makeup';


function addItemToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));    

    fetch(`${apiBaseUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => console.log('Server response:', data))
    .catch(error => console.error('Error adding item to server cart:', error));
}



async function getCartItems() {
    try {
        const response = await fetch(`${apiBaseUrl}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return console.error('Error fetching cart items:', error);
    }
}


function updateCartItem(itemId, updatedData) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cart[itemIndex] = updatedData;
        localStorage.setItem('cart', JSON.stringify(cart));


        fetch(`${apiBaseUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error updating server cart:', error));
    }
}



function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));

    
    fetch(`${apiBaseUrl}/remove/${itemId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log('Server response:', data))
    .catch(error => console.error('Error removing item from server cart:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

async function displayCartItems() {
    const cartItems = await getCartItems(); // Await the async function call
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear existing items

    let total = 0;
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <p>${product.date}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price}</p>
            <button onclick="removeCartItem(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}


