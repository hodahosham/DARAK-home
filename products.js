// صفحة المنتجات فقط
const products = [
  {id:"1",name:"كنبة مودرن",price:18500,priceText:"18,500 ج.م",category:"living",categoryText:"غرفة المعيشة",image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85",description:"كنبة بتصميم عصري وألوان هادئة، مناسبة لمساحات المعيشة المختلفة."},
  {id:"2",name:"سرير خشبي أنيق",price:24900,priceText:"24,900 ج.م",category:"bedroom",categoryText:"غرفة النوم",image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85",description:"سرير أنيق بتصميم مريح يضيف دفئًا وأناقة لغرفة نومك."},
  {id:"3",name:"كرسي استرخاء",price:9750,priceText:"9,750 ج.م",category:"living",categoryText:"غرفة المعيشة",image:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=85",description:"كرسي مريح بلمسة عصرية، مثالي لركن القراءة والاسترخاء."},
  {id:"4",name:"طاولة جانبية",price:3200,priceText:"3,200 ج.م",category:"decor",categoryText:"ديكور",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1000&q=85",description:"طاولة جانبية بسيطة وعملية تكمل شكل غرفة المعيشة."},
  {id:"5",name:"وحدة إضاءة",price:1850,priceText:"1,850 ج.م",category:"decor",categoryText:"ديكور",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85",description:"وحدة إضاءة أنيقة تضيف أجواء دافئة للمكان."}
];
const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
let activeCategory = "all";
function getProductsCart() {
  try { const data = JSON.parse(localStorage.getItem("darCart")); return Array.isArray(data) ? data : []; }
  catch { return []; }
}
function updateProductsCount() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = getProductsCart().reduce((s,x) => s + Number(x.quantity || 0), 0);
}
function renderProducts() {
  if (!grid || !empty) return;
  const search = (document.getElementById("search")?.value || "").trim().toLowerCase();
  const sort = document.getElementById("sort")?.value || "default";
  let list = products.filter(p => (activeCategory === "all" || p.category === activeCategory) && p.name.toLowerCase().includes(search));
  if (sort === "low") list.sort((a,b) => a.price-b.price);
  if (sort === "high") list.sort((a,b) => b.price-a.price);
  grid.innerHTML = list.map(p => `<article class="card"><a class="photo" href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy"></a><div class="info"><p class="cat">${p.categoryText}</p><a class="name" href="product.html?id=${p.id}">${p.name}</a><div class="bottom"><span class="price">${p.priceText}</span><button class="add" type="button" data-add="${p.id}">+</button></div></div></article>`).join("");
  empty.hidden = list.length > 0;
}
document.querySelectorAll("[data-cat]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-cat]").forEach(x => x.classList.remove("active"));
  button.classList.add("active"); activeCategory = button.dataset.cat || "all"; renderProducts();
}));
document.getElementById("search")?.addEventListener("input", renderProducts);
document.getElementById("sort")?.addEventListener("change", renderProducts);
grid?.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find(p => p.id === button.dataset.add);
  if (!product) return;
  const cart = getProductsCart();
  const old = cart.find(x => String(x.id) === product.id);
  if (old) old.quantity = Number(old.quantity || 0) + 1;
  else cart.push({id:product.id,name:product.name,price:product.priceText,image:product.image,quantity:1});
  localStorage.setItem("darCart", JSON.stringify(cart));
  updateProductsCount();
  alert("تمت إضافة المنتج إلى السلة");
});
renderProducts();
updateProductsCount();
