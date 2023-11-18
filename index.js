
document.addEventListener('DOMContentLoaded', () => {
    

    if (window.location.pathname.endsWith('products.html')) {
        fetchProducts();
    }

    // Newsletter form submission
    const form = document.querySelector('#newsletter-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for subscribing!');
    });

});





