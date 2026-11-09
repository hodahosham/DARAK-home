// صفحة من نحن فقط
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => mainNav?.classList.toggle("open"));

function readAboutCart() {
  try {
    const data = JSON.parse(localStorage.getItem("darCart"));
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}
const badge = document.getElementById("cartCount");
if (badge) badge.textContent = readAboutCart().reduce((s, x) => s + Number(x.quantity || 0), 0);
