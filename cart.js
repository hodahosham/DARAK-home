// صفحة السلة فقط
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => mainNav?.classList.toggle("open"));

const cartItemsContainer = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const summaryPanel = document.getElementById("summaryPanel");
const cartToast = document.getElementById("cartToast");

function readCart() {
  try {
    const data = JSON.parse(localStorage.getItem("darCart"));
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem("darCart", JSON.stringify(cart));
  renderCart();
}
function numericPrice(value) {
  return Number(String(value ?? "").replace(/[^\d]/g, "")) || 0;
}
function formatPrice(value) {
  return new Intl.NumberFormat("en-US").format(value) + " ج.م";
}
function showToast(message) {
  if (!cartToast) return alert(message);
  cartToast.textContent = message;
  cartToast.classList.add("show");
  setTimeout(() => cartToast.classList.remove("show"), 2200);
}
function renderCart() {
  if (!cartItemsContainer || !emptyCart || !summaryPanel) return;
  const cart = readCart();
  const quantity = cart.reduce((s, x) => s + Number(x.quantity || 0), 0);
  const subtotal = cart.reduce((s, x) => s + numericPrice(x.price) * Number(x.quantity || 0), 0);
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  setText("cartCount", quantity);
  setText("itemsCount", `${cart.length} منتجات`);
  setText("summaryQuantity", quantity);
  setText("subtotal", formatPrice(subtotal));
  setText("total", formatPrice(subtotal));
  emptyCart.hidden = cart.length > 0;
  summaryPanel.hidden = cart.length === 0;
  cartItemsContainer.innerHTML = "";

  cart.forEach(item => {
    const article = document.createElement("article");
    article.className = "cart-item";
    article.innerHTML = `
      <img src="" alt="">
      <div class="cart-item-info">
        <h3></h3><p></p>
        <div class="quantity-control">
          <button type="button" data-action="increase">+</button>
          <span></span>
          <button type="button" data-action="decrease">−</button>
        </div>
        <button class="remove-item" type="button" data-action="remove">حذف المنتج</button>
      </div><div class="cart-item-price"></div>`;
    article.querySelector("img").src = item.image || "";
    article.querySelector("img").alt = item.name || "منتج";
    article.querySelector("h3").textContent = item.name || "منتج";
    article.querySelector(".cart-item-info p").textContent = `السعر: ${item.price || "0 ج.م"}`;
    article.querySelector(".quantity-control span").textContent = Number(item.quantity || 0);
    article.querySelector(".cart-item-price").textContent = formatPrice(numericPrice(item.price) * Number(item.quantity || 0));

    article.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        const currentCart = readCart();
        const current = currentCart.find(x => String(x.id) === String(item.id));
        if (!current) return;
        const action = button.dataset.action;
        if (action === "increase") current.quantity = Number(current.quantity || 0) + 1;
        if (action === "decrease") current.quantity = Number(current.quantity || 0) - 1;
        if (action === "remove" || current.quantity <= 0) {
          saveCart(currentCart.filter(x => String(x.id) !== String(item.id)));
          showToast("تم حذف المنتج من السلة");
          return;
        }
        saveCart(currentCart);
      });
    });
    cartItemsContainer.appendChild(article);
  });
}
document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  if (!readCart().length) return showToast("السلة فارغة، أضيفي منتجات أولًا");
  showToast("تم تجهيز طلبك. أضيفي بيانات التواصل في خطوة الدفع القادمة.");
});
renderCart();
