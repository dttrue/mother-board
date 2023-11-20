document.addEventListener('DOMContentLoaded', () => {
    fetchFeaturedProducts();
});

function fetchFeaturedProducts() {
    fetch("https://fakestoreapi.com/products/category/electronics?limit=4") // Replace with your actual API endpoint
        .then(response => response.json())
        .then(featuredProducts => {
            displayFeaturedProducts(featuredProducts);
        })
        .catch(error => console.error("Error fetching featured products:", error));
}

function displayFeaturedProducts(products) {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    featuredProductsGrid.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>`;
        featuredProductsGrid.appendChild(productDiv);
    });
}


