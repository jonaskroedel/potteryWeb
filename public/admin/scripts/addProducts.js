// Get the modal
var modal = document.getElementById("addProductModal");

// Get the button that opens the modal
var btn = document.getElementById("addProductButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Add a variable to keep track of the product being edited
let productBeingEdited = null;

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle the form submission
document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);
    var formMode = document.getElementById('formMode').value;
    var actionUrl = 'http://localhost:3000/api/add-product';
    var method = 'POST';

    // If in 'edit' mode, change the URL and method for updating the product
    if (formMode === 'edit') {
        var productId = document.getElementById('productId').value;
        actionUrl = 'http://localhost:3000/api/products/' + productId;
        method = 'PUT';
    }

    fetch(actionUrl, {
        method: method,
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (formMode === 'add') {
                addProductToGrid(data.product);
            } else {
                // Handle the UI update for an edited product
            }
            alert('Operation Successful');
            document.getElementById('addProductModal').style.display = 'none';
            this.reset();
            document.getElementById('formMode').value = 'add'; // Reset form mode
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Operation Failed');
        });
});

// Function to add a product to the grid
function addProductToGrid(product) {
    const productGrid = document.getElementById('productGrid');
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: €${product.price.toFixed(2)}</p>
        <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: auto;">
    `;

    // Create the Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-button';
    editBtn.textContent = 'Edit Product';
    editBtn.onclick = () => editProduct(product);
    productDiv.appendChild(editBtn);

    productGrid.appendChild(productDiv);
}

function editProduct(product) {
    // Set the productBeingEdited variable
    productBeingEdited = product;

    // Populate the form fields
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productColor').value = product.color;
    // Note: Handling the image file might require a different approach

    // Show the modal
    document.getElementById('addProductModal').style.display = 'block';
}

function loadProducts() {
    document.getElementById('loadingIndicator').style.display = 'block';

    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => addProductToGrid(product));
            // Hide loading indicator
        })
        .catch(error => {
            console.error('Failed to load products:', error);
            // Hide loading indicator
        });
    document.getElementById('loadingIndicator').style.display = 'none';
}

// Call loadProducts when the page loads
window.addEventListener('DOMContentLoaded', loadProducts);