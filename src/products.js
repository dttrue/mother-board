let allProducts = []; // Array to store all fetched products

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', handleSearch);

    const productsGrid = document.getElementById('products-grid');
    productsGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-button')) {
            const productId = event.target.getAttribute('data-product-id');
            addToCart(productId);
        }
    });
});

function fetchProducts(searchQuery = '') {
    fetch("https://fakestoreapi.com/products/category/electronics")
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            displayProducts(searchQuery ? filterProducts(searchQuery, products) : products);
        })
        .catch(error => console.error("Error fetching products:", error));
}

function filterProducts(searchQuery, products) {
    return products.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
}

function handleSearch(event) {
    const searchText = event.target.value.toLowerCase();
    displayProducts(filterProducts(searchText, allProducts));
}

function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Clear the container

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
            <div class="mdc-touch-target-wrapper">
                <button class="mdc-button mdc-button--touch add-to-cart-button" data-product-id="${product.id}">
                    <span class="mdc-button__label">Add To Cart</span>
                </button>
            </div>`;
        productsGrid.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === parseInt(productId));
    if (!product) {
        console.error('Product not found!');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Added to cart:', product);
}
