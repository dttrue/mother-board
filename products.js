//Fetch products
function fetchProducts() {
    fetch('https://fakestoreapi.com/products/category/electronics') 
        .then(response => response.json())
        .then(products => {
            const productsGrid = document.querySelector('#products-grid');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item');
                productDiv.innerHTML = `<img src="${product.image}" alt="${product.title}"><h3>${product.title}</h3><p>$${product.price}</p><p>${product.description}</p> <div class="mdc-touch-target-wrapper">
                <button class="class="mdc-button mdc-button--touch add-to-cart-button" data-product-id="1">
                  <span class="mdc-button__label">Add to Cart</span>
                </button>
              </div>`;
                productsGrid.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}


function fetchCart() {
    

    fetch(`https://fakestoreapi.com/carts`) 
        .then(response => response.json())
        .then(cart => {
            const cartItemsContainer = document.querySelector('#cart-items');
            cartItemsContainer.innerHTML = '${id} ${userID} ${data} ${product}'; 

            cart.products.forEach(item => {
              
                fetchProductDetails(item.productId).then(product => {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    cartItemDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: $${product.price}</p>`;
                    cartItemsContainer.appendChild(cartItemDiv);
                });
            });
        })
        .catch(error => console.error('Error fetching cart:', error));
}

async function fetchProductDetails() {
    const response = await fetch(`https://fakestoreapi.com/carts`);
    return response.json();
}







function initializeAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            saveProductToCart(productId);
        });
    });
}


