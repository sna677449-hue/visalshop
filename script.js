// Database Array
const productCatalog = [
    { id: 1, name: "Nike Mercurial Veloce III NJR Written In The Star", price: 180.00, category: "nike cleats", image: 'photo/nike-1.jpg' },
    { id: 2, name: "Nike Dunk Low Retro : Black", price: 120.00, category: "nike sneakers", image: 'photo/nike-8.jpg' },
    { id: 3, name: "Nike Mercurial Superfly V CR7 Cut to Brilliance", price: 550.00, category: "nike cleats", image: 'photo/nike-4.jpg' },
    { id: 4, name: "Nike Hypervenom Phatal II Neymar JR", price: 200.00, category: "nike cleats", image: 'photo/nike-2.jpg' },
    { id: 5, name: "Nike P-6000", price: 150.00, category: "nike sneakers", image: 'photo/nike-6.jpg' },
    { id: 6, name: "Nike Air Force 1 Shadow", price: 170.00, category: "nike sneakers", image: 'photo/nike-5.jpg' }
];

// Initialize Cart Memory across multiple html pages
let cart = JSON.parse(localStorage.getItem('visalshop_cart')) || [];

// Target Elements Elements Global Selection
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountBadge = document.getElementById('cart-count');
const cartTotalPriceText = document.getElementById('cart-total-price');

// --- Cart Panel UI Interaction Listeners ---
if(cartIcon) {
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });
}

function closeCartSidebar() {
    if(cartSidebar) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
}

if(closeCart) closeCart.addEventListener('click', closeCartSidebar);
if(cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

// --- Product Shop Catalog Generator ---
function displayShopProducts(filteredList = productCatalog) {
    const shopGrid = document.getElementById('shop-grid');
    if (!shopGrid) return;
    
    shopGrid.innerHTML = '';
    
    filteredList.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-btn" onclick="addToCart(${product.id})">Add To Cart</button>
            </div>
        `;
        shopGrid.appendChild(card);
    });
}

// --- Category Filtration Execution ---
function filterCategory(categoryName, elementBtn) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    elementBtn.classList.add('active');

    if(categoryName === 'all') {
        displayShopProducts(productCatalog);
    } else {
        const filtered = productCatalog.filter(p => p.category === categoryName);
        displayShopProducts(filtered);
    }
}

// --- Cart Business Rules State Modifiers ---
function addToCart(productId) {
    const productObj = productCatalog.find(p => p.id === productId);
    cart.push(productObj);
    saveAndSyncCart();
    
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndSyncCart();
}

function saveAndSyncCart() {
    localStorage.setItem('eshop_cart', JSON.stringify(cart));
    renderCartDOM();
}

function renderCartDOM() {
    if(!cartCountBadge) return;
    
    cartCountBadge.innerText = cart.length;
    cartItemsContainer.innerHTML = '';
    let runningSum = 0;

    cart.forEach((item, index) => {
        runningSum += item.price;
        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <img src="${item.image}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <i class="fa-solid fa-trash-can remove-btn" onclick="removeFromCart(${index})"></i>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    cartTotalPriceText.innerText = `$${runningSum.toFixed(2)}`;
}

function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placement simulation successful! Thank you.");
    cart = [];
    saveAndSyncCart();
    closeCartSidebar();
}

function handleContactSubmit(event) {
    event.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
    event.target.reset();
}

renderCartDOM();