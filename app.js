const PRODUCTS = [
	{
		id: 1,
		name: "Pure Glow Shampoo",
		cat: "Shampoo",
		price: 350,
		volume: "300ML",
		img: "1.jpg",
		emoji: "🧴",
		badge: "Best Seller",
		badgeClass: "",
		desc: "A luxuriously rich shampoo that gently cleanses while infusing your hair with deep moisture and natural botanical extracts. Leaves every strand luminous, soft, and full of life.",
		material: "Aloe Vera, Coconut Oil, Vitamin E",
		stars: 4.5,
		reviews: 231,
		featured: true,
		stock: 231,
	},
	{
		id: 2,
		name: "Cleanse Shampoo",
		cat: "Shampoo",
		price: 350,
		volume: "300ML",
		img: "2.jpg",
		emoji: "💚",
		badge: "",
		badgeClass: "",
		desc: "A clarifying yet gentle formula that removes buildup, excess oil, and impurities without stripping your hair's natural oils. Perfect for daily cleansing.",
		material: "Argan Oil, Tea Tree Extract, Keratin",
		stars: 4.8,
		reviews: 129,
		featured: true,
		stock: 129,
	},
	{
		id: 3,
		name: "Hair Conditioner",
		cat: "Conditioner",
		price: 450,
		volume: "350ML",
		img: "3.jpg",
		emoji: "🌿",
		badge: "Top Pick",
		badgeClass: "",
		desc: "An intensely nourishing conditioner that detangles, smooths frizz, and seals the hair cuticle for a sleek, healthy-looking finish from root to tip.",
		material: "Shea Butter, Argan Oil, Silk Proteins",
		stars: 4.6,
		reviews: 196,
		featured: true,
		stock: 196,
	},
	{
		id: 4,
		name: "Hair Serum",
		cat: "Serum",
		price: 250,
		volume: "350ML",
		img: "4.jpg",
		emoji: "✨",
		badge: "New",
		badgeClass: "new",
		desc: "A lightweight, fast-absorbing serum that tames frizz, adds brilliant shine, and protects against heat and humidity. Your daily hair finishing essential.",
		material: "Camellia Oil, Vitamin C, Hyaluronic Acid",
		stars: 4.7,
		reviews: 103,
		featured: false,
		stock: 103,
	},
	{
		id: 5,
		name: "Hair Deep Repair Oil",
		cat: "Treatment",
		price: 250,
		volume: "450ML",
		img: "5.jpg",
		emoji: "🌸",
		badge: "",
		badgeClass: "",
		desc: "A restorative treatment oil that penetrates deeply into damaged strands to rebuild strength, restore elasticity, and revive dry, brittle hair. Ideal for weekly use.",
		material: "Castor Oil, Macadamia Oil, Biotin",
		stars: 4.5,
		reviews: 58,
		featured: false,
		stock: 58,
	},
];

const SAMPLE_REVIEWS = [
	{
		name: "Maria Santos",
		product: "Pure Glow Shampoo",
		stars: 5,
		text: "Sobrang ganda ng result! My hair feels so soft and smells amazing. Definitely repurchasing!",
		date: "March 2026",
	},
	{
		name: "Liza Reyes",
		product: "Hair Conditioner",
		stars: 5,
		text: "This conditioner is a game changer. My hair used to be so tangled and dry, now it's silky smooth after every wash.",
		date: "February 2026",
	},
	{
		name: "Ana Garcia",
		product: "Hair Serum",
		stars: 4,
		text: "Love how lightweight the serum is. No greasy feeling at all, just beautiful shine.",
		date: "February 2026",
	},
	{
		name: "Carla Mendoza",
		product: "Cleanse Shampoo",
		stars: 5,
		text: "Best shampoo I've tried in a long time! Scalp feels so clean and refreshed. Will recommend to friends.",
		date: "January 2026",
	},
	{
		name: "Joy Villanueva",
		product: "Hair Deep Repair Oil",
		stars: 4,
		text: "My chemically treated hair needed this badly. After two weeks of use, the damage is visibly less severe.",
		date: "January 2026",
	},
	{
		name: "Rosa Cruz",
		product: "Pure Glow Shampoo",
		stars: 5,
		text: "Affordable and super effective! AranChez really delivers quality products for every Filipino.",
		date: "December 2025",
	},
];

const SAMPLE_ORDERS = [
	{
		id: "ARC-0001",
		date: "April 1, 2026",
		status: "Delivered",
		items: [{ name: "Pure Glow Shampoo", qty: 2, price: 350 }],
		total: 850,
	},
	{
		id: "ARC-0002",
		date: "April 5, 2026",
		status: "Shipped",
		items: [
			{ name: "Hair Conditioner", qty: 1, price: 450 },
			{ name: "Hair Serum", qty: 1, price: 250 },
		],
		total: 850,
	},
	{
		id: "ARC-0003",
		date: "April 8, 2026",
		status: "Processing",
		items: [{ name: "Hair Deep Repair Oil", qty: 1, price: 250 }],
		total: 400,
	},
];

let cart = JSON.parse(localStorage.getItem("ac_cart") || "[]");
let currentFilter = "All";
let currentSort = "default";
let selectedStar = 0;
let currentUser = JSON.parse(localStorage.getItem("ac_user") || "null");
let users = JSON.parse(localStorage.getItem("ac_users") || "[]");
let orders = JSON.parse(
	localStorage.getItem("ac_orders") || JSON.stringify(SAMPLE_ORDERS),
);
let reviews = JSON.parse(
	localStorage.getItem("ac_reviews") || JSON.stringify(SAMPLE_REVIEWS),
);

function saveData() {
	localStorage.setItem("ac_cart", JSON.stringify(cart));
	localStorage.setItem("ac_users", JSON.stringify(users));
	localStorage.setItem("ac_orders", JSON.stringify(orders));
	localStorage.setItem("ac_reviews", JSON.stringify(reviews));
}

function showPage(page) {
	document
		.querySelectorAll(".page")
		.forEach((p) => p.classList.remove("active"));
	const el = document.getElementById("page-" + page);
	if (el) el.classList.add("active");

	document.querySelectorAll(".sn-link").forEach((l) => {
		l.classList.toggle("active", l.dataset.page === page);
	});

	closeSidenav();
	window.scrollTo(0, 0);

	if (page === "home") {
		renderFeatured();
		renderHomeReviews();
	}
	if (page === "shop") renderShop();
	if (page === "reviews") {
		renderReviews();
		populateReviewSelect();
	}
	if (page === "checkout") renderCheckout();
	if (page === "dashboard") {
		if (!currentUser) {
			showAuth("login");
			return;
		}
		renderDashboard();
	}
	if (page === "admin") renderAdmin();
}

function toggleSidenav() {
	const nav = document.getElementById("sidenav");
	const overlay = document.getElementById("sidenavOverlay");
	nav.classList.toggle("open");
	overlay.classList.toggle("hidden");
}
function closeSidenav() {
	document.getElementById("sidenav").classList.remove("open");
	document.getElementById("sidenavOverlay").classList.add("hidden");
}

function starsHTML(n, max = 5) {
	let s = "";
	for (let i = 1; i <= max; i++) s += i <= Math.round(n) ? "★" : "☆";
	return s;
}

function renderFeatured() {
	const grid = document.getElementById("featuredGrid");
	if (!grid) return;
	const featured = PRODUCTS.filter((p) => p.featured);
	grid.innerHTML = featured.map((p) => productCardHTML(p)).join("");
}

const CAT_GRADIENTS = {
	Shampoo: "linear-gradient(145deg, #e8f4f8 0%, #c8e6f0 100%)",
	Conditioner: "linear-gradient(145deg, #f0f8e8 0%, #d4edda 100%)",
	Serum: "linear-gradient(145deg, #fff8e8 0%, #ffecc8 100%)",
	Treatment: "linear-gradient(145deg, #f8e8f4 0%, #edcce0 100%)",
};

function productCardHTML(p) {
	const bg =
		CAT_GRADIENTS[p.cat] || "linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)";
	const imgHTML = `<div class="pc-img" onclick="openProduct(${p.id})" style="background:${bg}">
  ${p.badge ? `<div class="pc-badge ${p.badgeClass}">${p.badge}</div>` : ""}
  <img src="${p.img}" alt="${p.name}"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"
       onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
  <span style="font-size:64px;line-height:1;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.12));display:none">${p.emoji}</span>
</div>`;
	return `<div class="prod-card">
    ${imgHTML}
    <div class="pc-body">
      <div class="pc-cat">${p.cat}</div>
      <div class="pc-name">${p.name}</div>
      <div class="pc-vol">${p.volume}</div>
      <div class="pc-stars">${starsHTML(p.stars)} <span>${p.stars} (${p.reviews})</span></div>
      <div class="pc-foot">
        <div class="pc-price">₱${p.price}</div>
        <button class="pc-add" onclick="addToCart(${p.id})">+</button>
      </div>
    </div>
  </div>`;
}

function renderHomeReviews() {
	const el = document.getElementById("homeReviews");
	if (!el) return;
	el.innerHTML = reviews
		.slice(0, 3)
		.map((r) => reviewCardHTML(r))
		.join("");
}

function reviewCardHTML(r) {
	const initials = r.name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2);
	return `<div class="rev-card">
    <div class="rc-stars">${starsHTML(r.stars)}</div>
    <div class="rc-text">"${r.text}"</div>
    <div class="rc-meta">
      <div class="rc-avatar">${initials}</div>
      <div>
        <div class="rc-name">${r.name}</div>
        <div class="rc-prod">${r.product} · ${r.date || ""}</div>
      </div>
    </div>
  </div>`;
}

function renderShop() {
	const grid = document.getElementById("shopGrid");
	if (!grid) return;
	let filtered =
		currentFilter === "All"
			? [...PRODUCTS]
			: PRODUCTS.filter((p) => p.cat === currentFilter);
	if (currentSort === "price-asc") filtered.sort((a, b) => a.price - b.price);
	else if (currentSort === "price-desc")
		filtered.sort((a, b) => b.price - a.price);
	else if (currentSort === "rating") filtered.sort((a, b) => b.stars - a.stars);
	grid.innerHTML = filtered.length
		? filtered.map((p) => productCardHTML(p)).join("")
		: `<p style="color:var(--text-light);padding:40px 0">No products found.</p>`;
}

function setFilter(cat, btn) {
	currentFilter = cat;
	document
		.querySelectorAll(".ftab")
		.forEach((b) => b.classList.remove("active"));
	if (btn) btn.classList.add("active");
	renderShop();
}

function setShopFilter(cat) {
	currentFilter = cat;
	document.querySelectorAll(".ftab").forEach((b) => {
		b.classList.toggle("active", b.textContent.trim() === cat);
	});
}

function handleSort(val) {
	currentSort = val;
	renderShop();
}

function handleSearch(val) {
	const v = val.toLowerCase().trim();
	if (!v) {
		renderShop();
		return;
	}
	showPage("shop");
	const grid = document.getElementById("shopGrid");
	if (!grid) return;
	const results = PRODUCTS.filter(
		(p) =>
			p.name.toLowerCase().includes(v) ||
			p.cat.toLowerCase().includes(v) ||
			p.desc.toLowerCase().includes(v),
	);
	grid.innerHTML = results.length
		? results.map((p) => productCardHTML(p)).join("")
		: `<p style="color:var(--text-light);padding:40px 0">No results for "${val}".</p>`;
}

function openProduct(id) {
	const p = PRODUCTS.find((x) => x.id === id);
	if (!p) return;
	const modal = document.getElementById("productModal");
	const content = document.getElementById("modalContent");
	const bg =
		CAT_GRADIENTS[p.cat] || "linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)";
	content.innerHTML = `<div class="modal-product">
    <div class="mp-img" style="background:${bg}">
      <span style="font-size:96px;line-height:1;filter:drop-shadow(0 6px 16px rgba(0,0,0,0.15))">${p.emoji}</span>
    </div>
    <div class="mp-body">
      <div class="mp-cat">${p.cat}</div>
      <div class="mp-name">${p.name}</div>
      <div class="mp-vol">${p.volume}</div>
      <div class="mp-stars">${starsHTML(p.stars)} <span style="color:var(--text-light);font-size:13px">${p.stars} · ${p.reviews} reviews</span></div>
      <div class="mp-desc">${p.desc}</div>
      <div class="mp-detail">Key Ingredients: <span>${p.material}</span></div>
      <div class="mp-detail">Stock: <span>${p.stock} units</span></div>
      <div class="mp-price">₱${p.price}</div>
      <button class="mp-add" onclick="addToCart(${p.id});closeModal()">Add to Basket</button>
    </div>
  </div>`;
	modal.classList.remove("hidden");
}

function closeModal() {
	document.getElementById("productModal").classList.add("hidden");
}

function addToCart(id) {
	if (!currentUser) {
		showToast("Please sign in to add items to your basket 🌿");
		showAuth("login");
		return;
	}
	const p = PRODUCTS.find((x) => x.id === id);
	if (!p) return;
	const existing = cart.find((c) => c.id === id);
	if (existing) existing.qty++;
	else cart.push({ id, name: p.name, price: p.price, qty: 1, emoji: p.emoji });
	saveData();
	updateCartCount();
	showToast(`${p.name} added to basket 🌿`);
}

function removeFromCart(id) {
	cart = cart.filter((c) => c.id !== id);
	saveData();
	updateCartCount();
	renderCartSidebar();
}

function updateCartCount() {
	const total = cart.reduce((sum, c) => sum + c.qty, 0);
	document.getElementById("cartCount").textContent = total;
}

function openCart() {
	renderCartSidebar();
	document.getElementById("cartSidebar").classList.add("open");
	document.getElementById("cartOverlay").style.display = "block";
}

function closeCart() {
	document.getElementById("cartSidebar").classList.remove("open");
	document.getElementById("cartOverlay").style.display = "none";
}

function renderCartSidebar() {
	const el = document.getElementById("cartItems");
	const totalEl = document.getElementById("cartTotal");
	if (!el) return;
	if (!cart.length) {
		el.innerHTML = `<div class="cs-empty">Your basket is empty.<br/>Start adding products! 🌿</div>`;
		if (totalEl) totalEl.textContent = "₱0";
		return;
	}
	let total = 0;
	el.innerHTML = cart
		.map((c) => {
			total += c.price * c.qty;
			return `<div class="cs-item">
      <div class="csi-img"><span>${c.emoji}</span></div>
      <div>
        <div class="csi-name">${c.name} ${c.qty > 1 ? `x${c.qty}` : ""}</div>
        <div class="csi-price">₱${(c.price * c.qty).toLocaleString()}</div>
      </div>
      <button class="csi-remove" onclick="removeFromCart(${c.id})">✕</button>
    </div>`;
		})
		.join("");
	if (totalEl) totalEl.textContent = "₱" + total.toLocaleString();
}

function goCheckout() {
	closeCart();
	if (!cart.length) {
		showToast("Your basket is empty!");
		return;
	}
	if (!currentUser) {
		showToast("Please sign in to checkout 🌿");
		showAuth("login");
		return;
	}
	showPage("checkout");
}

function renderCheckout() {
	if (!currentUser) {
		showToast("Please sign in to checkout 🌿");
		showAuth("login");
		return;
	}
	const itemsEl = document.getElementById("coItems");
	const subEl = document.getElementById("coSub");
	const totalEl = document.getElementById("coTotal");
	if (!itemsEl) return;
	let sub = 0;
	itemsEl.innerHTML =
		cart
			.map((c) => {
				sub += c.price * c.qty;
				return `<div class="co-item"><span>${c.name} x${c.qty}</span><span>₱${(c.price * c.qty).toLocaleString()}</span></div>`;
			})
			.join("") ||
		`<div class="co-item" style="color:var(--text-light)">No items</div>`;
	if (subEl) subEl.textContent = "₱" + sub.toLocaleString();
	if (totalEl) totalEl.textContent = "₱" + (sub + 150).toLocaleString();

	// Auto-fill user info
	const nameParts = (currentUser.name || "").split(" ");
	const firstEl = document.getElementById("co-first");
	const lastEl = document.getElementById("co-last");
	const emailEl = document.getElementById("co-email");
	const phoneEl = document.getElementById("co-phone");
	const addrEl = document.getElementById("co-addr");
	const cityEl = document.getElementById("co-city");
	const provEl = document.getElementById("co-prov");
	if (firstEl && !firstEl.value) firstEl.value = nameParts[0] || "";
	if (lastEl && !lastEl.value)
		lastEl.value = nameParts.slice(1).join(" ") || "";
	if (emailEl) {
		emailEl.value = currentUser.email || "";
		emailEl.readOnly = true;
		emailEl.style.opacity = "0.7";
	}
	if (phoneEl && !phoneEl.value) phoneEl.value = currentUser.phone || "";
	if (addrEl && !addrEl.value) addrEl.value = currentUser.address || "";
	if (cityEl && !cityEl.value) cityEl.value = currentUser.city || "";
	if (provEl && !provEl.value) provEl.value = currentUser.province || "";
}

function placeOrder() {
	const first = document.getElementById("co-first")?.value.trim();
	const last = document.getElementById("co-last")?.value.trim();
	const email = document.getElementById("co-email")?.value.trim();
	const phone = document.getElementById("co-phone")?.value.trim();
	const addr = document.getElementById("co-addr")?.value.trim();
	if (!first || !last || !email || !phone || !addr) {
		showToast("Please fill in all required fields.");
		return;
	}
	const pay =
		document.querySelector('input[name="pay"]:checked')?.value || "gcash";
	const id = "ARC-" + String(orders.length + 1).padStart(4, "0");
	const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
	const order = {
		id,
		date: new Date().toLocaleDateString("en-PH", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		status: "Processing",
		items: cart.map((c) => ({ name: c.name, qty: c.qty, price: c.price })),
		total: sub + 150,
		name: first + " " + last,
		email,
		phone,
		address: addr,
		payment: pay,
	};
	if (currentUser) {
		const u = users.find((x) => x.email === currentUser.email);
		if (u) {
			u.orders = u.orders || [];
			u.orders.push(order);
			// Save shipping info for future auto-fill
			u.phone = phone;
			u.address = addr;
			u.city = document.getElementById("co-city")?.value.trim() || u.city || "";
			u.province =
				document.getElementById("co-prov")?.value.trim() || u.province || "";
			// Keep currentUser in sync
			currentUser.phone = u.phone;
			currentUser.address = u.address;
			currentUser.city = u.city;
			currentUser.province = u.province;
			localStorage.setItem("ac_user", JSON.stringify(currentUser));
		}
	}
	orders.push(order);
	cart = [];
	saveData();
	updateCartCount();
	showToast(`Order ${id} placed successfully! 🌿`);
	showPage("tracking");
	setTimeout(() => {
		const ti = document.getElementById("trackInput");
		if (ti) {
			ti.value = id;
			trackOrder();
		}
	}, 300);
}

function trackOrder() {
	const val = document.getElementById("trackInput")?.value.trim().toUpperCase();
	const result = document.getElementById("trackResult");
	if (!result) return;
	if (!val) {
		result.innerHTML = `<p style="color:var(--text-light)">Please enter an order number.</p>`;
		return;
	}
	const order = orders.find((o) => o.id === val);
	if (!order) {
		result.innerHTML = `<div style="color:var(--text-light);padding:24px 0">Order <strong>${val}</strong> not found. Try ARC-0001, ARC-0002, or ARC-0003.</div>`;
		return;
	}
	const steps = [
		"Order Placed",
		"Processing",
		"Shipped",
		"Out for Delivery",
		"Delivered",
	];
	const statusMap = {
		Processing: 1,
		Shipped: 2,
		"Out for Delivery": 3,
		Delivered: 4,
	};
	const activeStep = statusMap[order.status] ?? 1;
	const stepsHTML = steps
		.map((s, i) => {
			const cls = i < activeStep ? "done" : i === activeStep ? "active" : "";
			return `<div class="ts-step">
      <div class="ts-dot ${cls}"></div>
      <div>
        <div class="ts-label">${s}</div>
        ${i <= activeStep ? `<div class="ts-time">${order.date}</div>` : ""}
      </div>
    </div>`;
		})
		.join("");
	const statusClass = "ts-" + order.status.toLowerCase().replace(/\s+/g, "");
	result.innerHTML = `<div class="track-card">
    <div class="tc-header">
      <div>
        <div class="tc-num">${order.id}</div>
        <div style="font-size:13px;color:var(--text-light);margin-top:4px">${order.date} · ${order.items.length} item(s)</div>
      </div>
      <span class="tc-status ts-${order.status.toLowerCase()}">${order.status}</span>
    </div>
    <div class="track-steps">${stepsHTML}</div>
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border);">
      <div style="font-size:13px;color:var(--text-light);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.1em;">Order Total</div>
      <div style="font-family:var(--font-d);font-size:26px;color:var(--forest)">₱${order.total.toLocaleString()}</div>
    </div>
  </div>`;
}

function renderReviews() {
	const grid = document.getElementById("reviewsGrid");
	const summary = document.getElementById("reviewsSummary");
	if (!grid) return;
	grid.innerHTML = reviews.map((r) => reviewCardHTML(r)).join("");
	if (summary) {
		const avg = (
			reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
		).toFixed(1);
		const counts = [5, 4, 3, 2, 1].map((n) => ({
			n,
			c: reviews.filter((r) => r.stars === n).length,
		}));
		const barsHTML = counts
			.map(
				(x) => `<div class="rsb-row">
      <div class="rsb-label">${x.n}★</div>
      <div class="rsb-track"><div class="rsb-fill" style="width:${reviews.length ? (x.c / reviews.length) * 100 : 0}%"></div></div>
      <div class="rsb-count">${x.c}</div>
    </div>`,
			)
			.join("");
		summary.innerHTML = `<div class="rs-score">
      <div class="rs-num">${avg}</div>
      <div class="rs-stars">${starsHTML(parseFloat(avg))}</div>
      <div class="rs-count">${reviews.length} reviews</div>
    </div>
    <div class="rs-bars">${barsHTML}</div>`;
	}
}

function populateReviewSelect() {
	const sel = document.getElementById("wr-product");
	if (!sel) return;
	sel.innerHTML =
		`<option value="">Select product…</option>` +
		PRODUCTS.map((p) => `<option value="${p.name}">${p.name}</option>`).join(
			"",
		);
}

document.addEventListener("click", (e) => {
	const opt = e.target.closest(".star-opt");
	if (opt && opt.closest("#starPicker")) {
		selectedStar = parseInt(opt.dataset.val);
		document.querySelectorAll(".star-opt").forEach((s) => {
			s.classList.toggle("active", parseInt(s.dataset.val) <= selectedStar);
		});
	}
});

function submitReview() {
	const name = document.getElementById("wr-name")?.value.trim();
	const product = document.getElementById("wr-product")?.value;
	const text = document.getElementById("wr-text")?.value.trim();
	if (!name || !product || !text || !selectedStar) {
		showToast("Please fill in all fields and select a rating.");
		return;
	}
	reviews.unshift({
		name,
		product,
		stars: selectedStar,
		text,
		date: new Date().toLocaleDateString("en-PH", {
			year: "numeric",
			month: "long",
		}),
	});
	saveData();
	selectedStar = 0;
	document
		.querySelectorAll(".star-opt")
		.forEach((s) => s.classList.remove("active"));
	document.getElementById("wr-name").value = "";
	document.getElementById("wr-product").value = "";
	document.getElementById("wr-text").value = "";
	renderReviews();
	showToast("Thank you for your review! 🌿");
}

function sendMessage() {
	const name = document.getElementById("cf-name")?.value.trim();
	const email = document.getElementById("cf-email")?.value.trim();
	const msg = document.getElementById("cf-msg")?.value.trim();
	if (!name || !email || !msg) {
		showToast("Please fill in all fields.");
		return;
	}
	showToast("Message sent! We'll get back to you soon. 🌿");
	["cf-name", "cf-email", "cf-subject", "cf-msg"].forEach((id) => {
		const el = document.getElementById(id);
		if (el) el.value = "";
	});
}

function showToast(msg) {
	const container = document.getElementById("toast-container");
	const toast = document.createElement("div");
	toast.className = "toast";
	toast.textContent = msg;
	container.appendChild(toast);
	setTimeout(() => toast.remove(), 3000);
}

function toggleAccountMenu() {
	const menu = document.getElementById("acctMenu");
	menu.classList.toggle("hidden");
	if (!menu.classList.contains("hidden")) {
		renderAccountMenu();
		setTimeout(
			() =>
				document.addEventListener("click", closeAcctMenuOutside, {
					once: true,
				}),
			10,
		);
	}
}

function closeAcctMenuOutside(e) {
	const menu = document.getElementById("acctMenu");
	const btn = document.getElementById("acctBtn");
	if (!menu.contains(e.target) && !btn.contains(e.target))
		menu.classList.add("hidden");
}

function renderAccountMenu() {
	const el = document.getElementById("acctMenuContent");
	if (!el) return;
	if (currentUser) {
		el.innerHTML = `
      <div class="acct-menu-item" style="font-weight:500;font-size:14px;">${currentUser.name}</div>
      <div class="acct-menu-item" onclick="showPage('dashboard');document.getElementById('acctMenu').classList.add('hidden')">My Dashboard</div>
      ${currentUser.email === "admin@aranchez.com" ? `<div class="acct-menu-item" onclick="showPage('admin');document.getElementById('acctMenu').classList.add('hidden')">Admin Panel</div>` : ""}
      <div class="acct-menu-item danger" onclick="doLogout()">Sign Out</div>`;
	} else {
		el.innerHTML = `
      <div class="acct-menu-item" onclick="showAuth('login');document.getElementById('acctMenu').classList.add('hidden')">Sign In</div>
      <div class="acct-menu-item" onclick="showAuth('register');document.getElementById('acctMenu').classList.add('hidden')">Create Account</div>`;
	}
}

function showAuth(mode) {
	const modal = document.getElementById("authModal");
	const overlay = document.getElementById("authOverlay");
	const content = document.getElementById("authContent");
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
	if (mode === "login") {
		content.innerHTML = `
      <div class="auth-title">Welcome back</div>
      <div class="auth-sub">Sign in to your AranChez account</div>
      <div class="auth-form">
        <div class="fg"><label>Email</label><input type="email" id="au-email" placeholder="your@email.com"/></div>
        <div class="fg"><label>Password</label><input type="password" id="au-pass" placeholder="••••••••"/></div>
        <button class="btn-primary full" onclick="doLogin()">Sign In</button>
      </div>
      <div class="auth-switch">Don't have an account? <a onclick="showAuth('register')">Register</a></div>
	   <div style="margin-top:16px;padding:12px;background:#f5f5f0;border-radius:8px;font-size:12px;color:#888;line-height:1.6;">
        <strong style="color:#555;">Admin</strong><br/>
        Email: admin@aranchez.com<br/>
        Password: admin123
      </div>`;
	} else {
		content.innerHTML = `
      <div class="auth-title">Create Account</div>
      <div class="auth-sub">Join the AranChez family</div>
      <div class="auth-form">
        <div class="fg"><label>Full Name</label><input type="text" id="au-name" placeholder="Maria Santos"/></div>
        <div class="fg"><label>Email</label><input type="email" id="au-email" placeholder="your@email.com"/></div>
        <div class="fg"><label>Password</label><input type="password" id="au-pass" placeholder="Min. 6 characters"/></div>
        <button class="btn-primary full" onclick="doRegister()">Create Account</button>
      </div>
      <div class="auth-switch">Already have an account? <a onclick="showAuth('login')">Sign In</a></div>`;
	}
}

function closeAuth() {
	document.getElementById("authModal").classList.add("hidden");
	document.getElementById("authOverlay").classList.add("hidden");
}

function doLogin() {
	const email = document.getElementById("au-email")?.value.trim();
	const pass = document.getElementById("au-pass")?.value;
	if (!email || !pass) {
		showToast("Please enter email and password.");
		return;
	}
	if (email === "admin@aranchez.com" && pass === "admin123") {
		currentUser = { name: "Admin", email: "admin@aranchez.com", role: "admin" };
		localStorage.setItem("ac_user", JSON.stringify(currentUser));
		closeAuth();
		showToast("Welcome, Admin! 🌿");
		return;
	}
	const user = users.find((u) => u.email === email && u.password === pass);
	if (!user) {
		showToast("Invalid credentials. Please try again.");
		return;
	}
	currentUser = user;
	localStorage.setItem("ac_user", JSON.stringify(currentUser));
	closeAuth();
	showToast(`Welcome back, ${user.name.split(" ")[0]}! 🌿`);
	if (cart.length) showPage("checkout");
}

function doRegister() {
	const name = document.getElementById("au-name")?.value.trim();
	const email = document.getElementById("au-email")?.value.trim();
	const pass = document.getElementById("au-pass")?.value;
	if (!name || !email || !pass) {
		showToast("Please fill all fields.");
		return;
	}
	if (pass.length < 6) {
		showToast("Password must be at least 6 characters.");
		return;
	}
	if (users.find((u) => u.email === email)) {
		showToast("Email already registered.");
		return;
	}
	const user = {
		name,
		email,
		password: pass,
		orders: [],
		joined: new Date().toLocaleDateString("en-PH", {
			year: "numeric",
			month: "long",
		}),
	};
	users.push(user);
	currentUser = user;
	localStorage.setItem("ac_user", JSON.stringify(currentUser));
	saveData();
	closeAuth();
	showToast(`Welcome to AranChez, ${name.split(" ")[0]}! 🌿`);
	if (cart.length) showPage("checkout");
}

function doLogout() {
	currentUser = null;
	localStorage.removeItem("ac_user");
	showPage("home");
	showToast("Signed out successfully.");
	setTimeout(() => location.reload(), 1500);
}

function renderDashboard() {
	if (!currentUser) return;
	const userOrders = orders.filter(
		(o) =>
			o.email === currentUser.email ||
			(currentUser.orders || []).some((x) => x.id === o.id),
	);

	const overviewEl = document.getElementById("dashOverviewContent");
	if (overviewEl) {
		overviewEl.innerHTML = `<div class="dash-stats">
      <div class="ds-card"><div class="dsc-label">Total Orders</div><div class="dsc-num">${userOrders.length}</div></div>
      <div class="ds-card"><div class="dsc-label">Total Spent</div><div class="dsc-num">₱${userOrders.reduce((s, o) => s + o.total, 0).toLocaleString()}</div></div>
      <div class="ds-card"><div class="dsc-label">Member Since</div><div class="dsc-num" style="font-size:18px">${currentUser.joined || "2026"}</div></div>
    </div>`;
	}

	const ordersEl = document.getElementById("dashOrdersContent");
	if (ordersEl) {
		ordersEl.innerHTML = userOrders.length
			? `<div class="tbl-wrap"><table class="data-table">
      <thead><tr><th>Order ID</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
      <tbody>${userOrders
				.map(
					(o) => `<tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.date}</td>
        <td>${o.items.map((i) => i.name).join(", ")}</td>
        <td>₱${o.total.toLocaleString()}</td>
        <td><span class="order-row-status ors-${o.status.toLowerCase()}">${o.status}</span></td>
      </tr>`,
				)
				.join("")}</tbody>
    </table></div>`
			: `<p style="color:var(--text-light)">No orders yet. <a href="#" onclick="showPage('shop')" style="color:var(--forest)">Start shopping →</a></p>`;
	}

	const profileEl = document.getElementById("dashProfileContent");
	if (profileEl) {
		profileEl.innerHTML = `<div style="max-width:400px;display:flex;flex-direction:column;gap:18px;">
      <div class="fg"><label>Full Name</label><input type="text" value="${currentUser.name}" id="dp-name"/></div>
      <div class="fg"><label>Email</label><input type="email" value="${currentUser.email}" id="dp-email" readonly style="opacity:0.6"/></div>
      <button class="btn-primary" onclick="saveProfile()">Save Changes</button>
    </div>`;
	}
}

function saveProfile() {
	const name = document.getElementById("dp-name")?.value.trim();
	if (!name) return;
	currentUser.name = name;
	const u = users.find((x) => x.email === currentUser.email);
	if (u) u.name = name;
	localStorage.setItem("ac_user", JSON.stringify(currentUser));
	saveData();
	showToast("Profile updated! 🌿");
}

function switchDash(panel, btn) {
	["overview", "orders", "profile"].forEach((p) => {
		const el = document.getElementById("dash-" + p);
		if (el) el.classList.toggle("hidden", p !== panel);
	});
	document
		.querySelectorAll(".idn-btn")
		.forEach((b) => b.classList.remove("active"));
	if (btn) btn.classList.add("active");
	if (panel === "orders" || panel === "profile") renderDashboard();
}

function renderAdmin() {
	const overviewEl = document.getElementById("adminOverviewContent");
	if (overviewEl) {
		const totalRev = orders.reduce((s, o) => s + o.total, 0);
		overviewEl.innerHTML = `<div class="dash-stats">
      <div class="ds-card"><div class="dsc-label">Total Orders</div><div class="dsc-num">${orders.length}</div></div>
      <div class="ds-card"><div class="dsc-label">Total Revenue</div><div class="dsc-num">₱${totalRev.toLocaleString()}</div></div>
      <div class="ds-card"><div class="dsc-label">Registered Users</div><div class="dsc-num">${users.length}</div></div>
    </div>
    <div style="margin-top:32px"><h3 style="margin-bottom:20px">Product Performance</h3>
    <div class="tbl-wrap"><table class="data-table">
      <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th></tr></thead>
      <tbody>${PRODUCTS.map(
				(p) => `<tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.cat}</td>
        <td>₱${p.price}</td>
        <td>${p.stock}</td>
        <td>${starsHTML(p.stars)} ${p.stars}</td>
      </tr>`,
			).join("")}</tbody>
    </table></div></div>`;
	}

	const ordersEl = document.getElementById("adminOrdersContent");
	if (ordersEl) {
		ordersEl.innerHTML = `<div class="tbl-wrap"><table class="data-table">
      <thead><tr><th>Order ID</th><th>Customer</th><th>Contact</th><th>Address</th><th>Date</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
      <tbody>${orders
				.map(
					(o) => `<tr>
        <td><strong>${o.id}</strong></td>
        <td>
          <div style="font-weight:500">${o.name || "Guest"}</div>
          <div style="font-size:11px;color:var(--text-light)">${o.email || "—"}</div>
        </td>
        <td style="font-size:12px">${o.phone || "—"}</td>
        <td style="font-size:12px;max-width:160px">${[o.address, o.city, o.province].filter(Boolean).join(", ") || "—"}</td>
        <td>${o.date}</td>
        <td style="font-size:12px">${o.items.map((i) => `${i.name} x${i.qty}`).join("<br/>")}</td>
        <td>₱${o.total.toLocaleString()}</td>
        <td style="text-transform:capitalize">${o.payment || "—"}</td>
        <td><select class="order-row-status" onchange="updateOrderStatus('${o.id}',this.value)" style="border:none;background:transparent;font-size:12px;font-weight:600;cursor:pointer;color:inherit">
          ${["Processing", "Shipped", "Out for Delivery", "Delivered"].map((s) => `<option ${s === o.status ? "selected" : ""}>${s}</option>`).join("")}
        </select></td>
      </tr>`,
				)
				.join("")}</tbody>
    </table></div>`;
	}

	const inventoryEl = document.getElementById("adminInventoryContent");
	if (inventoryEl) {
		inventoryEl.innerHTML = `<div class="tbl-wrap"><table class="data-table">
      <thead><tr><th>Product</th><th>Category</th><th>Volume</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
      <tbody>${PRODUCTS.map((p) => {
				const status =
					p.stock > 100 ? "inv-ok" : p.stock > 30 ? "inv-low" : "inv-out";
				const label =
					p.stock > 100 ? "In Stock" : p.stock > 30 ? "Low Stock" : "Critical";
				return `<tr>
          <td><strong>${p.name}</strong></td>
          <td>${p.cat}</td>
          <td>${p.volume}</td>
          <td>₱${p.price}</td>
          <td>${p.stock}</td>
          <td><span class="inv-badge ${status}">${label}</span></td>
        </tr>`;
			}).join("")}</tbody>
    </table></div>`;
	}

	const usersEl = document.getElementById("adminUsersContent");
	if (usersEl) {
		usersEl.innerHTML = users.length
			? `<div class="tbl-wrap"><table class="data-table">
      <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Joined</th><th>Orders</th></tr></thead>
      <tbody>${users
				.map(
					(u, i) => `<tr>
        <td>${i + 1}</td>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>${u.joined || "—"}</td>
        <td>${(u.orders || []).length}</td>
      </tr>`,
				)
				.join("")}</tbody>
    </table></div>`
			: `<p style="color:var(--text-light)">No registered users yet.</p>`;
	}

	const reportsEl = document.getElementById("adminReportsContent");
	if (reportsEl) {
		const byProduct = {};
		orders.forEach((o) =>
			o.items.forEach((i) => {
				byProduct[i.name] = (byProduct[i.name] || 0) + i.qty;
			}),
		);
		const sorted = Object.entries(byProduct).sort((a, b) => b[1] - a[1]);
		reportsEl.innerHTML = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;">
      <div class="ds-card"><div class="dsc-label">Avg Order Value</div><div class="dsc-num">₱${orders.length ? Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length).toLocaleString() : 0}</div></div>
      <div class="ds-card"><div class="dsc-label">Total Products Sold</div><div class="dsc-num">${orders.reduce((s, o) => s + o.items.reduce((ss, i) => ss + i.qty, 0), 0)}</div></div>
    </div>
    <div style="margin-top:32px"><h3 style="margin-bottom:16px">Units Sold by Product</h3>
    <div class="tbl-wrap"><table class="data-table">
      <thead><tr><th>Product</th><th>Units Sold</th></tr></thead>
      <tbody>${sorted.map(([name, qty]) => `<tr><td>${name}</td><td><strong>${qty}</strong></td></tr>`).join("")}</tbody>
    </table></div></div>`;
	}
}

function updateOrderStatus(id, status) {
	const order = orders.find((o) => o.id === id);
	if (order) {
		order.status = status;
		saveData();
		showToast(`Order ${id} updated to ${status}.`);
	}
}

function switchAdmin(panel, btn) {
	document
		.querySelectorAll(".admin-panel")
		.forEach((p) => p.classList.add("hidden"));
	const el = document.getElementById("admin-" + panel);
	if (el) el.classList.remove("hidden");
	document
		.querySelectorAll(".idn-btn")
		.forEach((b) => b.classList.remove("active"));
	if (btn) btn.classList.add("active");
	renderAdmin();
}

window.addEventListener("click", (e) => {
	if (e.target === document.getElementById("productModal")) closeModal();
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		closeModal();
		closeCart();
		closeAuth();
		document.getElementById("acctMenu")?.classList.add("hidden");
	}
});

updateCartCount();
showPage("home");
