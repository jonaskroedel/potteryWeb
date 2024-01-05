function getProductDetails(productId) {
    fetch(`http://localhost:3000/api/products/${productId}`) // Adjust the endpoint as needed
        .then(response => response.json())
        .then(product => {
            const productDetails = document.getElementById('productDetails');
            productDetails.innerHTML = `
                <h1>${product.name}</h1>
                <img src="${product.imageUrl}" alt="${product.name}">
                <p>${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
            `;
        })
        .catch(error => {
            console.error('Failed to load product details:', error);
        });
}

// Get the product ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

// Load the product details
if (productId) {
    getProductDetails(productId);
}
