// ============================================
//  MINISTEA CART SYSTEM — cart.js
//  Load this BEFORE main.js in index.html
// ============================================

window.cart = [];

// --- RENDER ---
function renderCart() {
    const body   = document.getElementById('cartDrawerBody');
    const footer = document.getElementById('cartDrawerFooter');
    const badge  = document.getElementById('cartBadge');

    const totalItems = window.cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = window.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    // Badge
    if (badge) {
        badge.textContent = totalItems;
        badge.classList.toggle('has-items', totalItems > 0);
    }

    if (!body || !footer) return;

    // Empty state
    if (window.cart.length === 0) {
        body.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon"><i class="fas fa-shopping-bag"></i></div>
                <p>Your cart is empty</p>
                <span>Add something delicious from our menu!</span>
            </div>`;
        footer.innerHTML = '';
        return;
    }

    // Cart items
    body.innerHTML = window.cart.map((item, idx) => `
        <div class="cart-item" data-idx="${idx}">
            <div class="cart-item-img"><i class="fas fa-mug-hot"></i></div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-category">${item.category}</div>
                <div class="cart-item-price">₱${(item.price * item.qty).toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="cart-qty-btn" onclick="changeQty(${idx}, -1)">−</button>
                <span class="cart-qty">${item.qty}</span>
                <button class="cart-qty-btn" onclick="changeQty(${idx}, 1)">+</button>
                <button class="cart-remove-btn" onclick="removeFromCart(${idx})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Footer
    footer.innerHTML = `
        <div class="cart-total-row">
            <span>Total</span>
            <span class="cart-total-price">₱${totalPrice.toFixed(2)}</span>
        </div>
        <button class="cart-checkout-btn">
            <i class="fas fa-receipt"></i> Place Order
        </button>
        <button class="cart-clear-btn" onclick="clearCart()">Clear Cart</button>
    `;
}

// --- ADD ---
window.addToCart = function(name, category, price) {
    const existing = window.cart.find(i => i.name === name);
    if (existing) {
        existing.qty++;
    } else {
        window.cart.push({ name, category, price, qty: 1 });
    }
    renderCart();
    openCart();
    showAddedToast(name);
};

// --- CHANGE QTY ---
window.changeQty = function(idx, delta) {
    if (!window.cart[idx]) return;
    window.cart[idx].qty += delta;
    if (window.cart[idx].qty <= 0) window.cart.splice(idx, 1);
    renderCart();
};

// --- REMOVE ---
window.removeFromCart = function(idx) {
    window.cart.splice(idx, 1);
    renderCart();
};

// --- CLEAR ---
window.clearCart = function() {
    window.cart = [];
    renderCart();
};

// --- DRAWER OPEN / CLOSE ---
function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer || !overlay) return;

    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer || !overlay) return;

    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// --- TOAST ---
function showAddedToast(name) {
    let toast = document.getElementById('cartToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cartToast';
        toast.className = 'cart-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <strong>${name}</strong> added to cart!`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    document.getElementById('cartToggleBtn')?.addEventListener('click', () => {
        const drawer = document.getElementById('cartDrawer');
        if (!drawer) return;
        drawer.classList.contains('open') ? closeCart() : openCart();
    });

    document.getElementById('cartCloseBtn')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
});