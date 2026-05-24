// Apple Store mini app
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    try { tg.disableVerticalSwipes && tg.disableVerticalSwipes(); } catch (_) {}
}

// ====== Catalog (mirrored from products.py) ======
const CATALOG = {
    iphone: {
        title: "iPhone",
        items: [
            {
                id: "iphone-15-pro-max",
                name: "iPhone 15 Pro Max",
                tagline: "Titanium. So strong. So light. So Pro.",
                price: 1199, oldPrice: 1299,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=2560&hei=1440&fmt=p-jpg",
                colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
                storage: ["256GB", "512GB", "1TB"],
                description: "iPhone 15 Pro Max с чипом A17 Pro, корпусом из титана и самой продвинутой системой камер."
            },
            {
                id: "iphone-15-pro",
                name: "iPhone 15 Pro",
                tagline: "Forged in titanium.",
                price: 999, oldPrice: 1099,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=2560&hei=1440&fmt=p-jpg",
                colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
                storage: ["128GB", "256GB", "512GB", "1TB"],
                description: "iPhone 15 Pro с титановым корпусом и новой кнопкой Action."
            },
            {
                id: "iphone-15",
                name: "iPhone 15",
                tagline: "New camera. New design.",
                price: 799, oldPrice: null,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=2560&hei=1440&fmt=p-jpg",
                colors: ["Pink", "Yellow", "Green", "Blue", "Black"],
                storage: ["128GB", "256GB", "512GB"],
                description: "iPhone 15 с Dynamic Island, камерой 48 Мп и портом USB-C."
            }
        ]
    },
    mac: {
        title: "Mac",
        items: [
            {
                id: "macbook-pro-16",
                name: 'MacBook Pro 16"',
                tagline: "Mind-blowing. Head-turning.",
                price: 2499, oldPrice: 2699,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg",
                colors: ["Space Black", "Silver"],
                storage: ["512GB", "1TB", "2TB", "4TB", "8TB"],
                description: "MacBook Pro с чипом M3 Pro или M3 Max — для тех, кто раздвигает границы."
            },
            {
                id: "macbook-air-15",
                name: 'MacBook Air 15"',
                tagline: "Impressively big. Impossibly thin.",
                price: 1299, oldPrice: null,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-15-midnight-select-202306?wid=904&hei=840&fmt=jpeg",
                colors: ["Midnight", "Starlight", "Space Gray", "Silver"],
                storage: ["256GB", "512GB", "1TB", "2TB"],
                description: "MacBook Air 15\" с чипом M2 — поразительно тонкий и быстрый."
            },
            {
                id: "imac",
                name: "iMac",
                tagline: "Hello (again).",
                price: 1299, oldPrice: null,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-select-pink-202310?wid=904&hei=840&fmt=jpeg",
                colors: ["Pink", "Blue", "Green", "Silver"],
                storage: ["256GB", "512GB", "1TB"],
                description: "iMac с чипом M3 в семи ярких цветах."
            }
        ]
    },
    ipad: {
        title: "iPad",
        items: [
            {
                id: "ipad-pro",
                name: "iPad Pro",
                tagline: "Supercharged by M2.",
                price: 799, oldPrice: 899,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202210-11inch-spacegray-wifi?wid=2560&hei=1440&fmt=p-jpg",
                colors: ["Space Gray", "Silver"],
                storage: ["128GB", "256GB", "512GB", "1TB", "2TB"],
                description: "iPad Pro с чипом M2 и дисплеем Liquid Retina XDR."
            },
            {
                id: "ipad-air",
                name: "iPad Air",
                tagline: "Serious power. Serious fun.",
                price: 599, oldPrice: null,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202203-blue?wid=2560&hei=1440&fmt=p-jpg",
                colors: ["Space Gray", "Starlight", "Pink", "Purple", "Blue"],
                storage: ["64GB", "256GB"],
                description: "iPad Air с чипом M1 и потрясающим дисплеем Liquid Retina."
            }
        ]
    },
    watch: {
        title: "Apple Watch",
        items: [
            {
                id: "watch-ultra-2",
                name: "Apple Watch Ultra 2",
                tagline: "Next-level adventure.",
                price: 799, oldPrice: null,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MREJ3ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR_WF_CO+watch-face-49-alpine-ultra2_VW_34FR_WF_CO?wid=2000&hei=2000&fmt=jpeg",
                colors: ["Titanium"],
                storage: ["49mm"],
                description: "Самые прочные и функциональные Apple Watch."
            },
            {
                id: "watch-series-9",
                name: "Apple Watch Series 9",
                tagline: "Smarter. Brighter. Mightier.",
                price: 399, oldPrice: 449,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MR9G3ref_VW_34FR+watch-45-alum-pink-nc-s9_VW_34FR_WF_CO+watch-face-45-alum-pink-s9_VW_34FR_WF_CO?wid=2000&hei=2000&fmt=jpeg",
                colors: ["Pink", "Midnight", "Starlight", "Silver", "(PRODUCT)RED"],
                storage: ["41mm", "45mm"],
                description: "Apple Watch Series 9 с чипом S9 и жестом Double Tap."
            }
        ]
    },
    airpods: {
        title: "AirPods",
        items: [
            {
                id: "airpods-pro-2",
                name: "AirPods Pro 2",
                tagline: "Adaptive Audio. Now playing.",
                price: 249, oldPrice: null,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=572&hei=572&fmt=jpeg",
                colors: ["White"],
                storage: ["USB-C"],
                description: "AirPods Pro 2 с Adaptive Audio и зарядным кейсом USB-C."
            },
            {
                id: "airpods-max",
                name: "AirPods Max",
                tagline: "High-fidelity sound. High design.",
                price: 549, oldPrice: 599,
                image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MGYJ3?wid=572&hei=572&fmt=jpeg",
                colors: ["Space Gray", "Silver", "Sky Blue", "Pink", "Green"],
                storage: ["—"],
                description: "Звук высокого качества в накладных наушниках."
            }
        ]
    }
};

// ====== State ======
let state = {
    cart: JSON.parse(localStorage.getItem("apple_cart") || "[]"),
    page: "home",
    currentProduct: null,
    selectedColor: null,
    selectedStorage: null,
    activeCategory: "all",
    history: [],
};

function saveCart() {
    localStorage.setItem("apple_cart", JSON.stringify(state.cart));
}

function flattenProducts() {
    return Object.entries(CATALOG).flatMap(([cat, c]) =>
        c.items.map((it) => ({ ...it, category: cat }))
    );
}

function findProduct(id) {
    return flattenProducts().find((p) => p.id === id);
}

// ====== Rendering ======
function fmtPrice(n) {
    return "$" + n.toLocaleString("en-US");
}

function renderFeatured() {
    const grid = document.getElementById("featuredGrid");
    const featured = [
        findProduct("iphone-15-pro-max"),
        findProduct("macbook-pro-16"),
    ].filter(Boolean);

    grid.innerHTML = featured
        .map(
            (p, i) => `
        <article class="feature-card ${i === 1 ? "dark" : ""}" data-product="${p.id}">
            <p class="feature-eyebrow">New</p>
            <h3 class="feature-name">${p.name}</h3>
            <p class="feature-tagline">${p.tagline}</p>
            <div class="feature-actions">
                <button class="btn btn-primary" data-product="${p.id}">Купить</button>
                <button class="btn btn-link" data-product="${p.id}">Подробнее →</button>
            </div>
            <img class="feature-img" src="${p.image}" alt="${p.name}" loading="lazy">
        </article>
    `
        )
        .join("");

    grid.querySelectorAll("[data-product]").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.stopPropagation();
            openProduct(el.dataset.product);
        });
    });
}

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    const all = flattenProducts();
    const items =
        state.activeCategory === "all"
            ? all
            : all.filter((p) => p.category === state.activeCategory);

    grid.innerHTML = items
        .map((p) => {
            const hasDiscount = p.oldPrice && p.oldPrice > p.price;
            return `
            <article class="product-card" data-product="${p.id}">
                ${hasDiscount ? `<span class="product-card-badge">SALE</span>` : ""}
                <div class="product-card-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
                <h3 class="product-card-name">${p.name}</h3>
                <p class="product-card-tagline">${p.tagline}</p>
                <p class="product-card-price">
                    ${hasDiscount ? `<span class="product-card-oldprice">${fmtPrice(p.oldPrice)}</span>` : ""}
                    From ${fmtPrice(p.price)}
                </p>
            </article>`;
        })
        .join("");

    grid.querySelectorAll("[data-product]").forEach((el) => {
        el.addEventListener("click", () => openProduct(el.dataset.product));
    });
}

function renderProductDetail(p) {
    const hasDiscount = p.oldPrice && p.oldPrice > p.price;
    const discount = hasDiscount ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

    state.selectedColor = p.colors[0];
    state.selectedStorage = p.storage[0];

    const el = document.getElementById("productDetail");
    el.innerHTML = `
        <p class="pd-eyebrow">New</p>
        <h1 class="pd-title">${p.name}</h1>
        <p class="pd-tagline">${p.tagline}</p>
        <div class="pd-price-line">
            ${hasDiscount ? `<span class="pd-oldprice">${fmtPrice(p.oldPrice)}</span>` : ""}
            <span class="pd-price">From ${fmtPrice(p.price)}</span>
            ${hasDiscount ? `<span class="pd-discount">−${discount}%</span>` : ""}
        </div>
        <div class="pd-image">
            <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="pd-options">
            <p class="pd-option-label">Цвет — <span style="color:var(--text-secondary);font-weight:400" id="colorLabel">${p.colors[0]}</span></p>
            <div class="pd-option-grid" id="colorOptions">
                ${p.colors.map((c, i) => `<button class="pd-option ${i === 0 ? "active" : ""}" data-color="${c}">${c}</button>`).join("")}
            </div>
            <p class="pd-option-label">Накопитель / размер — <span style="color:var(--text-secondary);font-weight:400" id="storageLabel">${p.storage[0]}</span></p>
            <div class="pd-option-grid" id="storageOptions">
                ${p.storage.map((s, i) => `<button class="pd-option ${i === 0 ? "active" : ""}" data-storage="${s}">${s}</button>`).join("")}
            </div>
        </div>
        <p class="pd-description">${p.description}</p>
        <div class="pd-cta">
            <button class="btn btn-primary btn-block" id="addToCartBtn">Добавить в корзину — ${fmtPrice(p.price)}</button>
        </div>
    `;

    el.querySelectorAll("[data-color]").forEach((b) => {
        b.addEventListener("click", () => {
            el.querySelectorAll("[data-color]").forEach((x) => x.classList.remove("active"));
            b.classList.add("active");
            state.selectedColor = b.dataset.color;
            document.getElementById("colorLabel").textContent = b.dataset.color;
            hapticTick();
        });
    });

    el.querySelectorAll("[data-storage]").forEach((b) => {
        b.addEventListener("click", () => {
            el.querySelectorAll("[data-storage]").forEach((x) => x.classList.remove("active"));
            b.classList.add("active");
            state.selectedStorage = b.dataset.storage;
            document.getElementById("storageLabel").textContent = b.dataset.storage;
            hapticTick();
        });
    });

    document.getElementById("addToCartBtn").addEventListener("click", () => {
        addToCart(p);
    });
}

function renderCart() {
    const wrap = document.getElementById("cartContent");
    if (state.cart.length === 0) {
        wrap.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛍</div>
                <h3>Your bag is empty.</h3>
                <p>Shop the latest products and accessories.</p>
                <button class="btn btn-primary" onclick="goHome()">Continue shopping</button>
            </div>
        `;
        return;
    }

    const subtotal = state.cart.reduce((s, x) => s + x.price * x.qty, 0);
    const shipping = subtotal >= 999 ? 0 : 25;
    const total = subtotal + shipping;

    wrap.innerHTML = `
        <div class="cart-items">
            ${state.cart
                .map((it, i) => {
                    const opts = [it.color, it.storage].filter(Boolean).join(" · ");
                    return `
                    <div class="cart-item">
                        <div class="cart-item-img"><img src="${it.image}" alt="${it.name}"></div>
                        <div class="cart-item-info">
                            <h3 class="cart-item-name">${it.name}</h3>
                            <p class="cart-item-meta">${opts}</p>
                            <div class="cart-item-actions">
                                <div class="qty-stepper">
                                    <button class="qty-btn" data-action="dec" data-idx="${i}">−</button>
                                    <span class="qty-value">${it.qty}</span>
                                    <button class="qty-btn" data-action="inc" data-idx="${i}">+</button>
                                </div>
                                <span class="cart-item-price">${fmtPrice(it.price * it.qty)}</span>
                            </div>
                            <button class="cart-item-remove" data-idx="${i}">Удалить</button>
                        </div>
                    </div>
                `;
                })
                .join("")}
        </div>
        <div class="cart-summary">
            <div class="cart-row"><span>Subtotal</span><span>${fmtPrice(subtotal)}</span></div>
            <div class="cart-row"><span>Shipping</span><span>${shipping === 0 ? "Free" : fmtPrice(shipping)}</span></div>
            <div class="cart-row total"><span>Total</span><span>${fmtPrice(total)}</span></div>
        </div>
        <div class="cart-cta">
            <button class="btn btn-primary btn-block" id="checkoutBtn">Checkout</button>
        </div>
    `;

    wrap.querySelectorAll(".qty-btn").forEach((b) => {
        b.addEventListener("click", () => {
            const i = +b.dataset.idx;
            if (b.dataset.action === "inc") state.cart[i].qty++;
            else if (state.cart[i].qty > 1) state.cart[i].qty--;
            else state.cart.splice(i, 1);
            saveCart();
            updateCartBadge();
            renderCart();
            hapticTick();
        });
    });
    wrap.querySelectorAll(".cart-item-remove").forEach((b) => {
        b.addEventListener("click", () => {
            state.cart.splice(+b.dataset.idx, 1);
            saveCart();
            updateCartBadge();
            renderCart();
            hapticTick();
        });
    });

    document.getElementById("checkoutBtn")?.addEventListener("click", goCheckout);
}

function renderCheckoutSummary() {
    const subtotal = state.cart.reduce((s, x) => s + x.price * x.qty, 0);
    const shipping = subtotal >= 999 ? 0 : 25;
    const total = subtotal + shipping;
    document.getElementById("checkoutSummary").innerHTML = `
        <div class="cart-row"><span>Товаров</span><span>${state.cart.reduce((s, x) => s + x.qty, 0)}</span></div>
        <div class="cart-row"><span>Доставка</span><span>${shipping === 0 ? "Free" : fmtPrice(shipping)}</span></div>
        <div class="cart-row total"><span>К оплате</span><span>${fmtPrice(total)}</span></div>
    `;
}

// ====== Cart ops ======
function addToCart(p) {
    const idx = state.cart.findIndex(
        (x) => x.id === p.id && x.color === state.selectedColor && x.storage === state.selectedStorage
    );
    if (idx >= 0) state.cart[idx].qty++;
    else
        state.cart.push({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            color: state.selectedColor,
            storage: state.selectedStorage,
            qty: 1,
        });
    saveCart();
    updateCartBadge();
    hapticSuccess();

    if (tg) {
        tg.showPopup({
            title: "Добавлено в корзину",
            message: `${p.name} (${state.selectedColor || ""}${state.selectedStorage ? " · " + state.selectedStorage : ""})`,
            buttons: [
                { id: "view_cart", type: "default", text: "Открыть корзину" },
                { id: "continue", type: "cancel", text: "Продолжить" },
            ],
        }, (btn) => {
            if (btn === "view_cart") goCart();
        });
    } else {
        goCart();
    }
}

function updateCartBadge() {
    const total = state.cart.reduce((s, x) => s + x.qty, 0);
    const badge = document.getElementById("cartBadge");
    badge.textContent = total;
    badge.classList.toggle("show", total > 0);
}

// ====== Navigation ======
function showPage(id) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    document.getElementById("navBack").classList.toggle("show", id !== "pageHome");
    window.scrollTo({ top: 0, behavior: "instant" });

    if (tg) {
        if (id === "pageHome") tg.BackButton?.hide();
        else {
            tg.BackButton?.show();
            tg.BackButton?.onClick(navBack);
        }
    }
}

function goHome() {
    state.page = "home";
    state.history = [];
    showPage("pageHome");
}

function openProduct(id) {
    const p = findProduct(id);
    if (!p) return;
    state.currentProduct = p;
    state.history.push(state.page);
    state.page = "product";
    renderProductDetail(p);
    showPage("pageProduct");
}

function goCart() {
    state.history.push(state.page);
    state.page = "cart";
    renderCart();
    showPage("pageCart");
}

function goCheckout() {
    if (state.cart.length === 0) return;
    state.history.push(state.page);
    state.page = "checkout";
    renderCheckoutSummary();
    showPage("pageCheckout");
}

function navBack() {
    const prev = state.history.pop() || "home";
    state.page = prev;
    if (prev === "home") showPage("pageHome");
    else if (prev === "product" && state.currentProduct) {
        renderProductDetail(state.currentProduct);
        showPage("pageProduct");
    } else if (prev === "cart") {
        renderCart();
        showPage("pageCart");
    } else {
        showPage("pageHome");
    }
}

// ====== Haptics ======
function hapticTick() { try { tg?.HapticFeedback?.selectionChanged(); } catch (_) {} }
function hapticSuccess() { try { tg?.HapticFeedback?.notificationOccurred("success"); } catch (_) {} }

// ====== Checkout submit ======
document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const subtotal = state.cart.reduce((s, x) => s + x.price * x.qty, 0);
    const shipping = subtotal >= 999 ? 0 : 25;
    const total = subtotal + shipping;

    const payload = {
        action: "order",
        items: state.cart.map((x) => ({
            id: x.id,
            name: x.name,
            price: x.price,
            qty: x.qty,
            color: x.color,
            storage: x.storage,
        })),
        customer: {
            name: fd.get("name"),
            phone: fd.get("phone"),
            address: fd.get("address"),
            comment: fd.get("comment"),
        },
        subtotal,
        shipping,
        total,
    };

    if (tg && tg.sendData) {
        tg.sendData(JSON.stringify(payload));
        hapticSuccess();
        state.cart = [];
        saveCart();
        updateCartBadge();
        tg.close && tg.close();
    } else {
        alert("Заказ оформлен!\n" + JSON.stringify(payload, null, 2));
        state.cart = [];
        saveCart();
        updateCartBadge();
        goHome();
    }
});

// ====== Category pills ======
document.querySelectorAll(".cat-pill").forEach((p) => {
    p.addEventListener("click", () => {
        document.querySelectorAll(".cat-pill").forEach((x) => x.classList.remove("active"));
        p.classList.add("active");
        state.activeCategory = p.dataset.cat;
        renderProducts();
        hapticTick();
    });
});

// ====== Nav listeners ======
document.getElementById("navBack").addEventListener("click", navBack);
document.getElementById("navCart").addEventListener("click", goCart);

// Hero CTAs
document.querySelectorAll(".hero [data-product]").forEach((b) => {
    b.addEventListener("click", () => openProduct(b.dataset.product));
});

// ====== Init ======
renderFeatured();
renderProducts();
updateCartBadge();

if (tg) {
    tg.MainButton?.setParams && tg.MainButton.setParams({ is_visible: false });
    try {
        tg.setHeaderColor && tg.setHeaderColor("bg_color");
    } catch (_) {}
}
