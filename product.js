// صفحة تفاصيل المنتج فقط
const products = [
  {id:"1",name:"كنبة مودرن",price:18500,priceText:"18,500 ج.م",category:"living",categoryText:"غرفة المعيشة",image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85",description:"كنبة بتصميم عصري وألوان هادئة، مناسبة لمساحات المعيشة المختلفة."},
  {id:"2",name:"سرير خشبي أنيق",price:24900,priceText:"24,900 ج.م",category:"bedroom",categoryText:"غرفة النوم",image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85",description:"سرير أنيق بتصميم مريح يضيف دفئًا وأناقة لغرفة نومك."},
  {id:"3",name:"كرسي استرخاء",price:9750,priceText:"9,750 ج.م",category:"living",categoryText:"غرفة المعيشة",image:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=85",description:"كرسي مريح بلمسة عصرية، مثالي لركن القراءة والاسترخاء."},
  {id:"4",name:"طاولة جانبية",price:3200,priceText:"3,200 ج.م",category:"decor",categoryText:"ديكور",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1000&q=85",description:"طاولة جانبية بسيطة وعملية تكمل شكل غرفة المعيشة."},
  {id:"5",name:"وحدة إضاءة",price:1850,priceText:"1,850 ج.م",category:"decor",categoryText:"ديكور",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85",description:"وحدة إضاءة أنيقة تضيف أجواء دافئة للمكان."}
];
const productId = new URLSearchParams(location.search).get("id") || "1";
const selectedProduct = products.find(p => p.id === productId);
let quantity = 1;
function getDetailCart() {
  try { const data = JSON.parse(localStorage.getItem("darCart")); return Array.isArray(data) ? data : []; }
  catch { return []; }
}
function updateDetailCount() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = getDetailCart().reduce((s,x) => s + Number(x.quantity || 0), 0);
}
function renderDetails() {
  const layout = document.getElementById("layout");
  const missing = document.getElementById("missing");
  if (!selectedProduct) {
    if (layout) layout.hidden = true;
    if (missing) missing.hidden = false;
    return;
  }
  const setText = (id,value) => { const el=document.getElementById(id); if(el) el.textContent=value; };
  const image = document.getElementById("image");
  if (image) { image.src=selectedProduct.image; image.alt=selectedProduct.name; }
  setText("name",selectedProduct.name);
  setText("price",selectedProduct.priceText);
  setText("category",selectedProduct.categoryText);
  setText("description",selectedProduct.description);
  setText("crumbName",selectedProduct.name);
  document.title = selectedProduct.name + " | دار";
}
document.getElementById("plus")?.addEventListener("click", () => {
  quantity++; const el=document.getElementById("qty"); if(el) el.textContent=quantity;
});
document.getElementById("minus")?.addEventListener("click", () => {
  if(quantity>1) quantity--; const el=document.getElementById("qty"); if(el) el.textContent=quantity;
});
document.getElementById("add")?.addEventListener("click", () => {
  if (!selectedProduct) return;
  const cart=getDetailCart();
  const old=cart.find(x=>String(x.id)===selectedProduct.id);
  if(old) old.quantity=Number(old.quantity||0)+quantity;
  else cart.push({id:selectedProduct.id,name:selectedProduct.name,price:selectedProduct.priceText,image:selectedProduct.image,quantity});
  localStorage.setItem("darCart",JSON.stringify(cart));
  updateDetailCount();
  alert("تمت إضافة المنتج إلى السلة");
});
renderDetails();
updateDetailCount();
