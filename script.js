// الصفحة الرئيسية فقط
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const toast = document.getElementById("toast");
const cartCount = document.getElementById("cartCount");

menuToggle?.addEventListener("click", () => mainNav?.classList.toggle("open"));

function getCart() {
  try {
    const data = JSON.parse(localStorage.getItem("darCart"));
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}
function updateCartCount() {
  if (cartCount) cartCount.textContent = getCart().reduce((s, x) => s + Number(x.quantity || 0), 0);
}
document.querySelectorAll(".quick-add").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const id = String(button.dataset.id || "");
    if (!card || !id) return;
    const name = card.querySelector("h3")?.textContent.trim();
    const price = card.querySelector("strong")?.textContent.trim();
    const image = card.querySelector("img")?.src;
    if (!name || !price || !image) return;
    const cart = getCart();
    const old = cart.find(x => String(x.id) === id);
    if (old) old.quantity = Number(old.quantity || 0) + 1;
    else cart.push({ id, name, price, image, quantity: 1 });
    localStorage.setItem("darCart", JSON.stringify(cart));
    updateCartCount();
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2200);
    } else alert("تمت إضافة المنتج إلى السلة");
  });
});
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");
    const selected = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card => {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
    });
  });
});
updateCartCount();
